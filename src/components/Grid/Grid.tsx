import {IGameState} from "../../store/Types";
import styles from "./Grid.module.css";
import React from "react";
import FoundsWords from "../FoundWords/FoundWords";
import Buttons from "../Buttons/Buttons";
import Letters from "../Letters/Letters";
import Header from "../Header/Header"
import {useSelector} from "../../Utils";
import ProgressBar from "../ProgressBar/ProgressBar";
import {getMaxScore} from "../../store/Selectors";

const Grid: React.FunctionComponent = () => {
    const state = useSelector((state: IGameState) => (state))
    const maxScore = useSelector(state => getMaxScore(state))

    return (
        <div id={styles.container}>
            <Header state={state}/>
            <ProgressBar score={state.score} maxScore={maxScore}/>
            <Letters edgeLetters={state.edgeLetters} centerLetter={state.centerLetter}/>
            <Buttons/>
            <FoundsWords edgeLetters={state.edgeLetters} centerLetter={state.centerLetter} foundWords={state.foundWords} allWords={state.words}/>
        </div>
    )
}

export default Grid