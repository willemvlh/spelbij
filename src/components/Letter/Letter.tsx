import { connect } from "react-redux"
import { AddLetterAction } from "../../store/types"

type Letter = {
    letter: string,
    isMiddle?: boolean
}

const mapDispatchToProps = (dispatch: ((action: AddLetterAction) => any)) => {
    return {
        addLetter: (letter: string) => dispatch({ type: "addLetter", payload: letter })
    }
}

const LetterComponent = ({ letter, isMiddle, addLetter }: any) =>
    <div onClick={() => addLetter(letter)} className={isMiddle ? "cell middle" : "cell"}>{letter}</div>

export default connect(null, mapDispatchToProps)(LetterComponent)
