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
        {state.edgeLetters.concat(state.centerLetter).map(letter => {
            const foundWords = state.foundWords.filter(word => startsWithLetter(word, letter));
            const allWords = state.words.filter(word => startsWithLetter(word, letter));
            return <div className={styles.foundHeader}>
                    <div className={styles.letter}>
                        <span>{letter}</span>
                        <span className={styles.letterCount}>({foundWords.length} / {allWords.length})</span></div>

                    {foundWords.map(word =>
                        <div>{word}</div>
                    )}
                </div>;
            }
        )}

    </div>
}
//{foundWords.sort().map((w => <div className={styles.foundWord} key={w}>{w}</div>))}

export default connector(FoundWords)