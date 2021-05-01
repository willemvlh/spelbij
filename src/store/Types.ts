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
        multiplayer: {
            gameId: string,
            myId: string
            otherPlayers: PlayerState[]
        }
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

export interface SetScoreAction extends Action {
    type: "updateScore",
    payload: number
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

export interface SetMultiplayerGameIdAction extends Action {
    type: "setMultiplayerGameId",
    payload: string
}

export interface UpdateMultiplayerPlayerListAction extends Action{
    type: "updateMultiplayerPlayerList",
    payload: PlayerState[]
}

export interface SetPlayerIdAction extends Action{
    type: "setPlayerId",
    payload: string
}

export interface UpdateGameFromMultiplayerAction extends Action{
    type: "updateGameFromMultiplayer",
    payload: {words: string[], foundWords: string[], edgeLetters: string[], centerLetter: string}
}

export type WordAction =
    InitializeAction
    | AddLetterAction
    | ClearErrorAction
    | RemoveLetterAction
    | ResetWordAction
    | SubmitWordAction
    | SetScoreAction
    | ShuffleAction
    | StopGameAction
    | SetMultiplayerGameIdAction
    | SetPlayerIdAction
    | UpdateMultiplayerPlayerListAction
    | UpdateGameFromMultiplayerAction;