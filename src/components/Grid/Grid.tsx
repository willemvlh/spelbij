import {connect, ConnectedProps} from "react-redux"
import {GameState} from "../../store/Types";
import "./Grid.css";
import React, {useEffect} from "react";
import FoundsWords from "../FoundWords/FoundsWords";
import Buttons from "../Buttons/Buttons";
import Letters from "../Letters/Letters";
import Header from "../Header/Header"
import {getGameFromStorageOrServer} from "../../Utils";

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
        if (!state.loaded) initialize()
        })

    return (
        <div id="container">
            <Header state={state}/>
            <Letters edgeLetters={state.edgeLetters} centerLetter={state.centerLetter}/>
            <Buttons/>
            <FoundsWords foundWords={state.foundWords}/>
        </div>
    )
}

export default connector(Grid)
