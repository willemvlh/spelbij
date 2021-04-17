import { connect } from "react-redux"
import styles from "./Letter.module.css"
import { AddLetterAction } from "../../store/Types"
import { useState} from "react";

const mapDispatchToProps = (dispatch: ((action: AddLetterAction) => any)) => {
    return {
        addLetter: (letter: string) => dispatch({ type: "addLetter", payload: letter })
    }
}

const LetterComponent = ({ letter, isMiddle, addLetter }: any) => {
    const [showFlash, setShowFlash] = useState(false);
    const onMouseUp = () => setShowFlash(false)

    return <div onMouseDown={() => setShowFlash(true)} onMouseLeave={onMouseUp} onMouseUp={onMouseUp} onClick={() => addLetter(letter)}
         className={`${styles.cell} ${(showFlash ? styles.flash : "")} ${isMiddle ? ` ${styles.middle} ` : styles.cell}`}>{letter}</div>;
}

export default connect(null, mapDispatchToProps)(LetterComponent)
