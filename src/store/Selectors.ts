import {createSelector} from "reselect";
import {IGameState} from "./Types";

const getAllWords = (state: IGameState) => state.words

export const getMaxScore = createSelector([getAllWords], (words) => {
    return words.reduce((acc, word)=> acc + word.length, 0)
    //note that this is not the actual max score as bonus points for word length and center letter occurrences are not counted
})