import { connect, ConnectedProps } from "react-redux"
import React from "react";
import styles from "./Buttons.module.css"
import {Backspace, FlipCameraAndroid, Send} from "@material-ui/icons";
import {WordAction} from "../../store/Types";

const mapDispatchToProps = (dispatch: (action: WordAction) => any) => ({
    shuffle: () => dispatch({type: "shuffle"}),
    submitWord: () => dispatch({type: "submitWord"}),
    backspace: () => dispatch({type: "removeLetter"})
})

const connector = connect(null, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>


const Buttons: React.FunctionComponent<Props> = ({submitWord, shuffle, backspace}) => {
    return  <div className={styles.buttons}>
        <Backspace onClick={backspace}/>
        <Send onClick={submitWord}/>
        <FlipCameraAndroid onClick={shuffle}/>
    </div>
}

export default connector(Buttons)