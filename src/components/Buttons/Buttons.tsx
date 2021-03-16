import { connect, ConnectedProps } from "react-redux"
import {ReactComponent as BackSpace} from "../../assets/backspace-black-18dp.svg";
import {ReactComponent as Submit} from "../../assets/send-black-18dp.svg";
import {ReactComponent as Flip} from "../../assets/flip_camera_android-black-18dp.svg";
import React from "react";


const mapDispatchToProps = dispatch => ({
    shuffle: () => dispatch({type: "shuffle"}),
    resetWord: () => dispatch({type: "resetWord"}),
    submitWord: () => dispatch({type: "submitWord"})
})

const connector = connect(null, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>


const buttons: React.FunctionComponent<Props> = ({resetWord, submitWord, shuffle}) => {
    return  <div className="buttons">
        <div onClick={resetWord}><BackSpace/></div>
        <div onClick={() => submitWord()}><Submit/></div>
        <div onClick={shuffle}><Flip/></div>
    </div>
}

export default connector(buttons)