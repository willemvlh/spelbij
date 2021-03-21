import React from "react";
import { GameState } from "../../store/Types";

const header:React.FC<{state: GameState}> = ({state}) => {
    return <div id="top">
        <div id="input">
            {state.currentWord}
        </div>
        <div id="meta">
            <div id="score">Score: {state.score}</div>
            <div id="words-left">{state.words.length - state.foundWords.length} words left</div>
        </div>
    </div>
}

export default header;