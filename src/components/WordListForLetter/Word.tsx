import React from "react";
import styles from "./WordListForLetter.module.css"
import {FoundStatus} from "./WordListForLetter";

export const Word: React.FC<{ word: string, foundStatus: FoundStatus }> = ({word, foundStatus}) => {
    function getClassName() {
        switch (foundStatus) {
            case FoundStatus.Found:
                return styles.foundWord;
            case FoundStatus.Missed:
                return styles.missedWord;
            case FoundStatus.Hidden:
                return styles.hiddenWord;
        }
    }

    function getStyle() {
        switch (foundStatus) {
            case FoundStatus.Hidden:
                return {width: calculateWidth() + "px"}
            default:
                return {}
        }
    }

    function calculateWidth() {
        return word.length * 8.4 //approximately
    }

    function getWord() {
        switch (foundStatus) {
            case FoundStatus.Hidden:
                return "";
            default:
                return word
        }
    }

    return <div className={getClassName() + " " + styles.word} style={getStyle()}>{getWord()}</div>
}