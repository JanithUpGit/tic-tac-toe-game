
import Player from "./components/Player"
import GameBord from "./components/GameBord"
import { useState } from "react";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./GameOver.jsx";


const PLAYERS = {
  X: "PLAYER 1",
  O: "PLAYER 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveGameBoard(gameTurns) {


  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;

}


function deriveActivePlayer(gameTurns) {


  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}


function deriveWinner(gameBoard, players) {

  let winner;

  for (const combination of WINNING_COMBINATIONS) {

    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];

    }

  }

  return winner;

}


function App() {

  const [players, setPlayerNames] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDrown = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns(prvTurns => {
      const currentPlayer = deriveActivePlayer(prvTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prvTurns];
      return updatedTurns;
    })

  }

  function handleResetGame() {
    setGameTurns([]);
  }

  function handleEditPlayerName(symbol, newName) {
    setPlayerNames(prevNames => ({
      ...prevNames,
      [symbol]: newName
    }));
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player player={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onEditPlayerName={handleEditPlayerName}
          />
          <Player player={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onEditPlayerName={handleEditPlayerName}
          />
        </ol>
        {(winner || hasDrown) && <GameOver winner={winner} onResart={handleResetGame} />}
        <GameBord
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      {<Log turns={gameTurns} />}

    </main>
  )
}

export default App
