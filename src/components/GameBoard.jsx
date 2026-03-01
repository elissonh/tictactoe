

export default function GameBoard({ updatePlayerTurn, board }){
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                row.map((symbol, colIndex) => (
                    <li key={[rowIndex, colIndex]}>
                        <button className="board-button" onClick={() => updatePlayerTurn(rowIndex, colIndex)} disabled={symbol !== null} >{symbol}</button>
                    </li>
                ))
            ))}
        </ol>
    )
}