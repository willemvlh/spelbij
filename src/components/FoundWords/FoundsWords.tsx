import React from "react";

type FoundWordsComponentProps = {
    foundWords: string[]
}

const foundWords: React.FC<FoundWordsComponentProps> = ({foundWords}) => {
    return <div id="foundWords">
        <ul>
            {foundWords.map((w => <li key={w}>{w}</li>))}
        </ul>
    </div>
}

export default foundWords