let grid = [ 
    [ null, null, null,  null, null, null,  null, null, null ],
    [ null, null, null,  null, null, null,  null, null, null ],
    [ null, null, null,  null, null, null,  null, null, null ],

    [ null, null, null,  null, null, null,  null, null, null ],
    [ null, null, null,  null, null, null,  null, null, null ],
    [ null, null, null,  null, null, null,  null, null, null ],

    [ null, null, null,  null, null, null,  null, null, null ],
    [ null, null, null,  null, null, null,  null, null, null ],
    [ null, null, null,  null, null, null,  null, null, null ]
];

/**
 * Returns a 3x3 array of the sector at the given coordinates
 * 
 * @param {number} x in [0,2]
 * @param {number} y in [0,2]
 * @returns {number[][]} 2d-array of the sector
 */
function getSector(x,y) {
    
    return  [ 
        [ grid[x*3][y*3  ], grid[x*3+1][y*3  ], grid[x*3+2][y*3  ] ],
        [ grid[x*3][y*3+1], grid[x*3+1][y*3+1], grid[x*3+2][y*3+1] ],
        [ grid[x*3][y*3+2], grid[x*3+1][y*3+2], grid[x*3+2][y*3+2] ]
    ];

}

/**
 * @returns {boolean} true if the sudoku is solved
 */
function isSolved() {

    return areLinesSolved() && areSectorsSolved();

}

/**
 * @returns {boolean} true if all lines are solved
 */
function areLinesSolved() {

    for (let i = 0; i<9; i++) {
        if(!isRowSolved(i) || !isColumnSolved(i)) {
            return false;
        }
    }

    return true;

}

/**
 * Returns whether row `y` is solved: contains all numbers from 1 to 9
 * @param {number} y in [0,8] is index of row
 * @returns {boolean} true if row is solved
 */
function isRowSolved(y) {

    let remainingFigures = [1,2,3,4,5,6,7,8,9];

    for (let i = 0; i<9; i++) {
        let figure = grid[i][y];
        let index = remainingFigures.indexOf(figure);
        if (index !== null)
            remainingFigures.splice(index,1);
    }

    return remainingFigures.length === 0;

}

/**
 * Returns whether row `x` is solved: contains all numbers from 1 to 9
 * @param {number} x in [0,8] is index of column
 * @returns {boolean} true if column is solved
 */
function isColumnSolved(x) {

    let remainingFigures = [1,2,3,4,5,6,7,8,9];

    for (let i = 0; i<9; i++) {
        let figure = grid[x][i];
        let index = remainingFigures.indexOf(figure);
        if (index !== null)
            remainingFigures.splice(index,1);
    }

    return remainingFigures.length === 0;

}

/**
 * Returns whether all sectors are solved: each contains all numbers from 1 to 9
 * @returns {boolean} true if all sectors are solved
 */
function areSectorsSolved() {

    for (let i = 0; i<3; i++) {
        for (let j = 0; j<3; j++) {
            if(!isSectorSolved(i,j))
                return false;
        }
    }

    return true;

}

/**
 * Returns whether sector at coordinates `x`,`y` is solved: contains all numbers
 * from 1 to 9
 * @param {number} x in [0,2] is index of sector
 * @param {number} y in [0,2] is index of sector
 * @returns {boolean} true if sector is solved
 */
function isSectorSolved(x,y) {
    
    let sector = getSector(x,y);
    let remainingFigures = [1,2,3,4,5,6,7,8,9];
    
    for (let i = 0; i<3; i++) {
        for (let j = 0; j<3; j++) {
            let figure = sector[i][j];
            let index = remainingFigures.indexOf(figure);
            if (index !== null)
                remainingFigures.splice(index,1);
        }
    }

    return remainingFigures.length === 0;

}