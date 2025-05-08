import { useState } from "react";



export default function Player({playerName, playerSymbol, isActive, onNameChange}) {
    const [show, setShow] = useState(false);

    function changeName(event) {
        onNameChange(event.target.value);
    }

    function makeItVisible() {
        setShow((entry)=> !entry);
    }


    let showInputTag;
    let saveOrEdit;

    if (show) {
        showInputTag = <input className='player-name' type="text" value={playerName} onChange={changeName}/>
        saveOrEdit= "Save";
    } else {
        showInputTag = <span className="player-name">{playerName}</span>
        saveOrEdit= "Edit";  
    }
    


    return (
        <li className={playerSymbol === isActive ? "active": undefined}>
            <span className="player">
            {showInputTag}
                <span className="player-symbol">
                    {playerSymbol}
                </span>
            </span>
        <button onClick={makeItVisible} >{saveOrEdit}</button>
        </li>
    );
}