import React from "react";
import styles from "./FoundWords.module.css"
import {IGameState} from "../../store/Types";
import {connect, ConnectedProps} from "react-redux"
import {WordListForLetter} from "../WordListForLetter/WordListForLetter";

type StateProps = { state: IGameState }
const mapStateToProps: (state: IGameState) => StateProps = (state) => ({state: state})
const connector = connect(mapStateToProps)
type Props = ConnectedProps<typeof connector>

const FoundWords: React.FC<Props> = ({state}) => {
    const startsWithLetter: ((w: string, l: string) => boolean) = (w,l) => w[0].toLowerCase() === l;
    return <div className={styles.container}>
        {state.edgeLetters.concat(state.centerLetter).sort().map(letter => {
            const foundWords = state.foundWords.filter(word => startsWithLetter(word, letter));
            const allWords = state.words.filter(word => startsWithLetter(word, letter));
            return <WordListForLetter key={letter} letter={letter} foundWords={foundWords} allWords={allWords} displayMissedWords={false}/>;
            }
        )}

    </div>
}
export default connector(FoundWords)