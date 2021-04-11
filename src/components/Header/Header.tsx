import React, {useEffect, useState} from "react";
import styles from "./Header.module.css"
import {GameState} from "../../store/Types";
import {Input} from "./Input/Input";
import {Information} from "./Information";

const Header: React.FC<{ state: GameState }> = ({state}) => {

    let [pointsAddedStyle, setPointsAddedStyle] = useState(styles.hidden);
    useEffect(() => {
        setPointsAddedStyle(styles.pointsAdded);
        let timeout = setTimeout(() => setPointsAddedStyle(styles.hidden), 1000);
        return function(){
            clearTimeout(timeout)
        }
    }, [state.previousScore])
    return <div className={styles.top}>
        <Input state={state}/>
        <div id="meta">
            <div id={styles.topLeft}>
                <div><span className={styles.score}>{state.score}</span><span
                    className={styles.pointsAddedSize + " " + pointsAddedStyle}>+{state.score - state.previousScore}</span></div>
            </div>
            <Information/>
        </div>
    </div>
}

export default Header;