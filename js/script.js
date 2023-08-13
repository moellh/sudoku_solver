import Grid from "./grid.js";
import Selection from "./selection.js";
import { lock, solve, annotate } from "./actionButtons.js";
import figures from "./figures.js";

let grid = new Grid;
let selection = new Selection(grid);

// Add event listeners to Grid-Cells.
grid.forEach(cell => 
    cell.element.addEventListener("click", () => clickCell(cell.row,cell.col))
);

// Add event listeners to Number-Buttons.
figures.forEach((element,figure) => 
    element.addEventListener("click", () => clickNumber(figure))
);
    
// Add event listeners to Action-Buttons.
annotate.element.addEventListener("click", () => clickAnnotate());
solve.element.addEventListener("click", () => clickSolve());
lock.element.addEventListener("click", () => clickLock());


/**
 * Clicking a cell selects it.
 * 
 * The previously selected cell is deselected.
 */
function clickCell(row,col) {
    if (!solve.active && !grid.get(row,col).isLocked)
        selection.select(row,col);
}

/**
 * Clicking a number sets it to the selected cell.
 * 
 * No action occurs if the selected cell is locked, if the sudoku is currently 
 * being auto-solved, if there is no selection.
 * If annotation-mode is active, the number is annotated to the selected cell.
 * 
 * @param {int} figure 
 */
function clickNumber(figure) {
    if(solve.active || !selection.exists || selection.figure === figure 
        || grid.get(selection.row,selection.col).isLocked)
        return;
    if(selection.figure === null && annotate.active && !solve.active)
        selection.annotate(figure);

    selection.set(figure);
    checkSolved();
}

function checkSolved() {
    if (!grid.isFilled() || !grid.isSolved())
        return;

    solveElement.classList.remove("selected");
    isSolving = false;
    printSuccessMessage();
}

function clickSolve() {
    solve.active ^= true;
    solve.element.classList.toggle("selected");
    if (selectedCellPosition !== null && selectedElement.classList.contains("selected")) {
        document.getElementById("c"+selectedCellPosition[0]+selectedCellPosition[1]).classList.remove("selected");
        selectedCellPosition = null;
    }
}

function clickAnnotate() {
    if(solve.active)
        return;
    annotate.active ^= true;
    document.getElementById("annotate").classList.toggle("selected");
}

function printSuccessMessage() {
    let message = document.getElementById("status");
    message.textContent = "Congratulations! You solved the sudoku!";
}