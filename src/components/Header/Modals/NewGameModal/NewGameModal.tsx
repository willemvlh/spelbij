import SBModal from "../../Modal";
import React, {useState} from "react";
import styles from "./NewGameModal.module.css"
import {Button} from "@material-ui/core";
import {GameState, InitializeAction, StopGameAction} from "../../../../store/Types";
import {connect, ConnectedProps} from "react-redux";
import {fetchGame, initializeGame} from "../../../../Utils";
import LoopIcon from '@material-ui/icons/Loop';


type ModalProps = {
    isOpen: boolean,
    onRequestClose: () => void
}

const mapStateToProps = (state: GameState) => ({notFoundWords: state.words, isNewGameLoaded: state.loaded});
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
    const [notFoundWords, setNotFoundWords] = useState<string[]>([]);
    const [buttonWasClicked, setButtonWasClicked] = useState(false);
    const [gameIsLoaded, setGameIsLoaded] = useState(false);

    const startNewGame = async () => {
        setButtonWasClicked(true)
        setNotFoundWords(props.notFoundWords)
        await props.startNewGame();
        setGameIsLoaded(true)
        setNotFoundWords([]);
        setButtonWasClicked(false);
    };

    return <SBModal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <Button disabled={buttonWasClicked} onClick={startNewGame}>Load new game</Button>
        <Button disabled={!gameIsLoaded} onClick={props.onRequestClose}>Start</Button>
        {buttonWasClicked &&
        <>
            <LoopIcon className={styles.spin}/>
            <div className={styles.foundWords}>
                {notFoundWords.map(word => <div className={styles.word} key={word}>{word}</div>)}
            </div>
        </>
        }
    </SBModal>
}

export default connector(NewGameModal)

