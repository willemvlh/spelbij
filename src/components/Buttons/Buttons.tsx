import { connect, ConnectedProps } from "react-redux"
import ClearIcon from '@material-ui/icons/Clear';
import React from "react";
import styles from "./Buttons.module.css"
import {FlipCameraAndroid, Send} from "@material-ui/icons";

const mapDispatchToProps = dispatch => ({
    shuffle: () => dispatch({type: "shuffle"}),
    resetWord: () => dispatch({type: "resetWord"}),
    submitWord: () => dispatch({type: "submitWord"})
})

const connector = connect(null, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>


const buttons: React.FunctionComponent<Props> = ({resetWord, submitWord, shuffle}) => {
    return  <div className={styles.buttons}>
        <div onClick={resetWord}><ClearIcon/></div>
        <div onClick={() => submitWord()}><Send/></div>
        <div onClick={shuffle}><FlipCameraAndroid/></div>
    </div>
}

export default connector(buttons)