import {useDispatch} from "react-redux"
import {IGameState} from "../../store/Types";
import styles from "./Grid.module.css";
import React, {useEffect} from "react";
import FoundsWords from "../FoundWords/FoundWords";
import Buttons from "../Buttons/Buttons";
import Letters from "../Letters/Letters";
import Header from "../Header/Header"
import {getGameFromStorageOrServer, useSelector} from "../../Utils";
import ProgressBar from "../ProgressBar/ProgressBar";
import {getTotalScore} from "../../store/Selectors";

const Grid: React.FunctionComponent = () => {
    const state = useSelector((state: IGameState) => (state))
    const totalScore = useSelector(state => getTotalScore(state))

    useEffect(() => {
        if (!state.loaded && !state.wasStopped) initialize()
    })

    const dispatch = useDispatch();
    const initialize = () => {
        getGameFromStorageOrServer().then(state => dispatch({
                type: "initialize",
                payload: {
                    state: state
                }
            })
        )
    }

    return (
        <div id={styles.container}>
            <Header state={state}/>
            <ProgressBar score={state.score} totalScore={totalScore}/>
            <Letters edgeLetters={state.edgeLetters} centerLetter={state.centerLetter}/>
            <Buttons/>
            <FoundsWords/>
        </div>
    )
}

export default Grid