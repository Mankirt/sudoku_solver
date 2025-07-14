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
          Array.from({ length: 9 }, (r, rowIdx) => (
            <tr key={rowIdx}>
              {
                Array.from({ length: 9 }, (c, colIdx) => (
                  <td key={colIdx}>
                    <input onChange={(e) => onGridChange(e, rowIdx, colIdx)} 
                    value={sudokuGrid[rowIdx][colIdx] === -1 ? '' : sudokuGrid[rowIdx][colIdx]} 
                    className="cellInput" 
                    disabled={initialGrid[rowIdx][colIdx] !== -1}/>
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
    <div className='buttonContainer'>
      <button className='saveButton'>Solve</button>
    </div>
    </div>
  );
}

export default SudokuGrid;