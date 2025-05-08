export default function GameBoard({ board, onSelect }) {
    return (
      <>
      <div id="game-board">
        <ol>
          {board.map((row, rowIndex) => (
            //row means which array is clicked
            <li key={rowIndex}>
              <ol>
                {row.map((col, colIndex) => (
                  //col is inside value of array's like 0 , 1 , 2
                  <li key={colIndex}>
                    <button onClick={() => onSelect(rowIndex, colIndex)}>
                      {col}
                    </button>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
      {/* <div id="game-over">
            <h2>Game Over!!</h2>
            <p>Player 1 won</p>
            <button>restart</button>
        </div> */}
      </>
    );
  }
  