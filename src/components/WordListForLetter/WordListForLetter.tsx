import styles from "./WordListForLetter.module.css";
import {CheckCircleOutline} from "@material-ui/icons"
import React from "react";
import {Word} from "./Word";

type WordListForLetterProps = {
    letter: string,
    foundWords: string[],
    allWords: string[],
    displayMissedWords: boolean,
    shouldSort?: boolean };

export enum FoundStatus {
    Found,
    Missed,
    Hidden
}

export default function WordListForLetter({allWords, displayMissedWords, foundWords, letter, shouldSort = true}: WordListForLetterProps) {
    const wordsToShow = allWords
    const orderedWordsToShow = shouldSort ? wordsToShow.sort() : wordsToShow;

    const wordIsFound: ((word: string) => boolean) = word => {
        return foundWords.includes(word)
    }
    const getFoundStatus = word => {
        if(wordIsFound(word)){
            return FoundStatus.Found
        }
        if(displayMissedWords) {
            return FoundStatus.Missed
        }
        return FoundStatus.Hidden
    }

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
                <Word key={word} word={word} foundStatus={getFoundStatus(word)}/>
            )}
        </div>
    </div>;
}