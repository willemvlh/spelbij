import SBModal from "../../Modal";
import React, {useState} from "react";
import styles from "./NewGameModal.module.css"
import {Button} from "@material-ui/core";
import {GameState, InitializeAction, StopGameAction} from "../../../../store/Types";
import {connect, ConnectedProps} from "react-redux";
import {fetchGame, initializeGame} from "../../../../Utils";
import LoopIcon from '@material-ui/icons/Loop';
import {WordListForLetter} from "../../../WordListForLetter/WordListForLetter";


type ModalProps = {
    isOpen: boolean,
    onRequestClose: () => void
}

const mapStateToProps = (state: GameState) => ({
    letters: state.edgeLetters.concat(state.centerLetter),
    allWords: state.words,
    foundWords: state.foundWords,
    isNewGameLoaded: state.loaded
});
const mapDispatchToProps = (dispatch: ((action: InitializeAction | StopGameAction) => void)) => {
    return {
        startNewGame: async () => {
            dispatch({type: "stopGame"})
            const game = await fetchGame()
            dispatch({type: "initialize", payload: {state: initializeGame(game)}})
        }
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type StateProps = ConnectedProps<typeof connector>

const NewGameModal: React.FC<ModalProps & StateProps> = (props) => {
    const [letters, setLetters] = useState<string[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [allWords, setAllWords] = useState<string[]>([]);
    const [buttonWasClicked, setButtonWasClicked] = useState(false);
    const [gameIsLoaded, setGameIsLoaded] = useState(false);

    const startNewGame = async () => {
        setButtonWasClicked(true)
        setLetters(props.letters);
        setFoundWords(props.foundWords)
        setAllWords(props.allWords)
        await props.startNewGame();
        setGameIsLoaded(true)
    };

    return <SBModal shouldCloseOnOverlayClick={!buttonWasClicked} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <Button className={styles.button} disabled={buttonWasClicked} onClick={startNewGame}>Load new game</Button>
        <Button className={styles.button} disabled={!gameIsLoaded} onClick={props.onRequestClose}>Start</Button>
        {buttonWasClicked &&
        <>
            {gameIsLoaded || <LoopIcon className={styles.spin}/>}
            {letters.map(letter => <WordListForLetter letter={letter}
                                                            foundWords={foundWords.filter(w => w.startsWith(letter))}
                                                            allWords={allWords.filter(w => w.startsWith(letter))}
                                                            displayMissedWords={true}/>)}
        </>
        }
    </SBModal>
}

export default connector(NewGameModal)

