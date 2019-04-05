module.exports = {
    ASC: {
        'ASC("ＡＢＣ")': "ABC",
    },

    CHAR: {
        'CHAR(65)': 'A',
        'CHAR(33)': '!',
    },
    CLEAN: {
        'CLEAN("äÄçÇéÉêPHP-MySQLöÖÐþúÚ")': "äÄçÇéÉêPHP-MySQLöÖÐþúÚ",
    },
    CODE: {
        'CODE("C")': 67
    },
    CONCAT: {
        'CONCAT(0, {1,2,3;5,6,7})': '0123567',
        'CONCAT(TRUE, 0, {1,2,3;5,6,7})': 'TRUE0123567',
        'CONCAT(0, {1,2,3;5,6,7},)': '0123567',
    },
    CONCATENATE: {
        'CONCATENATE({9,8,7})': '9',
        'CONCATENATE({9,8,7},{8,7,6})': '98',
        'CONCATENATE({9,8,7},"hello")': '9hello',
    },
    DOLLAR: {
        'DOLLAR(1234567)': "$1,234,567"
    },
    EXACT: {
        'EXACT("hello", "hElLo")': "FALSE",
        'EXACT("HELLO","HELLO")' : "TRUE"
    },
    FIND:{
        'FIND("h","Hello")' : "#VALUE!",
        'FIND("o", "hello")' : 5
    },
    FIXED:{
        'FIXED(1234.567, 1)' : 1234.6,
    },
    LEFT:{
        'LEFT("Salesman")' : "S",
        'LEFT("Salesman",4)' : "Sale"
    },
    // RIGHT:{
    //     'RIGHT("Salseman",3)' : "man",
    //     'RIGHT("Salseman")' : "n"
    // },
    LEN:{
        'LEN("Phoenix, AZ")' : 11,
    },
    LOWER:{
        'LOWER("E. E. Cummings")' : "e. e. cummings"
    },
    MID:{
        'MID("Fluid Flow",1,5)' : "Fluid"
    },
    PROPER:{
        'PROPER("this is a tiTle")' : "This Is A TiTle"
    },
    REPLACE:{
        'REPLACE("abcdefghijk",6,5,"*")' : "abcde*k",
        'REPLACE("abcdefghijk",6,0,"*")' : "abcde*fghijk"
    },
    REPT:{
        'REPT("*_",4)' : "*_*_*_*_"
    },
    T:{
        'T("*_")' : "*_",
        'T(19)' : "",
    },
    TEXT:{
      'TEXT(1234.567,"$#,##0.00")' : "$1,234.57",
    },
    TRIM:{
        'TRIM("     First Quarter Earnings    ")' : "First Quarter Earnings"
    },
    UNICHAR:{
        'UNICHAR(32)' : " ",
        'UNICHAR(66)' : "B",
        'UNICHAR(32)' : "#",
    },

};
