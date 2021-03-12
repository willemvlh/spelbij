import { Action } from "@reduxjs/toolkit";

export type WordState = { currentWord: string, edgeLetters: string[], centerLetter: string, score: number, words: string[], foundWords: string[]}

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
    payload: string
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

export type WordAction = AddLetterAction | RemoveLetterAction | ResetWordAction | SubmitWordAction | UpdateScoreAction | ShuffleAction;