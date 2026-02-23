import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ playerName, setPlayerName ] = useState(initialName);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handlePlayerName(event) {
        setPlayerName(event.target.value);
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            handleEditClick();
        }
    };

    return (
        <div className={isActive ? 'active' : undefined}>
            <button onClick={handleEditClick}>
                {!isEditing 
                    ? <FontAwesomeIcon icon={faPenToSquare} />
                    : <FontAwesomeIcon icon={faCheck} />
                }
            </button>
            <span className="player">
                { !isEditing 
                    ? <span className="player-name">{playerName}</span>
                    : <input type="text" required value={playerName} onChange={handlePlayerName} onKeyDown={handleEnterKey}></input>}
                <span className="player-symbol">{symbol}</span>
            </span>
        </div>
    );
}