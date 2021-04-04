import React from "react";
import styles from "./FoundWords.module.css"

type FoundWordsComponentProps = {
    foundWords: string[]
}

const foundWords: React.FC<FoundWordsComponentProps> = ({foundWords}) => {
    return <div className={styles.container}>
        {foundWords.map((w => <div className={styles.foundWord} key={w}>{w}</div>))}
    </div>
}

export default foundWords