import React from "react";
import styles from "./Header.module.css"
import {GameState} from "../../store/Types";
import {Input} from "./Input/Input";
import {Information} from "./Information";

const Header: React.FC<{state: GameState}> = ({state}) => {

    return <div className={styles.top}>
        <Input state={state}/>
        <div id="meta">
            <div id={styles.topLeft}>
                <div>Score: <span className={styles.bold}>{state.score}</span></div>
                <div id="words-left">Nog <span
                    className={styles.bold}>{state.words.length - state.foundWords.length}</span> woorden
                </div>
            </div>
            <Information/>
        </div>
    </div>
}

export default Header;