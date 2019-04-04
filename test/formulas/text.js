const chai = require('chai');
const expect = require('chai').expect;
const TextFunctions = require('../../formulas/functions/text');

describe('Text Functions', function () {
    it('ASC should ..', function () {
        const result = TextFunctions.ASC("ＡＢＣ");
        expect(result).to.equal("ABC")
    });

    it('BAHTTEXT should ..', function () {
        const result = TextFunctions.BAHTTEXT("1234");
        expect(result).to.equal("")
    });

    it('CHAR should ..', function () {
        let result = TextFunctions.CHAR(67);
        expect(result).to.equal("C");

        result = TextFunctions.CHAR(0);
        expect(result).to.equal("#VALUE!")
    });

    it('CLEAN should ..', function () {
        const result = TextFunctions.CLEAN("äÄçÇéÉêPHP-MySQLöÖÐþúÚ");
        expect(result).to.equal("PHP-MySQL")
    });

    it('CODE should ..', function () {
        const result = TextFunctions.CODE("C");
        expect(result).to.equal(67)
    });

    it('CONCAT should ..', function () {
        const result = TextFunctions.CONCAT("I"," hate"," carrot");
        expect(result).to.equal("I hate carrot")
    });

    it('DOLLAR should ..', function () {
        const result = TextFunctions.DOLLAR(1234567);
        expect(result).to.equal("$1,234,567")
    });

    it('EXACT should ..', function () {
        const result = TextFunctions.EXACT("hello", "Hello");
        expect(result).to.equal(false)
    });

    it('FIND should ..', function () {
        const result = TextFunctions.FIND("h", "Hello");
        expect(result).to.equal("#VALUE!")
    });

    it('FINDB should ..', function () {
        const result = TextFunctions.FINDB("o", "Hello");
        expect(result).to.equal(5)
    });

    it('FIXED should ..', function () {
        const result = TextFunctions.FIXED(1234.567, 1);
        expect(result).to.equal(1234.6)
    });

    it('FIXED should ..', function () {
        const result = TextFunctions.FIXED(1234.567, -1);
        expect(result).to.equal(1230)
    });

    it('FIXED should ..', function () {
        const result = TextFunctions.FIXED(-1234.567, -1);
        expect(result).to.equal(-1230)
    });

    it('FIXED should ..', function () {
        const result = TextFunctions.FIXED(44.332);
        expect(result).to.equal(44.33)
    });

    it('LEFT should ..', function () {
        const result = TextFunctions.LEFT("Salesman");
        expect(result).to.equal("S")
    });

    it('LEFT should ..', function () {
        const result = TextFunctions.LEFT("Salesman",4);
        expect(result).to.equal("Sale")
    });

    it('RIGHT should ..', function () {
        const result = TextFunctions.RIGHT("Salesman");
        expect(result).to.equal("n")
    });

    it('RIGHT should ..', function () {
        const result = TextFunctions.RIGHT("Salesman",3);
        expect(result).to.equal("man")
    });

    it('LEN should ..', function () {
        const result = TextFunctions.LEN("Phoenix, AZ");
        expect(result).to.equal(11)
    });

    it('LOWER should ..', function () {
        const result = TextFunctions.LOWER("E. E. Cummings");
        expect(result).to.equal("e. e. cummings")
    });

    it('MID should ..', function () {
        const result = TextFunctions.MID("Fluid Flow",1,5 );
        expect(result).to.equal("Fluid")
    });

    it('PROPER should ..', function () {
        const result = TextFunctions.PROPER("this is a tiTle");
        expect(result).to.equal("This Is A TiTle")
    });

    it('REPLACE should ..', function () {
        const result = TextFunctions.REPLACE("abcdefghijk", 6, 5, "*");
        expect(result).to.equal("abcde*k")
    });

    it('REPLACEB should ..', function () {
        const result = TextFunctions.REPLACEB("abcdefghijk", 6, 0, "*");
        expect(result).to.equal("abcde*fghijk")
    });

    it('REPT should ..', function () {
        const result = TextFunctions.REPT("*_", 4);
        expect(result).to.equal("*_*_*_*_")
    });

    it('T should ..', function () {
        let result = TextFunctions.T("*_");
        expect(result).to.equal("*_");

        result = TextFunctions.T(19);
        expect(result).to.equal("");
    });

    it('TRIM should ..', function () {
        let result = TextFunctions.TRIM("     First Quarter Earnings    ");
        expect(result).to.equal("First Quarter Earnings");
    });

    it('UNICHAR should ..', function () {
        let result = TextFunctions.UNICHAR(32);
        expect(result).to.equal(" ");

        result = TextFunctions.UNICHAR(66);
        expect(result).to.equal("B");

        result = TextFunctions.UNICHAR(0);
        expect(result).to.equal("#VALUE!");
    });

    it('UNICODE should ..', function () {
        let result = TextFunctions.UNICODE(" ");
        expect(result).to.equal(32);

        result = TextFunctions.UNICODE("B");
        expect(result).to.equal(66);
    });

    it('UPPER should ..', function () {
        let result = TextFunctions.UPPER("total");
        expect(result).to.equal("TOTAL");

        result = TextFunctions.UPPER("YieLD");
        expect(result).to.equal("YIELD");
    });

});
