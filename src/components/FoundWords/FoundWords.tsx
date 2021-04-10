import React from "react";
import styles from "./FoundWords.module.css"

type FoundWordsComponentProps = {
    foundWords: string[]
}

const FoundWords: React.FC<FoundWordsComponentProps> = ({foundWords}) => {
    return <div className={styles.container}>
        {foundWords.sort().map((w => <div className={styles.foundWord} key={w}>{w}</div>))}
    </div>
}

export default FoundWords