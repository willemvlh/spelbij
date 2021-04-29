import { connect } from "react-redux"
import styles from "./Letter.module.css"
import { AddLetterAction } from "../../store/Types"

const mapDispatchToProps = (dispatch: ((action: AddLetterAction) => any)) => {
    return {
        addLetter: (letter: string) => dispatch({ type: "addLetter", payload: letter })
    }
}

const LetterComponent = ({ letter, isMiddle, addLetter }: any) => {
    const onClick = () => {
        addLetter(letter);
    }
    return <div onClick={onClick}
         className={`${styles.cell} ${isMiddle ? ` ${styles.middle} ` : styles.cell}`}>{letter}</div>;
}

export default connect(null, mapDispatchToProps)(LetterComponent)
