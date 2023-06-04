# Sudoku Solver

> This project is **still in the making** since the begin of June 2023 and therefore **does not work**!

This project is a solver for any given valid soduku game.
After the input of a mostly empty sudoku-field, you can simulate the addition of a single correct number or the whole sudoku-game.
In addition, you can yourself enter numbers into the field.
However, if your numbers are wrong, it's your fault.

Theoretically, sudoku is a game with $9^{81} \approx 1.9662705 \cdot 10^{77}$ valid scenarios.
Thus, solving a sudoku-game is in $\mathcal O(1)$.
But in reality, you cannot simply calculate all these cases.
That is why, I will be trying my best to make a quicker solver (without just googling a solution).
