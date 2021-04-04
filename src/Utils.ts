import {GameState, InitialState} from "./store/Types";

export const log = (info: any) => console.debug(info)

const backendUrl = /*process.env.REACT_APP_LAMBDA*/ "https://spelbij-games.s3.eu-central-1.amazonaws.com/game.json"

export const fetchGame: (() => Promise<InitialState>) = () => {
    if(!backendUrl){
        throw new Error("Backend url must not be empty - set REACT_APP_LAMBDA env var")
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
        if(Object.keys(state).includes("message")){
            console.log("State is invalid. Refetching");
            return fetchGame().then(s => initializeGame(s))
        }
        console.log("Expiry date: " + new Date(state.expiryDate).toISOString())
        if(state.expiryDate < Date.now()){
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