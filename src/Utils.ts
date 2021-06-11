import {GameState, InitialState, PlayerState} from "./store/Types";
import Dummy from "./dummyRequest"


export const isDevelopment = process.env.NODE_ENV === "development";
export const log = (info: any) => isDevelopment && console.debug(info)

const backendUrl = /*process.env.REACT_APP_LAMBDA*/ "https://multiplayer--spelbij.netlify.app/.netlify/functions/app"

export const fetchGame: (() => Promise<InitialState>) = () => {
    if(!backendUrl){
        throw new Error("Backend url must not be empty - set REACT_APP_LAMBDA env var")
    }
    return isDevelopment
        ? new Promise(resolve => setTimeout(() => resolve(Dummy), 1800))
        : fetch(backendUrl)
            .then(r => r.json())
            .then(game => game)
}

const initialPlayerState: PlayerState = {
    name: "Myself",
    score: 0,
    previousScore: 0
}

export const InitialMultiplayerState = {
    gameId: "",
    myId: "",
    otherPlayers: []
}

export const InitialGameState: GameState = {
    player: initialPlayerState,
    currentWord: "",
    edgeLetters: [],
    centerLetter: "",
    words: [],
    foundWords: [],
    loaded: false,
    inputError: null,
    wasStopped: false,
    multiplayer: InitialMultiplayerState
};

export const initializeGame: ((bare: InitialState) => GameState) = (bare) => {
    return {...InitialGameState, ...bare}
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