import React from 'react';

function SudokuGrid() {
  return (
    <table>
      <tbody>
        {
          Array.from({ length: 9 }, (_, rowIdx) => (
            <tr key={rowIdx}>
              {
                Array.from({ length: 9 }, (_, colIdx) => (
                  <td key={colIdx}>
                    <input className="cellInput" />
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