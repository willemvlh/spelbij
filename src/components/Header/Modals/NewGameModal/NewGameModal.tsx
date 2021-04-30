import SBModal from "../../Modal";
import React, {useContext, useState} from "react";
import styles from "./NewGameModal.module.css"
import {Button, makeStyles} from "@material-ui/core";
import {GameState, InitializeAction, PlayerJoinAction, PlayerState, StopGameAction} from "../../../../store/Types";
import {connect, ConnectedProps} from "react-redux";
import {fetchGame, initializeGame} from "../../../../Utils";
import {WordListForLetter} from "../../../WordListForLetter/WordListForLetter";
import LoadingIcon from "../../../LoadingIcon/LoadingIcon";
import {SocketContext} from "../../../App/App";


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
const mapDispatchToProps = (dispatch: ((action: InitializeAction | StopGameAction | PlayerJoinAction) => void)) => {
    return {
        startNewGame: async () => {
            dispatch({type: "stopGame"})
            const game = await fetchGame()
            dispatch({type: "initialize", payload: {state: initializeGame(game)}})
        },
        playerJoin: (player: PlayerState) => {
            dispatch({type: "playerJoin", payload: player})
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
    const socket = useContext(SocketContext);

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));

    const classes = useStyles();

    const startNewGame = async () => {
        setButtonWasClicked(true)
        setLetters(props.letters);
        setFoundWords(props.foundWords)
        setAllWords(props.allWords)
        await props.startNewGame();
        setGameIsLoaded(true)
    };

    const startMultiplayer = () => {
        socket.on("message", msg => {
            let parsed = JSON.parse(msg);
            props.playerJoin({name: parsed.name, score: 0, previousScore: 0})
        })
        socket.connect();
    }

    const joinMultiplayer = () => {
        socket.off("message");
        socket.send({action: "join"});
        socket.on("message", msg => {
            let parsed = JSON.parse(msg);
            props.playerJoin({name: parsed.name, score: 0, previousScore: 0})
        });
    }

    return <SBModal shouldCloseOnOverlayClick={!buttonWasClicked} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <div className={classes.root}>
        <Button className={styles.button} variant={"contained"} color={"primary"} disabled={buttonWasClicked} onClick={startNewGame}>Nieuw spel laden</Button>
        <Button className={styles.button} color={"secondary"} variant={"contained"} disabled={!gameIsLoaded} onClick={props.onRequestClose}>Start</Button>
        <Button className={styles.button} onClick={startMultiplayer}>Start multiplayer</Button>
        <Button onClick={joinMultiplayer}>Join multiplayer</Button>
        </div>
            {buttonWasClicked &&
        <>
            {gameIsLoaded || <LoadingIcon />}
            {letters.map(letter => <WordListForLetter key={letter} letter={letter}
                                                            foundWords={foundWords.filter(w => w.startsWith(letter))}
                                                            allWords={allWords.filter(w => w.startsWith(letter))}
                                                            displayMissedWords={true}/>)}
        </>
        }
    </SBModal>

}

export default connector(NewGameModal)

