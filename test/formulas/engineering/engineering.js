const chai = require('chai');
const expect = require('chai').expect;
const {FormulaParser} = require('../../../grammar/hooks');
const TestCase = require('./testcase');

const parser = new FormulaParser();

describe('Engineering Functions', function () {
    const funs = Object.keys(TestCase);

    funs.forEach(fun => {
        it(fun, () => {
            const formulas = Object.keys(TestCase[fun]);
            formulas.forEach(formula => {
                const expected = TestCase[fun][formula];
                let result = parser.parse(formula);
                if (result.result) {
                    result = result.result;
                }

                if (typeof expected === "number")
                    expect(result, `${formula} should equal ${expected}\n`).to.be.closeTo(expected, 0.00000001);
                else
                    expect(result, `${formula} should equal ${expected}\n`).to.be.eq(expected);
                // console.log(`Testing ${formula}`);
            })
        });
    });
});