import Block from "../Letter/Letter"
import { connect, ConnectedProps } from "react-redux"
import { WordState } from "../../store/types";
import "./Grid.css";
import React from "react";
import FoundsWords from "../FoundWords/FoundsWords";
import Buttons from "../Buttons/Buttons";
import Letters from "../Letters/Letters";
import Header from "../Header/Header"

type StateProps = { state: WordState }

const mapStateToProps: (state: WordState) => StateProps = (state) => ({ state: state })
const connector = connect(mapStateToProps)
type Props = ConnectedProps<typeof connector>

const Grid: React.FunctionComponent<Props> = ({ state }) => {
  return (
      <div id="container">
        <Header state={state}/>
        <Letters edgeLetters={state.edgeLetters} centerLetter={state.centerLetter}/>
        <Buttons/>
        <FoundsWords foundWords={state.foundWords}/>
      </div>
  )
}

export default connector(Grid)
