import {useDispatch} from "react-redux"
import styles from "./Letter.module.css"
import { AddLetterAction } from "../../store/Types"
import React from "react";
import {Dispatch} from "@reduxjs/toolkit"

type Props = {
    letter: string,
    isMiddle?: boolean
}
const LetterComponent: React.FC<Props> = ({ letter, isMiddle }) => {
    let dispatch = useDispatch<Dispatch<AddLetterAction>>();
    let addLetter = letter => dispatch({type: "addLetter", payload: letter})
    return <div role={"gridcell"} onClick={() => addLetter(letter)}
         className={`${styles.cell} ${isMiddle ? ` ${styles.middle} ` : ''}`}>{letter}</div>;
}

export default LetterComponent
