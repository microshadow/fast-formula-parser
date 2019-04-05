const FormulaError = require('../error');
const {FormulaHelpers, Types} = require('../helpers');
const H = FormulaHelpers;
const ssf = require('../../ssf/ssf');

const TextFunctions = {
    ASC: (text) => {
        text = H.accept(text, [Types.STRING]);
        let result = text.replace(
            /[\uff01-\uff5e]/g,
            function (ch) {
                return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
            }
        );
        return result;
    },

    BAHTTEXT: (...params) => {
        // Converts a number to Thai text and adds a suffix of "Baht."
        // we do not need this function for our project
        throw FormulaError.NOT_IMPLEMENTED("BAHTTEXT")
    },

    CHAR: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number > 255 || number < 1)
            throw FormulaError.VALUE;
        return String.fromCharCode(number);
    },

    CLEAN: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.toString().replace(/[\x00-\x1F]/g, '');
    },

    CODE: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.charCodeAt(0);
    },

    CONCAT: (...params) => {
        let text = '';
        H.flattenParams(params, Types.STRING, item => {
            text += item;
        });
        return text
    },

    CONCATENATE: (...params) => {
        let text = '';
        H.flattenParams(params, Types.STRING, item => {
            text += item;
        }, false);
        return text;
    },

    DBCS: (...params) => {

    },

    DOLLAR: (number) => {
        number = H.accept(number, [Types.NUMBER]);
        let str = "";

        while (number > 1000) {
            str = number % 1000 + "," + str;
            number = Math.floor(number / 1000);
            console.log(number, str);

            if (number < 1000) {
                str = "$" + number + "," + str;
            }
        }
        str = str.slice(0, -1);

        return str;
    },

    EXACT: (text1, text2) => {
        text1 = H.accept(text1, [Types.STRING]);
        text2 = H.accept(text2, [Types.STRING]);

        return text1 === text2;
    },

    FIND: (findText, withinText, startNum) => {
        findText = H.accept(findText, Types.STRING);
        withinText = H.accept(withinText, Types.STRING);
        startNum = H.accept(startNum, Types.NUMBER, true);
        if (startNum === undefined)
            startNum = 1;
        if (startNum < 1 || startNum > withinText.length)
            throw FormulaError.VALUE;
        const res = withinText.indexOf(findText, startNum - 1);
        if (res === -1)
            throw FormulaError.VALUE;
        return res + 1;
    },

    FINDB: (...params) => {
        return TextFunctions.FIND(...params);
    },

    FIXED: (number, decimals, noCommas) => {
        number = H.accept(number, [Types.NUMBER]);
        decimals = H.accept(decimals, Types.NUMBER, true);
        noCommas = H.accept(noCommas, [Types.BOOLEAN],true);
        let n = Math.pow(10, decimals);

        if (!decimals) {
            n = Math.pow(10, 2);
        }

        if (number < 0) {
            number = Math.abs(number);
            return Math.round(number * n) / n * (-1);
        } else {
            return Math.round(number * n) / n;
        }
    },

    LEFT: (text, numChars) => {
        text = H.accept(text, Types.STRING);
        numChars = H.accept(numChars, Types.NUMBER, true);
        if (numChars === undefined)
            numChars = 1;

        if (numChars < 0)
            throw FormulaError.VALUE;
        if (numChars > text.length)
            return text;
        return text.slice(0, numChars);
    },

    LEFTB: (...params) => {
        return TextFunctions.LEFT(...params);
    },

    LEN: (text) => {
        text = H.accept(text, Types.STRING);
        return text.length;
    },

    LENB: (...params) => {
        return TextFunctions.LEN(...params);
    },

    LOWER: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.toLowerCase();
    },

    MID: (text, start_num, num_chars) => {
        text = H.accept(text, [Types.STRING]);
        start_num = H.accept(start_num, [Types.NUMBER]);
        num_chars = H.accept(num_chars, [Types.NUMBER]);
        let str = "";

        for (let i = start_num - 1; i < num_chars; i++) {
            str += text[i];
        }
        return str;
    },

    MIDB: (...params) => {
        return TextFunctions.MID(...params);
    },

    NUMBERVALUE: (...params) => {

    },

    PHONETIC: (...params) => {

    },

    PROPER: (text) => {
        text = H.accept(text, [Types.STRING]);
        let str = text.split(" ");
        const word = [];

        for (let char of str) {
            word.push(char[0].toUpperCase() + char.slice(1));
        }
        return word.join(" ");
    },

    REPLACE: (old_text, start_num, num_chars, new_text) => {
        old_text = H.accept(old_text, [Types.STRING]);
        start_num = H.accept(start_num, [Types.NUMBER]);
        num_chars = H.accept(num_chars, [Types.NUMBER]);
        new_text = H.accept(new_text, [Types.STRING]);

        let arr = old_text.split("");
        arr.splice(start_num - 1, num_chars, new_text);

        return arr.join("");
    },

    REPLACEB: (...params) => {
        return TextFunctions.REPLACE(...params)
    },

    REPT: (text, number_times) => {
        text = H.accept(text, [Types.STRING]);
        number_times = H.accept(number_times, [Types.NUMBER]);
        let str = "";

        for (let i = 0; i < number_times; i++) {
            str += text;
        }
        return str;
    },

    RIGHT: (text, numChars) => {
        text = H.accept(text, Types.STRING);
        if (numChars.omitted) {
            numChars = 1;
        } else {
            numChars = H.accept(numChars, Types.NUMBER);
        }
        if (numChars < 0)
            throw FormulaError.VALUE;
        const len = text.length;
        if (numChars > len)
            return text;
        return text.slice(len - numChars);
    },

    RIGHTB: (...params) => {
        return TextFunctions.RIGHT(...params);
    },

    SEARCH: (findText, withinText, startNum) => {
        findText = H.accept(findText, Types.STRING);
        withinText = H.accept(withinText, Types.STRING);
        startNum = H.accept(startNum, Types.NUMBER, true);
        if (startNum === undefined)
            startNum = 1;
        if (startNum < 1 || startNum > withinText.length)
            throw FormulaError.VALUE;
        findText = findText.replace(/[.]/, '')
        // transform to regex expression
        let findTextRegex = '[';
        for (let i = 0; i < findText.length; i++) {
            const char = findText[i];
            // A question mark matches any single character; an asterisk matches any sequence of characters.
            if (char === '~') {
                const nextChar = findText[i + 1];
                if (nextChar === '?' || nextChar === '*') {
                    // TODO;
                }
            } else if (char === '*' || char === '?') {
                findTextRegex += `]${char === '*' ? '.*' : '.'}[`;
            } else if (char === '[' || char === ']') {
                findTextRegex += '\\' + char;
            } else {
                findTextRegex += char;
            }
        }
        findTextRegex += ']';
        findTextRegex = findTextRegex.replace(/\[\]/, '');
        const res = withinText.slice(startNum - 1).search(RegExp(findTextRegex, 'i'));
        if (res === -1)
            throw FormulaError.VALUE;
        return res + startNum;
    },

    SEARCHB: (...params) => {
        return TextFunctions.SEARCH(...params)
    },

    SUBSTITUTE: (...params) => {

    },

    T: (value) => {
        // extract the real parameter
        value = H.accept(value);
        if (typeof value === "string")
            return value;
        return '';
    },

    TEXT: (value, formatText) => {
        value = H.accept(value, Types.NUMBER);
        formatText = H.accept(formatText, Types.STRING);
        // I know ssf contains bugs...
        try {
            return ssf.format(formatText, value);
        } catch (e) {
            console.error(e);
            throw FormulaError.VALUE;
        }
    },

    TEXTJOIN: (...params) => {

    },

    TRIM: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.replace(/^\s+|\s+$/g, '')
    },

    TEXTJOIN: (...params) => {

    },

    UNICHAR: (number) => {
        number = H.accept(number, [Types.NUMBER]);
        return TextFunctions.CHAR(number);
    },

    UNICODE: (text) => {
        text = H.accept(text, [Types.STRING]);
        return TextFunctions.CODE(text);
    },

    UPPER: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.toUpperCase();
    }
};

module.exports = TextFunctions;
