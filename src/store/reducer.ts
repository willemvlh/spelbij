import {Reducer} from "@reduxjs/toolkit";
import {GameState, InitializeAction, WordAction} from "./Types";
import {shuffle} from "lodash";
import {InitialGameState} from "../Utils";



const calculateNewScore: ((score: number, word: string, centerLetter: string) => number) = (score,word,centerLetter) => {
    const basicScore = word.length;
    const centerLetterBonus = Array.from(word).filter(l => l === centerLetter).length - 1;
    const longWordBonus = Math.max(0, word.length - 5);
    const fullWordScore = basicScore + centerLetterBonus + longWordBonus;
    return score + fullWordScore;
}

function handleWordSubmission(state: GameState) :GameState {
    const newState = {...state, currentWord: ""}
    const word = state.currentWord
    if (state.foundWords.includes(word)) {
        return {...newState, inputError: "Dit woord is al gevonden"}
    }
    if (word.length < 4){
        return {...newState, inputError: "Woord moet minstens 4 karakters bevatten."}
    }
    if (!word.includes(state.centerLetter)) {
        return {...newState, inputError: `Woord moet minstens 1 ${state.centerLetter.toUpperCase()} bevatten.`}
    }
    if (state.words.includes(word)) {
        return {...newState, player: {...newState.player, score: calculateNewScore(state.player.score, word, state.centerLetter)}, foundWords: [...state.foundWords, word]}
    }
    return {...newState, inputError: "Onbekend woord"}
}

export const reducer: Reducer<GameState, WordAction> = (state, action) => {
    if (state === undefined) {
        let a = action as InitializeAction
        return a.payload?.state ?? InitialGameState
    }
    switch (action.type) {
        case "stopGame":
            return {...InitialGameState, wasStopped: true}
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
        case "shuffle":
            return {...state, edgeLetters: shuffle(state.edgeLetters)}
        case "clearError":
            return {...state, inputError: null}

        default:
            throw new Error("Unknown action: " + action["type"])
    }
}