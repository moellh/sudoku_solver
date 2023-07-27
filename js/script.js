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

let selectedCell = null;
let isAnnotating = false;
let isSolving = false;

function retieveCell(r,c) {
    grid[r][c] = document.getElementById("c"+r+c).value;
}

function retrieveGrid() {
    for (let r = 0; r<9; r++)
        for (let c = 0; c<9; c++)
            retieveCell(r,c);
}

function clickCell([r,c]) {
    if(isSolving) return;
    if (selectedCell !== null && selectedCell !== [r,c])
        document.getElementById("c"+selectedCell[0]+selectedCell[1]).classList.remove("selected");
    selectedCell = [r,c];
    document.getElementById("c"+r+c).classList.add("selected");
}

function clickNumber(number) {
    if(isSolving) return;

    if (selectedCell === null) return;
    if (isAnnotating) return; // TODO: add functionality for annotation

    let element = document.getElementById("c"+selectedCell[0]+selectedCell[1]);
    element.classList.remove("n"+grid[selectedCell[0]][selectedCell[1]]);
    element.classList.remove("selected");
    element.textContent = number;
    element.classList.add("n"+number);
    grid[selectedCell[0]][selectedCell[1]] = number;
    if (isFilled() && isSolved()) {
        document.getElementById("solve").classList.remove("selected");
        isSolving = false;
        printSuccessMessage();
    }
}

function getSector(rs,cs) {
    return  [ 
        [ grid[rs*3  ][cs*3], grid[rs*3  ][cs*3+1], grid[rs*3  ][cs*3+2] ],
        [ grid[rs*3+1][cs*3], grid[rs*3+1][cs*3+1], grid[rs*3+1][cs*3+2] ],
        [ grid[rs*3+2][cs*3], grid[rs*3+2][cs*3+1], grid[rs*3+2][cs*3+2] ]
    ];
}

function isFilled() {
    for (let r = 0; r<9; r++)
        for (let c = 0; c<9; c++)
            if (grid[r][c] === null)
                return false;

    return true;
}

function isSolved() {
    return areLinesSolved() && areSectorsSolved();
}

function areLinesSolved() {
    for (let i = 0; i<9; i++)
        if(!isRowSolved(i) || !isColumnSolved(i))
            return false;

    return true;
}

function isRowSolved(r) {
    let remainingFigures = [1,2,3,4,5,6,7,8,9];

    for (let c = 0; c<9; c++) {
        let figure = grid[r][c];
        let index = remainingFigures.indexOf(figure);
        if (index !== -1)
            remainingFigures.splice(index,1);
    }

    return remainingFigures.length === 0;
}

function isColumnSolved(c) {
    let remainingFigures = [1,2,3,4,5,6,7,8,9];

    for (let r = 0; r<9; r++) {
        let figure = grid[r][c];
        let index = remainingFigures.indexOf(figure);
        if (index !== -1)
            remainingFigures.splice(index,1);
    }
    
    return remainingFigures.length === 0;
}

function areSectorsSolved() {
    for (let rs = 0; rs<3; rs++)
        for (let cs = 0; cs<3; cs++)
            if(!isSectorSolved(rs,cs))
                return false;

    return true;
}

function isSectorSolved(rs,cs) {
    let sector = getSector(rs,cs);
    let remainingFigures = [1,2,3,4,5,6,7,8,9];
    
    for (let r = 0; r<3; r++) {
        for (let c = 0; c<3; c++) {
            let figure = sector[r][c];
            let index = remainingFigures.indexOf(figure);
            if (index !== -1)
                remainingFigures.splice(index,1);
        }
    }

    return remainingFigures.length === 0;
}

function clickSolve() {
    isSolving = !isSolving;
    let selectedElement = document.getElementById("solve");
    selectedElement.classList.toggle("selected");
    if (selectedCell !== null && selectedElement.classList.contains("selected")) {
        document.getElementById("c"+selectedCell[0]+selectedCell[1]).classList.remove("selected");
        selectedCell = null;
    }
}

function clickAnnotate() {
    if(isSolving) return;
    isAnnotating = !isAnnotating;
    document.getElementById("annotate").classList.toggle("selected");
}

function printSuccessMessage() {
    let message = document.getElementById("status");
    message.textContent = "Congratulations! You solved the puzzle!";
}