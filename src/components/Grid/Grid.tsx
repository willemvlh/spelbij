import {connect, ConnectedProps} from "react-redux"
import {GameState} from "../../store/Types";
import styles from "./Grid.module.css";
import React, {useEffect} from "react";
import FoundsWords from "../FoundWords/FoundWords";
import Buttons from "../Buttons/Buttons";
import Letters from "../Letters/Letters";
import Header from "../Header/Header"
import {getGameFromStorageOrServer, isDevelopment} from "../../Utils";
import MultiplayerPanel from "../MultiplayerPanel";

type StateProps = { state: GameState }

const mapStateToProps: (state: GameState) => StateProps = (state) => ({state: state})
const mapDispatchToProps = (dispatch) => {
    return {
        initialize: () => {
            getGameFromStorageOrServer().then(state => dispatch({
                    type: "initialize",
                    payload: {
                        state: state
                    }
                })
            )
        }
    }
}


const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

const Grid: React.FunctionComponent<Props> = ({state, initialize}) => {
    useEffect(() => {
        if (!state.loaded && !state.wasStopped) initialize()
        })

    return (
        <div id={styles.container}>
            <Header state={state}/>
            {isDevelopment && <button onClick={() => localStorage.removeItem("gameState")}>Clear state</button>}
            <Letters edgeLetters={state.edgeLetters} centerLetter={state.centerLetter}/>
            <Buttons/>
            <MultiplayerPanel players={state.multiplayer.otherPlayers.concat(state.player)}/>
            <FoundsWords />
        </div>
    )
}

export default connector(Grid)
