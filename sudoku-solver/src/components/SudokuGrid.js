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
  return (
    <table>
      <tbody>
        {
          Array.from({ length: 9 }, (_, rowIdx) => (
            <tr key={rowIdx}>
              {
                Array.from({ length: 9 }, (_, colIdx) => (
                  <td key={colIdx}>
                    <input value={sudokuGrid[rowIdx][colIdx] === -1 ? '' : sudokuGrid[rowIdx][colIdx]} className="cellInput" />
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default SudokuGrid;