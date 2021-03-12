import { configureStore, Reducer } from '@reduxjs/toolkit'
import { WordAction, WordState } from './types';
import {shuffle} from "lodash"

const words = ["doper", "roes", "poes", "boord"]


const initialState: WordState = { 
    currentWord: "", 
    edgeLetters: ["p", "r", "o", "e", "s", "b", "w", "c"], 
    centerLetter: "d", 
    score: 0,
    words: words,
    foundWords: []
    };

const reducer: Reducer<WordState, WordAction> = (state = initialState, action) => {

    switch (action.type) {
        case "removeLetter": return { ...state, currentWord: state.currentWord.substring(0, state.currentWord.length - 1) }
        case "addLetter": return { ...state, currentWord: state.currentWord.concat(action.payload) }
        case "resetWord": return { ...state, currentWord: "" }
        case "submitWord": {
            const newState = {...state, currentWord: ""}
            const word = action.payload;
            if(state.foundWords.includes(word)){
                return newState
            }
            if(state.words.includes(word)){
                return {...newState, score: state.score + word.length, foundWords: [...state.foundWords, word]}
            };
            return newState
        }
        case "updateScore": return {...state, score: state.score + action.payload.addPoints}
        case "shuffle": return {...state, edgeLetters: shuffle(state.edgeLetters)}
        default: return initialState
    }
}

export default configureStore({ reducer: reducer })