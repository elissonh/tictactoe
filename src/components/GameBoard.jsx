

export default function GameBoard({ updatePlayerTurn, board }){
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((symbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => updatePlayerTurn(rowIndex, colIndex)} disabled={symbol !== null} >{symbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}