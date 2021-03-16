import React from "react";
import { WordState } from "../../store/types";

const header:React.FC<{state: WordState}> = ({state}) => {
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