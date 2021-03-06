import {Reducer} from "@reduxjs/toolkit";
import {IGameState, WordAction} from "./Types";
import {shuffle} from "lodash";
import {calculateScoreForWord} from "../Utils";

const initialState: IGameState = {
    currentWord: "",
    edgeLetters: [],
    centerLetter: "",
    score: 0,
    words: [],
    foundWords: [],
    loaded: false,
    inputError: null,
    wasStopped: false,
    previousScore: 0
};

const calculateNewScore: ((score: number, word: string, centerLetter: string) => number) = (score,word,centerLetter) => {
    return score + calculateScoreForWord(word, centerLetter);
}

function handleWordSubmission(state: IGameState) {
    const newState = {...state, currentWord: ""}
    const word = state.currentWord
    if (state.foundWords.includes(word)) {
        return {...newState, inputError: "Dit woord is al gevonden."}
    }
    if (word.length < 4){
        return {...newState, inputError: "Woord moet minstens 4 karakters bevatten."}
    }
    if (!word.includes(state.centerLetter)) {
        return {...newState, inputError: `Woord moet minstens 1 ${state.centerLetter.toUpperCase()} bevatten.`}
    }
    if (state.words.includes(word)) {
        return {...newState, score: calculateNewScore(state.score, word, state.centerLetter), previousScore: state.score, foundWords: [...state.foundWords, word]}
    }
    return {...newState, inputError: "Onbekend woord."}
}

export const reducer: Reducer<IGameState, WordAction> = (state, action) => {
    if(state === undefined) throw new Error("please supply an initial state");
    switch (action.type) {
        case "stopGame":
            return {...initialState, wasStopped: true}
        case "initialize":
            return {...action.payload.state, loaded: true}
        case "removeLetter":
            return {...state, currentWord: state.currentWord.substring(0, state.currentWord.length - 1)}
        case "addLetter":
            if (!(state.centerLetter + state.edgeLetters).includes(action.payload)) {
                return state;
            }
            if (state.currentWord.length === 19) {
                return state;
            }
            return {...state, inputError: null, currentWord: state.currentWord.concat(action.payload)}
        case "resetWord":
            return {...state, currentWord: ""}
        case "submitWord": {
            return handleWordSubmission(state)
        }
        case "updateScore":
            return {...state, score: state.score + action.payload.addPoints}
        case "shuffle":
            return {...state, edgeLetters: shuffle(state.edgeLetters)}
        case "clearError":
            return {...state, inputError: null}
        default:
            return state
    }
}