
import { useState } from 'react';

export default function Player({ player, symbol,isActive ,onEditPlayerName}) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(player);

    function handleEditClick() {
        setIsEditing(isEditing =>!isEditing);
        if (isEditing) {
            onEditPlayerName(symbol, playerName);
        }
        
    }

    function handleInputChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let buttonCaption = 'Edit';

    if (isEditing) {    
        editablePlayerName = <input type='text' required value={playerName} onChange={handleInputChange}/>;
        buttonCaption = 'Save';
    }

    return(
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {editablePlayerName}
          <span className="player-symbol">{symbol}</span>

        </span>
        <button onClick={handleEditClick}>{buttonCaption}</button>
      </li>
    );
}