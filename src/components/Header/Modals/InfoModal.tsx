import SBModal from "../Modal";
import React from "react";
import {Button} from "@material-ui/core";
import {InitializeAction, StopGameAction} from "../../../store/Types";
import {connect} from "react-redux";
import {fetchGame, initializeGame} from "../../../Utils";

type ModalProps = {
    isOpen: boolean,
    onRequestClose: () => void
}

const mapDispatchToProps = (dispatch: ((action: InitializeAction | StopGameAction) => void)) => {
    return {
        startNewGame: () => {
            dispatch({type: "stopGame"})
            fetchGame().then(game => {
                dispatch({type: "initialize", payload: {state: initializeGame(game)}})
            })
        }
    }
}


const InfoModal: React.FC<ModalProps & {startNewGame: () => void}> = (props) => {
    const startNewGame = () => {
        props.startNewGame();
        props.onRequestClose();
    };
    return <SBModal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <Button onClick={startNewGame}>New game</Button>
    </SBModal>
}

export default connect(null, mapDispatchToProps)(InfoModal)