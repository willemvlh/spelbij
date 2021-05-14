import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import styles from "./Input.module.css"
import {ClearErrorAction} from "../../../store/Types";
import {Dispatch} from "@reduxjs/toolkit";

type InputErrorComponentType = {
    error: string
}

const Feedback: React.FC<InputErrorComponentType> = ({error}) => {
    const dispatch = useDispatch<Dispatch<ClearErrorAction>>();
    useEffect(() => {
        const clearError = () => dispatch({type: "clearError"})
        const timeout = setTimeout(clearError, 3000);
        return function(){
            clearTimeout(timeout)
        }
    })
    return <div className={styles.toast}>{error}</div>;
}

export default Feedback