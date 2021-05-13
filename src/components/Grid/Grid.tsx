import {connect, ConnectedProps} from "react-redux"
import {IGameState} from "../../store/Types";
import styles from "./Grid.module.css";
import React, {useEffect} from "react";
import FoundsWords from "../FoundWords/FoundWords";
import Buttons from "../Buttons/Buttons";
import Letters from "../Letters/Letters";
import Header from "../Header/Header"
import {getGameFromStorageOrServer} from "../../Utils";

type StateProps = { state: IGameState }

const mapStateToProps: (state: IGameState) => StateProps = (state) => ({state: state})
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
            <Letters edgeLetters={state.edgeLetters} centerLetter={state.centerLetter}/>
            <Buttons/>
            <FoundsWords />
        </div>
    )
}

export default connector(Grid)
