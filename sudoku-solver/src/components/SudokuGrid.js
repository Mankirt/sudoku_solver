import React, {useState, useEffect} from 'react';

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
  const [sudokuGrid, setSudokuGrid] = useState(getInitialGrid());
  const [rowSets, setRowSets] = useState(() => buildSets(sudokuGrid).rowSets);
  const [colSets, setColSets] = useState(() => buildSets(sudokuGrid).colSets);
  const [boxSets, setBoxSets] = useState(() => buildSets(sudokuGrid).boxSets);

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

  useEffect(() => {
    localStorage.setItem('sudokuGrid', JSON.stringify(sudokuGrid));
  }, [sudokuGrid]);

  function checkSudoku() {
    // Build local sets from the user's current grid
    const { rowSets: localRowSets, colSets: localColSets, boxSets: localBoxSets } = buildSets(sudokuGrid);

    // Check completeness: all sets should have size 9
    const isComplete =
      localRowSets.every(set => set.size === 9) &&
      localColSets.every(set => set.size === 9) &&
      localBoxSets.every(set => set.size === 9);

    // Use local sets for the solver
    let sudoku = copyGrid(sudokuGrid);
    const isSolvable = solveSudokuHelper(sudoku, 0, 0, localRowSets, localColSets, localBoxSets);

    if (isSolvable && isComplete) {
      alert("Sudoku is complete!");
    } else if (isSolvable) {
      alert("Sudoku is solvable but not complete.");
    } else {
      alert("Sudoku cannot be solved.");
    }
  }

  function getNext(row, col) {
    if (col < 8) {
      return [row, col + 1];
    } else if (row < 8) {
      return [row + 1, 0];
    } else {
      return [9, 0]; // Signal completion
    }
  }

  function solveSudokuHelper(grid, row = 0, col = 0, rowSets, colSets, boxSets) {
    if (row === 9) return true;

    if (grid[row][col] !== -1) {
      const [newRow, newCol] = getNext(row, col);
      return solveSudokuHelper(grid, newRow, newCol, rowSets, colSets, boxSets);
    }

    const boxIdx = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    // Shuffle numbers 1-9 for randomness
    const nums = [1,2,3,4,5,6,7,8,9];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    for (let k = 0; k < nums.length; k++) {
      const num = nums[k];
      if (!rowSets[row].has(num) && !colSets[col].has(num) && !boxSets[boxIdx].has(num)) {
        grid[row][col] = num;
        rowSets[row].add(num);
        colSets[col].add(num);
        boxSets[boxIdx].add(num);

        const [newRow, newCol] = getNext(row, col);
        if (solveSudokuHelper(grid, newRow, newCol, rowSets, colSets, boxSets)) {
          return true;
        }

        grid[row][col] = -1;
        rowSets[row].delete(num);
        colSets[col].delete(num);
        boxSets[boxIdx].delete(num);
      }
    }
    return false;
  }

  function solveSudoku() {
    let crrGrid = copyGrid(sudokuGrid);

    // Initialize sets
    let rowSets = Array.from({ length: 9 }, () => new Set());
    let colSets = Array.from({ length: 9 }, () => new Set());
    let boxSets = Array.from({ length: 9 }, () => new Set());

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = crrGrid[r][c];
        if (val !== -1) {
          rowSets[r].add(val);
          colSets[c].add(val);
          const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
          boxSets[boxIdx].add(val);
        }
      }
    }

    solveSudokuHelper(crrGrid, 0, 0, rowSets, colSets, boxSets);
    setSudokuGrid(crrGrid);
  }

  function copyGrid(grid) {
    return grid.map(row => [...row]);
  }

  function onGridChange(e, row, col) {
    let val = parseInt(e.target.value) || -1;
    let grid = copyGrid(sudokuGrid);
    const boxIdx = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    // Remove old value from sets
    const oldVal = grid[row][col];
    if (oldVal !== -1) {
      rowSets[row].delete(oldVal);
      colSets[col].delete(oldVal);
      boxSets[boxIdx].delete(oldVal);
    }

    // Check sets for immediate validity
    if (val !== -1 && (rowSets[row].has(val) || colSets[col].has(val) || boxSets[boxIdx].has(val))) {
      alert("Invalid move: number already exists in row, column, or box!");
      // Restore old value to sets
      if (oldVal !== -1) {
        rowSets[row].add(oldVal);
        colSets[col].add(oldVal);
        boxSets[boxIdx].add(oldVal);
      }
      return;
    }

    // Add new value to sets
    if (val !== -1) {
      rowSets[row].add(val);
      colSets[col].add(val);
      boxSets[boxIdx].add(val);
    }

    grid[row][col] = val;
    setSudokuGrid(grid);
    setRowSets([...rowSets]);
    setColSets([...colSets]);
    setBoxSets([...boxSets]);
  }

  function resetSudoku() {
    localStorage.setItem('sudokuWasReset', 'true');
    const newGrid = getInitialGrid();
    setSudokuGrid(newGrid);

    // Rebuild sets from the new grid
    const { rowSets: newRowSets, colSets: newColSets, boxSets: newBoxSets } = buildSets(newGrid);
    setRowSets(newRowSets);
    setColSets(newColSets);
    setBoxSets(newBoxSets);
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
      <button className='checkButton' onClick={checkSudoku}>Check</button>
      <button className='solveButton' onClick={solveSudoku}>Solve</button>
      <button className='resetButton'onClick={resetSudoku}>Reset</button>
    </div>
    </div>
  );
}

export default SudokuGrid;