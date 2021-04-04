import { connect } from "react-redux"
import styles from "./Letter.module.css"
import { AddLetterAction } from "../../store/Types"

const mapDispatchToProps = (dispatch: ((action: AddLetterAction) => any)) => {
    return {
        addLetter: (letter: string) => dispatch({ type: "addLetter", payload: letter })
    }
}

const LetterComponent = ({ letter, isMiddle, addLetter }: any) =>
    <div onClick={() => addLetter(letter)} className={isMiddle ? `${styles.cell} ${styles.middle} `: styles.cell}>{letter}</div>

export default connect(null, mapDispatchToProps)(LetterComponent)
