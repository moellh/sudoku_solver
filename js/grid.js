class Cell {
    figure = null
    annotations = new Set()
    isLocked = false

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.element = document.getElementById("c"+row+col);
    }

    set(figure) {
        if(!this.exists || !figure || this.isLocked)
            return;

        if(this.figure !== null) {
            figures[this.figure].classList.remove("selected");
            this.element.classList.remove("t"+this.figure);
        }
        this.element.textContent = figure;
        figures[figure].classList.add("selected");
        this.element.classList.add("t"+figure);
        this.#grid.set(this.row, this.col, figure);
    }

    annotate(figure) {
        if(!this.exists || !figure || this.#grid.get(this.row,this.col).isLocked)
            return;

        if(this.element.textContent !== figure && !this.element.firstChild)
            this.addAnnotations();

        if(this.annotations.has(figure)) {
            this.element.firstChild.removeChild(this.element.lastChild);
            this.annotations.delete(figure);
        } else {
            let annotation = document.createElement("div");
            annotation.classList.add("a","t"+figure);
            annotation.textContent = figure;
            this.element.firstChild.appendChild(annotation);
            this.annotations.add(figure);
        }
    }

    addAnnotations() {
        let annotation = document.createElement("div");
        annotation.classList.add("annotation");
        this.element.appendChild(annotation);
    }

    removeAnnotations() {
        this.element.removeChild(this.element.lastChild);
    }
}

export default class Grid {

    #grid = new Array(9);

    constructor() {
        for (let row = 0; row < 9; row++) {
            this.#grid[row] = new Array(9);
            for (let col = 0; col < 9; col++) {
                this.#grid[row][col] = new Cell(row,col);
            }
        }
    }

    get(row,col) {
        return this.#grid[row][col];
    }

    set(row,col,figure) {
        this.#grid[row][col].figure = figure;
    }

    forEach(callback) {
        for (let row = 0; row < 9; row++)
            for (let col = 0; col < 9; col++)
                callback(this.#grid[row][col]);
    }

    getSector(rowSector,colSector) {
        let sector = new Array(3);
        for (let dRow = 0; dRow<3; dRow++) {
            sector[dRow] = this.#grid[rowSector*3+dRow].slice(colSector*3,colSector*3+3);
        }
        return sector;
    }
    
    isFilled() {
        for (let row = 0; row<9; row++)
            for (let col = 0; col<9; col++)
                if (!this.get(row,col).figure)
                    return false;
        return true;
    }
    
    isSolved() {
        return areLinesSolved() && areSectorsSolved();
    }
    
    areLinesSolved() {
        for (let i = 0; i<9; i++)
            if(!isRowSolved(i) || !isColumnSolved(i))
                return false;
    
        return true;
    }
    
    isRowSolved(row) {
        let remainingFigures = [1,2,3,4,5,6,7,8,9];
        for (let col = 0; col<9; col++) {
            let figure = this.get(row,col).figure;
            let index = remainingFigures.indexOf(figure);
            if (index !== -1)
                remainingFigures.splice(index,1);
        }
        return remainingFigures.length === 0;
    }
    
    isColumnSolved(col) {
        let remainingFigures = [1,2,3,4,5,6,7,8,9];
        for (let row = 0; row<9; row++) {
            let figure = this.get(row,col).figure;
            let index = remainingFigures.indexOf(figure);
            if (index !== -1)
                remainingFigures.splice(index,1);
        }
        return remainingFigures.length === 0;
    }
    
    areSectorsSolved() {
        for (let rowSector = 0; rowSector<3; rowSector++)
            for (let colSector = 0; colSector<3; colSector++)
                if(!isSectorSolved(rowSector,colSector))
                    return false;
        return true;
    }
    
    isSectorSolved(rowSector,colSector) {
        let sector = getSector(rowSector,colSector);
        let remainingFigures = [1,2,3,4,5,6,7,8,9];
        
        for (let row = 0; row<3; row++) {
            for (let col = 0; col<3; col++) {
                let figure = sector[row][col].figure;
                let index = remainingFigures.indexOf(figure);
                if (index !== -1)
                    remainingFigures.splice(index,1);
            }
        }
    
        return remainingFigures.length === 0;
    }
}