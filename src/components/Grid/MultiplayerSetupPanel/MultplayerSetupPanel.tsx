import React, {useContext} from "react";
import {Button} from "@material-ui/core";
import styles from "../../Header/Modals/NewGameModal/NewGameModal.module.css";
import {SocketContext} from "../../App/SocketContext";
import {GameState, WordAction} from "../../../store/Types";
import {connect, ConnectedProps} from "react-redux";

const mapDispatchToProps = (dispatch: (action: WordAction) => void) => {
    return {
        setMultiplayerGameId: (id: string) => {
            dispatch({type: "setMultiplayerGameId", payload: id})
        },

        resetScore: () => {
            dispatch({type: "updateScore", payload: 0})
        },
        clearFoundWords: () => {
            dispatch({type: "clearFoundWords"})
        }
    }
}

const mapStateToProps = (state: GameState) => {
    return {score: state.player.score, edgeLetters: state.edgeLetters, centerLetter: state.centerLetter, allWords: state.words, foundWords: state.foundWords, multiplayerGameId: state.multiplayer.gameId}
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>


const MultiplayerSetupPanel: React.FC<Props & {onRequestClose: () => void}> = (props) => {
    const socket = useContext(SocketContext)

    const startMultiplayer = () => {
        socket.on("gameCreated", gameId => {
            props.setMultiplayerGameId(gameId)
        });
        socket.connect();
        socket.emit("createGame", props.edgeLetters, props.centerLetter, props.allWords, props.foundWords, props.score)
    }

    const joinMultiplayer = () => {
        let id = prompt("ID?")
        if (!id) return;
        props.resetScore();
        props.clearFoundWords();
        socket.connect();
        socket.emit("joinGame", id);
        props.onRequestClose();
    }
    return <>
    <Button className={styles.button} onClick={startMultiplayer}>Start multiplayer</Button>
    <Button onClick={joinMultiplayer}>Join multiplayer</Button>
    {socket.connected && <span>{props.multiplayerGameId}</span>}
    </>
    }

export default connector(MultiplayerSetupPanel)