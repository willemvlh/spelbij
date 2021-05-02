import {createContext} from "react";
import {io} from "socket.io-client";
import {isDevelopment} from "../../Utils";
import store from "../../store/Store"
import {
    UpdateGameFromMultiplayerAction,
    PlayerState,
    SetMultiplayerGameIdAction,
    SetPlayerIdAction,
    UpdateMultiplayerPlayerListAction
} from "../../store/Types";

if(isDevelopment) localStorage.setItem("debug", "*");

export const socket = io("http://spelbijmultiplayer-env.eba-6ukdgehm.us-east-1.elasticbeanstalk.com/", {autoConnect: false})
socket.on("identification", id => {
    store.dispatch<SetPlayerIdAction>({type: "setPlayerId", payload: id})
})

type Game = {
    players: { name: string; score: number }[];
    foundWords: string[];
    words: string[];
    edgeLetters: string[];
    centerLetter: string;
};

socket.on("information", (roomId, game: Game) => {
    let players: PlayerState[] = game.players.map(pl => ({...pl, previousScore: 0}));
    store.dispatch<SetMultiplayerGameIdAction>({type: "setMultiplayerGameId", payload: roomId});
    store.dispatch<UpdateMultiplayerPlayerListAction>({type: "updateMultiplayerPlayerList", payload: players})
    store.dispatch<UpdateGameFromMultiplayerAction>({type: "updateGameFromMultiplayer", payload: {centerLetter: game.centerLetter, edgeLetters: game.edgeLetters, words: game.words, foundWords: game.foundWords }})
})

socket.onAny((...args) => console.log(args))

export const SocketContext = createContext(socket);

export function SocketProvider(props) {
    return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
}