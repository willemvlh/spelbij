import {GameState, InitialState} from "./store/Types";

export const log = (info: any) => process.env.NODE_ENV === "development" && console.debug(info)

const backendUrl = /*process.env.REACT_APP_LAMBDA*/ "https://k5pn0dzua9.execute-api.us-east-1.amazonaws.com/default/Spelbij-game-creator"

export const fetchGame: (() => Promise<InitialState>) = () => {
    if(!backendUrl){
        throw new Error("Backend url must not be empty - set REACT_APP_LAMBDA env var")
    }
    return fetch(backendUrl)
        .then(r => r.json())
        .then(game => game)
}

export const initializeGame: ((bare: InitialState) => GameState) = (bare) => {
    return {...bare, foundWords: [], loaded: true, score: 0, currentWord: "", inputError: null, wasStopped: false, previousScore: 0}
}

export const getGameFromStorageOrServer: (() => Promise<GameState>) = () => {
    //first check local storage
    const serializedState = localStorage.getItem("gameState")
    if(serializedState){
        const state: GameState = JSON.parse(serializedState)
        log("Found state in storage")
        if(Object.keys(state).includes("message")){
            log("State is invalid. Refetching");
            return fetchGame().then(s => initializeGame(s))
        }
        return Promise.resolve(state)
    }
    log("Nothing in local storage, fetch from server")
    //nothing in local storage, fetch from server
    return fetchGame().then(s => initializeGame(s))
}