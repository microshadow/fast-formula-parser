module.exports = {
    AVEDEV: {

    },

    AVERAGE: {
        'AVERAGE(1,2,3)' : 2,
        'AVERAGE(1,2,3, "")' : 2,
        'AVERAGE(1,2,3, "abc")' : 2,
        'AVERAGE(10,7,9,27,2)' : 11,
        'AVERAGE(10,7,9,27,2,TRUE)' : 11,
        'AVERAGE(4,5,6,7,5,4,3)' : 4.857142857,
    },

    AVERAGEA: {
        'AVERAGEA(10,7,9,2)' : 7,
        'AVERAGEA(10,7,9,2,1)' : 5.8,
        'AVERAGEA(10,7,9,2,TRUE)' : 5.8,
        'AVERAGEA(10,7,9,2,FALSE)' : 5.6,
        'AVERAGEA(10,7,9,2,"abc")' : 5.6,
    },

    COUNT: {
        'COUNT(A2:A5, 123)': 1,
        'COUNT(A2:A5)': 0,
        'COUNT(A1:E1)': 1,
        'COUNT(A2:E2)': 3,
        'COUNT(A2:E2, A1:E1)': 4,
        'COUNT((A2:E2, A1:E1))': 4,
    },

    COUNTIF: {
        'COUNTIF(A2:A5, "apples")': 2,
        'COUNTIF(A2:A5,A4)': 1,
        'COUNTIF(A2:A5,A2)+COUNTIF(A2:A5,A3)': 3,
        'COUNTIF(B2:B5,">55")': 2,
        'COUNTIF(B2:B5,"<>"&B4)': 3,
        'COUNTIF(B2:B5,">=32")-COUNTIF(B2:B5,">85")': 3,
        'COUNTIF(A2:A5,"*")': 4,
        'COUNTIF(A2:A5,"?????es")': 2,
        'COUNTIF(B1:E1,TRUE)': 2,
        'COUNTIF(B1:E1,"=TRUE")': 2,
        'COUNTIF(B1:E1,"TRUE")': 2,
        'COUNTIF(B1:E1,"TRUE1")': 1,
        'COUNTIF(B1:E1,"=TRUE1")': 1,
        'COUNTIF(B1:E1, {1,3,4})': 1,
        'COUNTIF(C2:E2, "{1,2}")': 1,
        'COUNTIF(C2:E2, "={1,2}")': 1,
        'COUNTIF(C2:E2, {1,2})': 0,
    },

};
