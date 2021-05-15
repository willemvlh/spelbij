import {createSelector} from "reselect";
import {IGameState} from "./Types";
import {calculateScoreForWord} from "../Utils";

const getAllWords = (state: IGameState) => state.words
const getCenterLetter = (state: IGameState) => state.centerLetter

export const getTotalScore = createSelector([getAllWords, getCenterLetter], (words, centerLetter) => {
    return words.reduce((acc, word)=> acc + calculateScoreForWord(word, centerLetter), 0)
})