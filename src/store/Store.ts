import {configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import logger from "redux-logger";
import {debounce} from "lodash"
import {reducer} from "./reducer";
import {InitialMultiplayerState} from "../Utils";
import {Middleware} from "redux";
import {GameState, WordAction} from "./Types";
import {socket} from "../components/App/SocketContext"

const MultiplayerMiddleware: Middleware = ({getState}) => {
    return next => action => {
        let oldState = getState() as GameState;
        let currentWord = oldState.currentWord;
        let oldScore = oldState.player.score;
        next(action)
        if((action as WordAction).type === "submitWord"){
            let state = getState() as GameState;
            if(socket.connected && state.player.score !== oldScore /*the word was correct*/ ){
                console.log("Correct guess = emit")
                socket.emit("gameUpdate", state.multiplayer.gameId, currentWord, {...state.player, name: state.multiplayer.myId})
            }
        }
    }
}

const store = configureStore({ reducer, middleware: [thunk, logger, MultiplayerMiddleware] });


const saveState = debounce(() => {
    let stateCopy = Object.assign({}, store.getState());
    stateCopy.multiplayer = InitialMultiplayerState
    localStorage.setItem("gameState", JSON.stringify(stateCopy))
    }, 1000);

store.subscribe(() => saveState())

export default store;