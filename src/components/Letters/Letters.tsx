import Block from "../Letter/Letter";
import React from "react";
import styles from "./Letters.module.css"

type LettersComponentProps = {
    edgeLetters: string[],
    centerLetter: string
}

const letters: React.FC<LettersComponentProps> = ({edgeLetters, centerLetter}) => {
    return <div id={styles.hive} role={"grid"}>
        {edgeLetters.slice(0, 4).map(l => <Block key={l} letter={l} />)}
        <Block letter={centerLetter} isMiddle key="middle" />
        {edgeLetters.slice(4).map(l => <Block letter={l} key={l} />)}
    </div>
}

export default letters;