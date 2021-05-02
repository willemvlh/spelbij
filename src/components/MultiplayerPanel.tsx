import {PlayerState} from "../store/Types";
import React, {useContext} from "react";
import {sortBy} from "lodash"
import {SocketContext} from "./App/SocketContext";

const MultiplayerPanel: React.FC<{players: PlayerState[]}> = ({players}) => {
    let socket = useContext(SocketContext);
    return socket.connected ? <div>
        <ul>
            {sortBy(players, pl => pl.score).map(pl => <li key={pl.name}>{pl.name} | {pl.score}</li>)}
        </ul>
    </div> : <></>
}

export default MultiplayerPanel