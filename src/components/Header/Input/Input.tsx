import React from "react";
import {IGameState} from "../../../store/Types";
import styles from "./Input.module.css"
import InputError from "./InputError";

type InputComponentType = {
    state: IGameState
}

export const Input: React.FC<InputComponentType> = ({state}) => {

    const inputStyle = (wordLength: number) => {
        if(wordLength > 14) return styles.extraSmall;
        if(wordLength > 9) return styles.small;
        return ""
    }

    const inputError = state.inputError && <InputError error={state.inputError}/>

    return <div className={styles.input + " " + inputStyle(state.currentWord.length)}>
        {inputError}
        {Array.from(state.currentWord).map(c => <span
            className={c === state.centerLetter ? styles.centerLetter : styles.edgeLetter}>{c}</span>)}
    </div>
}