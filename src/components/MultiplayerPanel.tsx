import {PlayerState} from "../store/Types";
import React from "react";

const MultiplayerPanel: React.FC<{players: PlayerState[]}> = ({players}) => {
    return <div>
        <ul>
            {players.map(pl => <li key={pl.name}>{pl.name} | {pl.score}</li>)}
        </ul>
    </div>
}

export default MultiplayerPanel