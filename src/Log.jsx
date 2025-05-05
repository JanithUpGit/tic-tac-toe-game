


export default function Log({ turns }) {

    return(
        <ol id="log">
            {turns.map(turns =>(
                <li key={`${turns.square.row}${turns.square.col}`}>
                    {turns.player} Selected {turns.square.row}, {turns.square.col}
                </li>
            ))}
        </ol>
    );
}