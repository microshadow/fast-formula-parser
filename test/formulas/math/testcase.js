module.exports = {

    'CEILING.MATH': {
        'CEILING.MATH(24.3,5)': 25,
        'CEILING.MATH(6.7)': 7,
        'CEILING.MATH(-6.7)': -7,
        'CEILING.MATH(-8.1,2)': -8,
        'CEILING.MATH(-5.5,2,-1)': -6
    },

    FLOOR: {
        'FLOOR(0,)': 0,
        'FLOOR(12,0)': 0,
        'FLOOR(3.7,2)': 2,
        'FLOOR(-2.5,-2)': -2,
        'FLOOR(-2.5,2)': -4,
        'FLOOR(2.5,-2)': '#NUM!',
        'FLOOR(1.58,0.1)': 1.5,
        'FLOOR(0.234,0.01)': 0.23,
        'FLOOR(-8.1,2)': -10,
    },
    'FLOOR.MATH': {
        'FLOOR.MATH(0)': 0,
        'FLOOR.MATH(12, 0)': 0,
        'FLOOR.MATH(24.3,5)': 20,
        'FLOOR.MATH(6.7)': 6,
        'FLOOR.MATH(-8.1,2)': -10,
        'FLOOR.MATH(-5.5,2,-1)': -4,
        'FLOOR.MATH(-5.5,2,1)': -4,
        'FLOOR.MATH(-5.5,2,)': -6,
        'FLOOR.MATH(-5.5,2)': -6,
        'FLOOR.MATH(-5.5,-2)': -6,
        'FLOOR.MATH(5.5,2)': 4,
        'FLOOR.MATH(5.5,-2)': 4,
        'FLOOR.MATH(24.3,-5)': 20,
        'FLOOR.MATH(-8.1,-2)': -10,
    },

    'FLOOR.PRECISE': {
        'FLOOR.PRECISE(-3.2,-1)': -4,
        'FLOOR.PRECISE(3.2, 1)': 3,
        'FLOOR.PRECISE(-3.2, 1)': -4,
        'FLOOR.PRECISE(3.2,-1)': 3,
        'FLOOR.PRECISE(3.2)': 3,
        'FLOOR.PRECISE(0)': 0,
        'FLOOR.PRECISE(3.2, 0)': 0,
    },

    GCD: {
        'GCD(5, 2)': 1,
        'GCD(24, 36)': 12,
        'GCD(7, 1)': 1,
        'GCD(5, 0)': 5,
        'GCD(123, 0)': 123,
        'GCD(128, 80, 44)': 4,
        'GCD(128, 80, 44,)': 4,
        'GCD(128, 80, 44, 2 ^ 53)': '#NUM!', // excel parse this as #NUM!
        'GCD("a")': '#VALUE!',
    },

    INT: {
        'INT(0)': 0,
        'INT(8.9)': 8,
        'INT(-8.9)': -9,
    },

    LCM: {
        'LCM(5, 2)': 10,
        'LCM(24, 36)': 72,
        'LCM(50,56,100)': 1400,
        'LCM(50,56,100,)': 1400,
        'LCM(128, 80, 44, 2 ^ 53)': '#NUM!', // excel parse this as #NUM!
    },

    LN: {
        'LN(86)': 4.454347296253507,
        'LN(EXP(1))': 1,
        'LN(EXP(3))': 3,
    },

    LOG: {
        'LOG(10)': 1,
        'LOG(8, 2)': 3,
        'LOG(86, EXP(1))': 4.454347296253507,
    },

    LOG10: {
        'LOG10(86)': 1.9344984512435677,
        'LOG10(10)': 1,
        'LOG10(100000)': 5,
        'LOG10(10^5)': 5,
    }
};
