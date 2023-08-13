function *figureElement() {
    for (let i=1; i<=9; i++)
        yield document.getElementById("n"+i);
}

let figures = [,...figureElement()];

figures[Symbol.iterator] = function*() {
    for (let i=1; i<=9; i++)
        yield document.getElementById("n"+i);
};

export default figures;