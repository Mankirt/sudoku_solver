import logo from './logo.svg';
import './App.css';
import SudokuGrid from './components/SudokuGrid';

function App() {
  // This is the main App component that renders the Sudoku solver interface
  return (
    <div className="App">
      <header className="App-header">
        <h3>Sudoku Solver</h3>
        <SudokuGrid />
        
      </header>
    </div>
  );
}

export default App;
