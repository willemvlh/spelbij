import React from "react";
import styles from "./FoundWords.module.css"
import WordListForLetter from "../WordListForLetter/WordListForLetter";

type FoundWordsProps = {
    edgeLetters: string[],
    centerLetter: string,
    foundWords: string[],
    allWords: string[]
}
const FoundWords: React.FC<FoundWordsProps> = (props) => {
    const startsWithLetter: ((w: string, l: string) => boolean) = (w,l) => w[0].toLowerCase() === l;
    return <div className={styles.container} role={"list"}>
        {props.edgeLetters.concat(props.centerLetter).sort().map(letter => {
            const foundWords = props.foundWords.filter(word => startsWithLetter(word, letter));
            const allWords = props.allWords.filter(word => startsWithLetter(word, letter));
            return <WordListForLetter key={letter} letter={letter} foundWords={foundWords} allWords={allWords} displayMissedWords={false}/>;
            }
        )}

    </div>
}
export default FoundWords