import React from "react";
import styles from "./Header.module.css"
import { GameState } from "../../store/Types";
import {Input} from "./Input/Input";


const header:React.FC<{state: GameState}> = ({state}) => {
    return <div className={styles.top}>
        <Input state={state}/>
        <div id="meta">
            <div id="score">Score: {state.score}</div>
            <div id="words-left">Nog {state.words.length - state.foundWords.length} woorden</div>
        </div>
    </div>
}

export default header;