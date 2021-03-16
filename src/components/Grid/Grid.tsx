import Block from "../Letter/Letter"
import { connect, ConnectedProps } from "react-redux"
import { WordState } from "../../store/types";
import "./Grid.css";
import React from "react";
import {ReactComponent as BackSpace}  from "../../assets/backspace-black-18dp.svg"
import {ReactComponent as Flip} from "../../assets/flip_camera_android-black-18dp.svg"
import {ReactComponent as Submit} from "../../assets/send-black-18dp.svg"

type StateProps = { state: WordState }
const mapStateToProps: (state: WordState) => StateProps = (state) => ({ state: state })
const mapDispatchToProps = dispatch => ({shuffle: () => dispatch({type: "shuffle"}), resetWord: () => dispatch({ type: "resetWord" }), submitWord: () => dispatch({ type: "submitWord"}) })

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

const Grid: React.FunctionComponent<Props> = ({ state, resetWord, submitWord, shuffle }) => {
  return (<div id="container">
    <div id="top">
      <div id="input">
        {state.currentWord}
      </div>
      <div id="meta">
        <div id="score">Score: {state.score}</div>
        <div id="words-left">{state.words.length - state.foundWords.length} words left</div>
      </div>
    </div>
    <div id="hive">
      {state.edgeLetters.slice(0, 4).map(l => <Block key={l} letter={l} />)}
      <Block letter={state.centerLetter} isMiddle key="middle" />
      {state.edgeLetters.slice(4).map(l => <Block letter={l} key={l} />)}
    </div>
    <div className="buttons">
      <div onClick={resetWord}><BackSpace/></div>
      <div onClick={() => submitWord()}><Submit/></div>
      <div onClick={shuffle}><Flip/></div>
    </div>
    <div id="foundWords">
      <ul>
        {state.foundWords.map((w => <li key={w}>{w}</li>))}
      </ul>
    </div>
  </div>)
}

export default connector(Grid)
