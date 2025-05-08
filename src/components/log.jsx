

export default function Log({ currentClicked }) {

    return (
        <ol id="log">
            {currentClicked.map((turn, index)=> (
                <li key={index}>
                    {turn.playerName} select {turn.row},{turn.col}
                </li>
            ))}
        </ol>
    );
}   