import './i18n';
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

import Player from './components/Player'
import GameBoard from './components/GameBoard'
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const INITIAL_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function getActivePlayer(gameTurns) {
  let currentPlayerSymbol = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayerSymbol = 'O';
  }
  return currentPlayerSymbol;
}

function getBoard(gameTurns) {
  let board = [...INITIAL_BOARD.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    const { move, player } = turn;
    const { row, col } = move;
    board[row][col] = player;
  }
  return board;
}

function getWinnerSymbol(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].col];
    const secondSquareSymbol = board[combination[1].row][combination[1].col];
    const thirdSquareSymbol = board[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      return firstSquareSymbol;
    }
  }
  return null;
}

function App() {
  const { t } = useTranslation();
  const initial_players = {
    'X': t('game.initialPlayer1'),
    'O': t('game.initialPlayer2')
  };
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(initial_players);

  const currentPlayerSymbol = getActivePlayer(gameTurns);
  const board = getBoard(gameTurns);
  const winnerSymbol = getWinnerSymbol(board);
  const winner = players[winnerSymbol];
  const hasDraw = gameTurns.length === 9;

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  function handleBoardMove(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayerSymbol = getActivePlayer(gameTurns);
      const updatedTurns = [
        { move: { row: rowIndex, col: colIndex }, player: currentPlayerSymbol },
        ...prevTurns
      ];
      return updatedTurns;
    })
  }

  function handleRematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <h1>{t('common.title')}</h1>
      <div id='game-container'>
        <div id='players' className='highlight-player'>
          <Player 
            initialName={t('game.initialPlayer1')}
            symbol='X'
            isActive={currentPlayerSymbol === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={t('game.initialPlayer2')}
            symbol='O'
            isActive={currentPlayerSymbol === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </div>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard updatePlayerTurn={handleBoardMove} board={board} />
      </div>
    </main>
  )
}

export default App
