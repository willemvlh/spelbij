import {useDispatch} from "react-redux"
import React from "react";
import styles from "./Buttons.module.css"
import {Backspace, FlipCameraAndroid, Send} from "@material-ui/icons";
import {WordAction} from "../../store/Types";
import {Dispatch} from "@reduxjs/toolkit";

const Buttons: React.FunctionComponent = () => {
    let dispatch = useDispatch<Dispatch<WordAction>>()
    let shuffle = () => dispatch({type: "shuffle"});
    let submitWord = () => dispatch({type: "submitWord"});
    let backspace = () => dispatch({type: "removeLetter"})
    return  <div className={styles.buttons}>
        <Backspace onClick={backspace}/>
        <Send onClick={submitWord}/>
        <FlipCameraAndroid onClick={shuffle}/>
    </div>
}

export default Buttons