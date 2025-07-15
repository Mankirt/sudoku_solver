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

function buildSets(grid) {
  let rowSets = Array.from({ length: 9 }, () => new Set());
  let colSets = Array.from({ length: 9 }, () => new Set());
  let boxSets = Array.from({ length: 9 }, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = grid[r][c];
      if (val !== -1) {
        rowSets[r].add(val);
        colSets[c].add(val);
        const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        boxSets[boxIdx].add(val);
      }
    }
  }
  return { rowSets, colSets, boxSets };
}

function SudokuGrid() {
  const [sudokuGrid, setSudokuGrid] = useState(getInitialGrid());
  const [rowSets, setRowSets] = useState(() => buildSets(sudokuGrid).rowSets);
  const [colSets, setColSets] = useState(() => buildSets(sudokuGrid).colSets);
  const [boxSets, setBoxSets] = useState(() => buildSets(sudokuGrid).boxSets);

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