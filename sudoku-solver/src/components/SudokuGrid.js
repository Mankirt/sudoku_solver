import React, {useState} from 'react';

const initialGrid = [
  [1, -1, -1, -1, -1, -1, -1, -1, -1],
  [2, -1, -1, -1, -1, -1, -1, -1, -1],
  [3, -1, -1, -1, -1, -1, -1, -1, -1],
  [4, -1, -1, -1, -1, -1, -1, -1, -1],
  [5, -1, -1, -1, -1, -1, -1, -1, -1],
  [6, -1, -1, -1, -1, -1, -1, -1, -1],
  [7, -1, -1, -1, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, -1, -1, -1, -1, -1],
  [9, -1, -1, -1, -1, -1, -1, -1, -1]
]

function generateValidSudoku() {
    // TODO: Implement a function that generates a valid, unsolved Sudoku grid
    // For now, using initial grid as a placeholder
    return initialGrid;
  }

function getInitialGrid() {
    const wasReset = localStorage.getItem('sudokuWasReset');
    if (wasReset === 'true') {
      // Generate a new valid Sudoku grid
      const newGrid = generateValidSudoku();
      localStorage.setItem('sudokuGrid', JSON.stringify(newGrid));
      localStorage.setItem('sudokuWasReset', 'false');
      return newGrid;
    }
    // Otherwise, use the saved grid or initialGrid
    const saved = localStorage.getItem('sudokuGrid');
    return saved ? JSON.parse(saved) : initialGrid;
  }

function SudokuGrid() {
  const [sudokuGrid, setSudokuGrid] = useState(initialGrid);

  function copyGrid(grid) {
    return grid.map(row => [...row]);
  }

  function onGridChange(e, row, col) {
    let val = parseInt(e.target.value) || -1
    let grid = copyGrid(sudokuGrid);
    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
      setSudokuGrid(grid);
    }
  }
  return (
    <div>
    <table>
      <tbody>
        {
          Array.from({ length: 9 }).map((_, rowIdx) => (
            <tr key={rowIdx} className={(rowIdx + 1) % 3 === 0 ? 'gridRowBorder' : ""}>
              {
                Array.from({ length: 9 }).map((_, colIdx) => (
                  <td key={colIdx} className={(colIdx + 1) % 3 === 0 ? 'gridColBorder' : ""}>
                    <input
                      onChange={(e) => onGridChange(e, rowIdx, colIdx)}
                      value={sudokuGrid[rowIdx][colIdx] === -1 ? '' : sudokuGrid[rowIdx][colIdx]}
                      className="cellInput"
                      disabled={initialGrid[rowIdx][colIdx] !== -1}
                    />
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
    <div className='buttonContainer'>
      <button className='checkButton'>Check</button>
      <button className='solveButton' >Solve</button>
      <button className='resetButton'>Reset</button>
    </div>
    </div>
  );
}

export default SudokuGrid;