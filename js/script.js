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


function retieveCell(row,col) {
    grid[row][col] = document.getElementById("c"+row+col).value;
}

function retrieveGrid() {
    for (let row = 0; i<9; i++)
        for (let col = 0; j<9; j++)
            retieveCell(row,col);
}

function getSector(row,col) {
    return  [ 
        [ grid[row*3  ][col*3], grid[row*3  ][col*3+1], grid[row*3  ][y*3+2] ],
        [ grid[row*3+1][col*3], grid[row*3+1][col*3+1], grid[row*3+1][y*3+2] ],
        [ grid[row*3+2][col*3], grid[row*3+2][col*3+1], grid[row*3+2][y*3+2] ]
    ];
}

function isSolved() {
    return areLinesSolved() && areSectorsSolved();
}

function areLinesSolved() {
    for (let i = 0; i<9; i++) {
        if(!isRowSolved(i) || !isColumnSolved(i))
            return false;
    }

    return true;
}

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

function areSectorsSolved() {
    for (let i = 0; i<3; i++)
        for (let j = 0; j<3; j++)
            if(!isSectorSolved(i,j))
                return false;

    return true;
}

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