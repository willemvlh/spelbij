import {Action} from "@reduxjs/toolkit";

export type InitialState = { words: string[], edgeLetters: string[], centerLetter: string }

export type PlayerState = {
    name: string,
    score: number,
    previousScore: number
}

export type GameState = InitialState &
    {
        player: PlayerState,
        currentWord: string,
        foundWords: string[],
        loaded: boolean
        inputError: string | null,
        wasStopped: boolean,
        otherPlayers: PlayerState[]
    }

export interface AddLetterAction extends Action {
    type: "addLetter",
    payload: string
}

export interface StopGameAction extends Action {
    type: "stopGame",
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

export interface PlayerJoinAction extends Action {
    type: "playerJoin",
    payload: PlayerState
}

export type WordAction =
    InitializeAction
    | AddLetterAction
    | ClearErrorAction
    | RemoveLetterAction
    | ResetWordAction
    | SubmitWordAction
    | UpdateScoreAction
    | ShuffleAction
    | StopGameAction;