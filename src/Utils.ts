import {GameState, InitialState} from "./store/Types";
import process from "process"

export const log = (info: any) => console.debug(info)

const backendUrl = process.env.LAMBDA

export const fetchGame: (() => Promise<InitialState>) = () => {
    if(!backendUrl){
        throw new Error("Backend url must not be empty - please set LAMBDA env var")
    }
    return fetch(backendUrl)
        .then(r => r.json())
        .then(game => game)
}

export const initializeGame: ((bare: InitialState) => GameState) = (bare) => {
    return {...bare, foundWords: [], loaded: true, score: 0, currentWord: ""}
}

export const getGameFromStorageOrServer: (() => Promise<GameState>) = () => {
    //first check local storage
    const serializedState = localStorage.getItem("gameState")
    if(serializedState){
        const state: GameState = JSON.parse(serializedState)
        console.log("Found state in storage")
        console.log("Expiry date: " + new Date(state.expiryDate * 1000).toISOString())
        if(state.expiryDate * 1000 < Date.now()){
            console.log("Game is expired")
            //if local game is expired, fetch a new one
            return fetchGame().then(s => initializeGame(s))
        }
        console.log("Game is not expired")
        //if not expired, return saved game
        return Promise.resolve(state)
    }
    console.log("Nothing in local storage, fetch from server")
    //nothing in local storage, fetch from server
    return fetchGame().then(s => initializeGame(s))
}