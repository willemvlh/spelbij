import styles from "./WordListForLetter.module.css";
import React from "react";

export function WordListForLetter(props: { letter: string, foundWords: string[], allWords: string[], displayMissedWords: boolean }) {
    const wordsToShow = props.displayMissedWords ? props.allWords : props.foundWords
    const missedWords = props.allWords.filter(w => !props.foundWords.includes(w))
    return <div className={styles.foundWordsPart}>
        <div className={styles.header}>
            <span className={styles.letter}>{props.letter}</span>
            <span className={styles.letterCount}>({props.foundWords.length} / {props.allWords.length})</span>
        </div>

        <div className={styles.foundWordsContainer}>
            {wordsToShow.map(word =>
                <div key={word} className={styles.word + missedWords.includes(word) && styles.missedWord}>{word}</div>
            )}
        </div>
    </div>;
}