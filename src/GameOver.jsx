export default function GameOver({ winner, onResart }) {

    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner?<p>{winner} won!</p>:<p>It's a draw!</p>}

            <p>
            <button onClick={onResart}>Rematch!</button>
        
            </p>
            
        </div>
    );

}