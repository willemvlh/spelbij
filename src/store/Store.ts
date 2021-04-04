import {configureStore, Reducer} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import logger from "redux-logger";
import {InitializeAction, WordAction, GameState} from './Types';
import {shuffle, debounce} from "lodash"

const initialState: GameState = {
    currentWord: "",
    edgeLetters: [],
    centerLetter: "",
    score: 0,
    words: [],
    foundWords: [],
    loaded: false,
    expiryDate: 0
    };


const reducer: Reducer<GameState, WordAction> = (state, action) => {
    if(state === undefined){
        let a = action as InitializeAction
        return a.payload?.state ?? initialState
    }
    switch (action.type) {
        case "initialize":
            return {...action.payload.state, loaded: true}
        case "removeLetter":
            return { ...state, currentWord: state.currentWord.substring(0, state.currentWord.length - 1) }
        case "addLetter":
            if(!(state.centerLetter + state.edgeLetters).includes(action.payload)){
                return state;
            }
            if(state.currentWord.length === 19){
                return state;
            }
            return { ...state, currentWord: state.currentWord.concat(action.payload) }
        case "resetWord":
            return { ...state, currentWord: "" }
        case "submitWord": {
            const newState = {...state, currentWord: ""}
            const word = state.currentWord
            if(state.foundWords.includes(word)){
                return newState
            }
            if(state.words.includes(word)){
                return {...newState, score: state.score + word.length, foundWords: [...state.foundWords, word]}
            }
            return newState
        }
        case "updateScore":
            return {...state, score: state.score + action.payload.addPoints}
        case "shuffle":
            return {...state, edgeLetters: shuffle(state.edgeLetters)}
        default:
            return state
    }
}


const store = configureStore({ reducer, middleware: [thunk, logger] });
const saveState = debounce(() => localStorage.setItem("gameState", JSON.stringify(store.getState())), 1000);

store.subscribe(() => saveState())

export default store;