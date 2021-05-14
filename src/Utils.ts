import {GameState, IGameState, IInitialState} from "./store/Types";
import Dummy from "./dummyRequest"
import {TypedUseSelectorHook, useSelector as useSelectorUntyped} from "react-redux";


const isDevelopment = process.env.NODE_ENV === "development";
export const log = (info: any) => isDevelopment && console.debug(info)

const backendUrl = /*process.env.REACT_APP_LAMBDA*/ "https://k5pn0dzua9.execute-api.us-east-1.amazonaws.com/default/Spelbij-game-creator"

export const fetchGame: (() => Promise<IInitialState>) = () => {
    if(!backendUrl){
        throw new Error("Backend url must not be empty - set REACT_APP_LAMBDA env var")
    }
    return isDevelopment
        ? new Promise(resolve => setTimeout(() => resolve(Dummy), 1800))
        : fetch(backendUrl)
            .then(r => r.json())
            .then(game => game)
}

function stateIsValid(state: IGameState) {
    //compare the number of properties with those of an empty state
    let emptyState = new GameState();
    return Object.getOwnPropertyNames(state).length === Object.getOwnPropertyNames(emptyState).length
}

export const getGameFromStorageOrServer: (() => Promise<IGameState>) = () => {
    //first check local storage
    const serializedState = localStorage.getItem("gameState")
    if(serializedState){
        const state: IGameState = JSON.parse(serializedState)
        log("Found state in storage")
        if(!stateIsValid(state)){
            log("State is invalid. Refetching");
            return fetchGame().then(s => new GameState(s))
        }
        return Promise.resolve(state)
    }
    log("Nothing in local storage, fetch from server")
    //nothing in local storage, fetch from server
    return fetchGame().then(s => new GameState(s))
}

export const useSelector: TypedUseSelectorHook<IGameState> = useSelectorUntyped;
