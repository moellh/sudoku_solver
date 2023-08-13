import figures from "./figures.js";

export default class Selection {
    row = null
    col = null

    #grid = null

    constructor(grid) {
        this.#grid = grid;
    }

    get cell() {
        return this.#grid.get(this.row,this.col);
    }

    get annotations() {
        return this.cell.annotations;
    }

    get element() {
        return this.cell.element;
    }

    get figure() {
        return this.cell.figure;
    }

    get exists() {
        return this.row && this.col;
    }

    get isLocked() {
        return this.cell.isLocked;
    }

    isNew(row,col) {
        return !this.exists || this.row !== row || this.col !== col;
    }

    select(row,col) {
        if (this.isNew(row,col))
            this.deselect();

        this.row = row;
        this.col = col;
        this.element.classList.add("selected");
        if(this.figure !== null)
            figures[this.figure].classList.add("selected");
    }

    deselect() {
        if (!this.exists)
            return;
        
        if(this.figure !== null)
            figures[this.figure].classList.remove("selected");

        this.row = null;
        this.col = null;
        this.element.classList.remove("selected");
    }
};