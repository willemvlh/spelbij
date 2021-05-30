import styles from "./WordListForLetter.module.css";
import {CheckCircleOutline} from "@material-ui/icons"
import React from "react";

type WordListForLetterProps = {
    letter: string,
    foundWords: string[],
    allWords: string[],
    displayMissedWords: boolean,
    shouldSort?: boolean };

export default function WordListForLetter({allWords, displayMissedWords, foundWords, letter, shouldSort = true}: WordListForLetterProps) {
    const wordsToShow = displayMissedWords ? allWords : foundWords;
    const orderedWordsToShow = shouldSort ? wordsToShow.sort() : wordsToShow;
    const calculateStyle = (word: string) => foundWords.includes(word) ? styles.foundWord : styles.missedWord
    const isEveryWordFound = allWords.length > 0 && foundWords.length === allWords.length;
    return <div className={styles.foundWordsPart} role={"listitem"}>
        <h5 className={styles.header}>
            <span className={styles.letter}>{letter}</span>
            <span className={styles.letterCount}>({foundWords.length} / {allWords.length})</span>
            {isEveryWordFound &&
            <CheckCircleOutline htmlColor={"#2b9715fc"} fontSize={"small"} alignmentBaseline={"baseline"}
                                viewBox={"-5 -5 32 32"}/>}
        </h5>

        <div className={styles.foundWordsContainer}>
            {orderedWordsToShow.map(word =>
                <div key={word} className={styles.word + " " + calculateStyle(word)}>{word}</div>
            )}
        </div>
    </div>;
}