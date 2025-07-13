import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Sudoku Solver</h3>
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
        
      </header>
    </div>
  );
}

export default App;
