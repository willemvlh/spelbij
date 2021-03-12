import Block from "../Letter/Letter"
import { connect, ConnectedProps } from "react-redux"
import { WordState } from "../../store/types";
import "./Grid.css";

type StateProps = { state: WordState }
const mapStateToProps: (state: WordState) => StateProps = (state) => ({ state: state })
const mapDispatchToProps = dispatch => ({shuffle: () => dispatch({type: "shuffle"}), resetWord: () => dispatch({ type: "resetWord" }), submitWord: (word: string) => dispatch({ type: "submitWord", payload: word }) })

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

const Grid: React.FunctionComponent<Props> = ({ state, resetWord, submitWord, shuffle }) => {
  return (<div id="container">
    <div id="input">
      {state.currentWord}
    </div>
    <div id="score">{state.score}</div>
    <div id="hive">
      {state.edgeLetters.slice(0, 4).map(l => <Block key={l} letter={l} />)}
      <Block letter={state.centerLetter} isMiddle key="middle" />
      {state.edgeLetters.slice(4).map(l => <Block letter={l} key={l} />)}
    </div>
    <div className="buttons">
      <div onClick={resetWord}>Reset</div>
      <div onClick={() => submitWord(state.currentWord)}>Enter</div>
      <div onClick={shuffle}>Shuffle</div>
    </div>
    <div id="foundWords">
      <ul>
        {state.foundWords.map((w => <li key={w}>{w}</li>))}
      </ul>
    </div>
  </div>)
}

export default connector(Grid)
