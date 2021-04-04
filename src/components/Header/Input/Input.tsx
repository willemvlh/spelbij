import React from "react";
import {GameState} from "../../../store/Types";
import styles from "./Input.module.css"

type InputComponentType = {
    state: GameState
}

export const Input: React.FC<InputComponentType> = ({state}) => {

    const inputStyle = (wordLength: number) => {
        if(wordLength > 14) return styles.extraSmall;
        if(wordLength > 9) return styles.small;
        return ""
    }

    return <div className={styles.input + " " + inputStyle(state.currentWord.length)}>
        {Array.from(state.currentWord).map(c => <span
            className={c === state.centerLetter ? styles.centerLetter : styles.edgeLetter}>{c}</span>)}
    </div>
}