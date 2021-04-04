import {Action} from "@reduxjs/toolkit";

export type InitialState = { words: string[], edgeLetters: string[], centerLetter: string, expiryDate: number, inputError: string | null }
export type GameState = InitialState &
    {
        currentWord: string,
        score: number,
        foundWords: string[],
        loaded: boolean
        inputError: string | null
    }

export interface AddLetterAction extends Action {
    type: "addLetter",
    payload: string
}

export interface RemoveLetterAction extends Action {
    type: "removeLetter"
}

export interface ResetWordAction extends Action {
    type: "resetWord"
}

export interface SubmitWordAction extends Action {
    type: "submitWord",
}

export interface ClearErrorAction extends Action {
    type: "clearError"
}

export interface ShuffleAction extends Action {
    type: "shuffle"
}

export interface UpdateScoreAction extends Action {
    type: "updateScore",
    payload: {
        addPoints: number
    }
}

export interface InitializeAction extends Action {
    type: "initialize",
    payload: {
        state: GameState
    }
}

export type WordAction =
    InitializeAction
    | AddLetterAction
    | ClearErrorAction
    | RemoveLetterAction
    | ResetWordAction
    | SubmitWordAction
    | UpdateScoreAction
    | ShuffleAction;