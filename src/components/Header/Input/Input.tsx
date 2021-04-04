import React from "react";
import {GameState} from "../../../store/Types";
import styles from "./Input.module.css"

type InputComponentType = {
    state: GameState
}

export const Input: React.FC<InputComponentType> = ({state}) => {
    return <div className={styles.input}>
        {Array.from(state.currentWord).map(c => <span
            className={c == state.centerLetter ? styles.centerLetter : styles.edgeLetter}>{c}</span>)}
    </div>
}