const TextFunctions = require('../formulas/functions/text');
const MathFunctions = require('../formulas/functions/math');
const TrigFunctions = require('../formulas/functions/trigonometry');
const LogicalFunctions = require('../formulas/functions/logical');
const EngFunctions = require('../formulas/functions/engineering');
const ReferenceFunctions = require('../formulas/functions/reference');
const InformationFunctions = require('../formulas/functions/information');
const FormulaError = require('../formulas/error');
const {FormulaHelpers} = require('../formulas/helpers');
const {Parser, allTokens} = require('./parsing');
const lexer = require('./lexing');
const Utils = require('./utils');

class FormulaParser {

    /**
     *
     * @param {{functions: {}, variables: {}, onCell: function, onRange: function}} [config]
     */
    constructor(config) {
        this.logs = [];
        this.utils = new Utils(this);
        config = Object.assign({
            functions: {},
            variables: {},
            onCell: () => 0,
            onRange: () => [[0]],
        }, config);

        this.variables = config.variables;
        this.functions = Object.assign({}, InformationFunctions, ReferenceFunctions,
            EngFunctions, LogicalFunctions, TextFunctions, MathFunctions, TrigFunctions, config.functions);
        this.onRange = config.onRange;
        this.onCell = config.onCell;

        // functions treat null as 0, other functions treats null as ""
        this.funsNullAs0 = Object.keys(MathFunctions)
            .concat(Object.keys(TrigFunctions))
            .concat(Object.keys(LogicalFunctions))
            .concat(Object.keys(EngFunctions))
            .concat(Object.keys(ReferenceFunctions));

        // functions need context and don't need to retrieve references
        this.funsNeedContext = ['ROW', 'ROWS', 'COLUMN', 'COLUMNS'];
        this.funsPreserveRef = Object.keys(InformationFunctions);

        // uses ES5 syntax here... I don't want to transpile the code...
        this.getCell = (ref) => {
            // console.log('get cell', JSON.stringify(ref));
            return this.onCell(ref);
        };

        // this.getColumnRange = (range) => {
        //     // console.log('get col range', range);
        //     return {ref: range, value: this.onRange(range)}
        // };
        //
        // this.getRowRange = (range) => {
        //     // console.log('get row range', range);
        //     return {ref: range, value: this.onRange(range)}
        // };

        this.getRange = (ref) => {
            return this.onRange(ref)
        };

        this.getVariable = (name) => {
            // console.log('get variable', name);
            const val = this.variables[name];
            if (val === undefined || val === null)
                return FormulaError.NAME;
            return val;
        };

        this.callFunction = (name, args) => {
            name = name.toUpperCase();
            // if one arg is null, it means 0 or "" depends on the function it calls
            const nullValue = this.funsNullAs0.includes(name) ? 0 : '';

            if (!this.funsNeedContext.includes(name)) {
                // retrieve reference
                args = args.map(arg => {
                    if (arg === null)
                        return {value: nullValue, isArray: false, omitted: true};
                    const res = this.utils.extractRefValue(arg);

                    if (this.funsPreserveRef.includes(name)) {
                        return {value: res.val, isArray: res.isArray, ref: arg.ref};
                    }
                    return {value: res.val, isArray: res.isArray};
                });
            }
            // console.log('callFunction', name, args)

            if (this.functions[name]) {
                let res;
                try {
                    if (!this.funsNeedContext.includes(name))
                        res = (this.functions[name](...args));
                    else
                        res = (this.functions[name](this, ...args));
                } catch (e) {
                    // allow functions throw FormulaError, this make functions easier to implement!
                    if (e instanceof FormulaError) {
                        return e;
                    } else {
                        throw e;
                    }
                }
                if (res === undefined) {
                    if (!this.logs.includes(name)) this.logs.push(name);
                    // console.log(`Function ${name} may be not implemented.`);
                    return {value: 0, ref: {}};
                }
                return FormulaHelpers.checkFunctionResult(res);
            } else {
                if (!this.logs.includes(name)) this.logs.push(name);
                // console.log(`Function ${name} is not implemented`)
                return {value: 0, ref: {}};
            }
        };

        this.retrieveRef = value => {
            if (FormulaHelpers.isRangeRef(value)) {
                return this.getRange(value.ref);
            }
            if (FormulaHelpers.isCellRef(value)) {
                return this.getCell(value.ref)
            }
            return value;
        };

        this.parser = new Parser(this, this.utils);
    }

    static get allTokens() {
        return allTokens;
    }

    supportedFunctions() {
        const supported = [];
        const functions = Object.keys(this.functions);
        functions.forEach(fun => {
            let res;
            try {
                res = this.functions[fun](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                if (res === undefined) return;
                supported.push(fun);
            } catch (e) {
                if (e instanceof FormulaError || e instanceof TypeError)
                    supported.push(fun);
                // else
                //     console.log(e)
            }
        });
        return supported.sort();
    }

    checkFormulaResult(result) {
        const type = typeof result;
        // number
        if (type === 'number') {
            if (isNaN(result)) {
                return FormulaError.VALUE;
            } else if (!isFinite(result)) {
                return FormulaError.NUM;
            }
            result += 0; // make -0 to 0
        } else if (type === 'boolean')
            result = result ? 'TRUE' : 'FALSE';
        else if (type === 'object') {
            if (result instanceof FormulaError)
                return result;
            if (result.ref && !result.ref.from) {
                // single cell reference
                result = this.retrieveRef(result);
            } else if (Array.isArray(result)) {
                result = result[0][0]
            } else {
                // array, range reference, union collections
                return FormulaError.VALUE;
            }
        }
        return result;
    }

    /**
     *
     * @param inputText
     * @param {{row: number, col: number}} [position] - The position of the parsed formula
     *              e.g. {row: 1, col: 1}
     * @returns {*}
     */
    parse(inputText, position) {
        this.position = position;
        const lexResult = lexer.lex(inputText);
        this.parser.input = lexResult.tokens;
        let res;
        try {
            res = this.parser.formulaWithCompareOp();
            res = this.checkFormulaResult(res);
            if (res instanceof FormulaError) {
                return {result: res.toString(), detail: ''};
            }
        } catch (e) {
            // console.log(e);
            throw e;
        }
        if (this.parser.errors.length > 0) {
            const error = this.parser.errors[0];
            const line = error.previousToken.startLine, column = error.previousToken.startColumn + 1;
            let msg = '\n' + inputText.split('\n')[line - 1] + '\n';
            msg += Array(column - 1).fill(' ').join('') + '^\n';
            error.message = msg + `Error at position ${line}:${column}\n` + error.message;
            throw error
        }
        return res;
    }
}

module.exports = {
    FormulaParser,
    FormulaHelpers,
};
