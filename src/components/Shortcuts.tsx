import React from "react";

import { connect } from "react-redux"
import {AddLetterAction, RemoveLetterAction, SubmitWordAction} from "../store/Types"

const mapDispatchToProps = (dispatch: ((action: AddLetterAction | RemoveLetterAction | SubmitWordAction) => any)) => {
    return {
        addLetter: (letter: string) => dispatch({ type: "addLetter", payload: letter }),
        removeLetter: () => dispatch({type: "removeLetter"}),
        submitWord: () => dispatch({type: "submitWord"})
    }
}

const Shortcuts = (props) => {
    const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch(e.key){
            case "Backspace": props.removeLetter()
                break;
            case "Enter": props.submitWord()
                break;
            default: props.addLetter(e.key)
        }
    }

    return <div id="keyboard" onKeyDown={e => onKeyPress(e)} tabIndex={0}>
        {props.children}
    </div>
}

export default connect(null, mapDispatchToProps)(Shortcuts)