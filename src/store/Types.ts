import {Action} from "@reduxjs/toolkit";

export interface IInitialState {
    words: string[],
    edgeLetters: string[],
    centerLetter: string
}

export interface IGameState extends IInitialState {
    currentWord: string,
    score: number,
    foundWords: string[],
    loaded: boolean
    inputError: string | null,
    wasStopped: boolean,
    previousScore: number
}

export class GameState implements IGameState{
    centerLetter: string;
    currentWord: string = "";
    edgeLetters: string[];
    foundWords: string[] = [];
    inputError: string | null = null;
    loaded: boolean = true;
    previousScore: number = 0;
    score: number = 0;
    wasStopped: boolean = false;
    words: string[];

    constructor(initial?: IInitialState) {
        this.centerLetter = initial?.centerLetter ?? ""
        this.edgeLetters = initial?.edgeLetters ?? []
        this.words = initial?.words ?? []
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

export interface UpdateScoreAction extends Action {
    type: "updateScore",
    payload: {
        addPoints: number
    }
}

export interface InitializeAction extends Action {
    type: "initialize",
    payload: {
        state: IGameState
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
    | ShuffleAction
    | StopGameAction;