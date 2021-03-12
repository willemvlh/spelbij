import {AddLetterAction, RemoveLetterAction, ResetWordAction, ShuffleAction, SubmitWordAction, WordAction} from "./types"

export const addLetter:((letter: string) => AddLetterAction) = letter => {
    return {type: "addLetter", payload: letter}
}

export const submitWord: ((word: string) => SubmitWordAction) = word => {
    return {type: "submitWord", payload: word}
}

export const shuffle: (() => ShuffleAction) = () => {
    return {type: "shuffle"}
}

export const removeLetter: (() => RemoveLetterAction) = () => {
    return {type: "removeLetter"}
}

export const resetWord: (() => ResetWordAction) = () => {
    return {type: "resetWord"}
}