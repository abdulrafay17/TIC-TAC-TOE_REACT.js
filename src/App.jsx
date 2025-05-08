import { useState } from "react";
import Player from "./components/player.jsx";
import GameBoard from "./components/gameboard.jsx";
import Log from "./components/log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

export default function App() {
  const [winner, setWinner] = useState(null);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [symbolSwitch, setSymbolSwitch] = useState("X");
  const [clickedCell, setClickedCell] = useState([]);
  const [gameBoard, setGameBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  function checkWinner(board) {
    for (const combo of WINNING_COMBINATIONS) {
      const first = board[combo[0].row][combo[0].column];
      const second = board[combo[1].row][combo[1].column];
      const third = board[combo[2].row][combo[2].column];

      console.log("Checking combo:");
      console.log(
        `(${combo[0].row},${combo[0].column}): ${first}, ` +
        `(${combo[1].row},${combo[1].column}): ${second}, ` +
        `(${combo[2].row},${combo[2].column}): ${third}`
      );

      if (first && first === second && first === third) {
        return first; // X or O
      }
    }

    const isFull = board.every(row => row.every(cell => cell !== null));
    if (isFull) {
      return "draw";
    }

  }

  function handleSelect(row, col) {
    if (gameBoard[row][col] !== null || winner) return;

    const updatedBoard = gameBoard.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return symbolSwitch;
        }
        return cell;
      })
    );

    setGameBoard(updatedBoard);
    setClickedCell(prev => [
      ...prev,
      {
        playerName: symbolSwitch === "X" ? player1Name : player2Name,
        row,
        col
      }
    ]);

    const possibleWinner = checkWinner(updatedBoard);
    if (possibleWinner) {
      setWinner(possibleWinner);
    } else {
      setSymbolSwitch(symbolSwitch === "X" ? "O" : "X");
    }
  }

  function handleRestart() {
    setGameBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    setClickedCell([]);
    setSymbolSwitch("X");
    setWinner(null);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName={player1Name}
            playerSymbol="X"
            isActive={symbolSwitch}
            onNameChange={setPlayer1Name}
          />
          <Player
            playerName={player2Name}
            playerSymbol="O"
            isActive={symbolSwitch}
            onNameChange={setPlayer2Name}
          />
        </ol>
        <GameBoard board={gameBoard} onSelect={handleSelect} />
      </div>
      <Log currentClicked={clickedCell} />
      {winner && (
        <div id="game-over">
          <h2>Game Over!!</h2>
          <p>
            {winner === "draw"
              ? "It's a draw!"
              : `${winner === "X" ? player1Name : player2Name} won`}
          </p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </main>
  );
}
