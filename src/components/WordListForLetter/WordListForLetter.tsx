import styles from "./WordListForLetter.module.css";
import {CheckCircleOutline} from "@material-ui/icons"
import React from "react";

export function WordListForLetter(props: { letter: string, foundWords: string[], allWords: string[], displayMissedWords: boolean }) {
    const wordsToShow = props.displayMissedWords ? props.allWords : props.foundWords
    const calculateStyle = (word: string) => props.foundWords.includes(word) ? styles.foundWord : styles.missedWord

    return <div className={styles.foundWordsPart}>
        <div className={styles.header}>
            <span className={styles.letter}>{props.letter}</span>
            <span className={styles.letterCount}>({props.foundWords.length} / {props.allWords.length})</span>
            {(props.allWords.length > 0 && props.foundWords.length === props.allWords.length) &&
            <CheckCircleOutline htmlColor={"#2b9715fc"} fontSize={"small"} alignmentBaseline={"baseline"} viewBox={"-5 -5 32 32"}/>}
        </div>

        <div className={styles.foundWordsContainer}>
            {wordsToShow.map(word =>
                <div key={word} className={styles.word + " " + calculateStyle(word)}>{word}</div>
            )}
        </div>
    </div>;
}