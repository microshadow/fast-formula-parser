const FormulaError = require('./error');
const {FormulaHelpers, Types} = require('./helpers');
const H = FormulaHelpers;

const TextFunctions = {
    //For Double-byte character set (DBCS) languages,
    // the function changes full-width (double-byte) characters to half-width (single-byte) characters.

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

    BAHTTEXT: (number) => {
        // Converts a number to Thai text and adds a suffix of "Baht."
        // we do not need this function for our project
        throw FormulaError.NOT_IMPLEMENTED("BAHTTEXT")
    },

    CHAR: (number) => {
        number = H.accept(number, [Types.NUMBER]);
        if (number === 0){
            return "#VALUE!"
        }

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
        let str = "";
        for (let i = 0; i < params.length; i++) {
            str += params[i];
        }
        return str;
    },

    CONCATENATE: (...params) => {
        // from Microsoft Documents
        // Important: In Excel 2016, Excel Mobile, and Excel Online, this function has been replaced with the CONCAT function.
        // Although the CONCATENATE function is still available for backward compatibility,
        // you should consider using CONCAT from now on. This is because CONCATENATE may not be available in future versions of Excel.
        return TextFunctions.CONCAT(...params);
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

    FIND: (find_text, within_text) => {
        find_text = H.accept(find_text, [Types.STRING]);
        within_text = H.accept(within_text, [Types.STRING]);

        if (find_text === "") {
            return 1;
        }

        for (let i = 0; i < within_text.length; i++) {
            if (find_text === within_text[i]) {
                return i + 1;
            }
        }
        return "#VALUE!";
    },

    FINDB: (find_text, within_text) => {
        return TextFunctions.FIND(find_text, within_text);
    },

    FIXED: (number, decimals) => {
        number = H.accept(number, [Types.NUMBER]);
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

    LEFT: (text, num_chars) => {
        text = H.accept(text, [Types.STRING]);
        let str = "";

        if (!num_chars) {
            return text[0];
        }

        for (let i = 0; i < num_chars; i++){
            str += text[i];
        }
        return str;
    },

    LEFTB: (text, num_bytes) => {
        TextFunctions.LEFTB(text, num_bytes)
    },

    LEN: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.length;
    },

    LENB: (text) => {
        return TextFunctions.LENB(text);
    },

    LOWER: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.toLowerCase();
    },

    MID: (text,start_num,num_chars) => {
        text = H.accept(text, [Types.STRING]);
        start_num = H.accept(start_num, [Types.NUMBER]);
        num_chars = H.accept(num_chars, [Types.NUMBER]);
        let str = "";

        for (let i = start_num - 1; i < num_chars; i++){
            str += text[i];
        }
        return str;
    },

    MIDB: (text,start_num,num_chars) => {
        return TextFunctions.MID(text,start_num,num_chars);
    },

    NUMBERVALUE: (text, decimal_separator, group_separator) => {

    },

    PHONETIC: (...params) => {

    },

    PROPER: (text) => {
        text = H.accept(text, [Types.STRING]);
        let str = text.split(" ");
        const word = [];

        for (let char of str){
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

    REPLACEB: (old_text, start_num, num_bytes, new_text) => {
        return TextFunctions.REPLACE(old_text, start_num, num_bytes, new_text);
    },

    REPT: (text, number_times) => {
        text = H.accept(text, [Types.STRING]);
        number_times = H.accept(number_times, [Types.NUMBER]);
        let str = "";

        for (let i = 0; i < number_times; i++){
            str += text;
        }
        return str;
    },

    RIGHT: (text, num_chars) => {
        text = H.accept(text, [Types.STRING]);
        let str = "";

        if (!num_chars) {
            return text[text.length - 1];
        }

        for (let i = 0; i < num_chars; i++){
            str = text[text.length - i - 1] + str;
        }
        return str;
    },

    RIGHTB: (text, num_bytes) => {
        return TextFunctions.RIGHT(text, num_bytes);
    },

    SEARCH: (...params) => {

    },

    SEARCHB: (...params) => {

    },

    SUBSTITUTE: (text, old_text, new_text) => {

    },

    T: (value) => {
        return typeof value === "string" ? value : "";
    },

    TEXT: (...params) => {

    },

    TEXTJOIN: (...params) => {

    },

    TRIM: (text) => {
        text = H.accept(text, [Types.STRING]);
        return text.replace(/^\s+|\s+$/g, '')
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
    },

    VALUE: (...params) => {

    },
};

module.exports = TextFunctions;
