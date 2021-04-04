import {
    AddLetterAction,
    ClearErrorAction,
    RemoveLetterAction,
    ResetWordAction,
    ShuffleAction,
    SubmitWordAction
} from "./Types"

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

export const clearError: (() => ClearErrorAction) = () => {
    return {type: "clearError"}
}

export const resetWord: (() => ResetWordAction) = () => {
    return {type: "resetWord"}
}