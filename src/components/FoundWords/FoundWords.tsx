import React from "react";
import styles from "./FoundWords.module.css"
import {GameState} from "../../store/Types";
import {connect, ConnectedProps} from "react-redux"

type StateProps = { state: GameState }
const mapStateToProps: (state: GameState) => StateProps = (state) => ({state: state})
const connector = connect(mapStateToProps)
type Props = ConnectedProps<typeof connector>

const FoundWords: React.FC<Props> = ({state}) => {
    const startsWithLetter: ((w: string, l: string) => boolean) = (w,l) => w[0].toLowerCase() === l;
    return <div className={styles.container}>
        {state.edgeLetters.concat(state.centerLetter).sort().map(letter => {
            const foundWords = state.foundWords.filter(word => startsWithLetter(word, letter));
            const allWords = state.words.filter(word => startsWithLetter(word, letter));
            return <div key={letter} className={styles.foundWordsPart}>
                    <div className={styles.header}>
                        <span className={styles.letter}>{letter}</span>
                        <span className={styles.letterCount}>({foundWords.length} / {allWords.length})</span>

                    </div>

                    <div className={styles.foundWordsContainer}>
                        {foundWords.map(word =>
                            <div key={word} className={styles.word}>{word}</div>
                        )}
                    </div>
                </div>;
            }
        )}

    </div>
}
export default connector(FoundWords)