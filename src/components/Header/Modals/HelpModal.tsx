import SBModal from "../Modal";
import React from "react";

const HelpModal:React.FC<{isOpen: boolean, onRequestClose: () => void}> = (props) => {
    return <SBModal {...props}>
        <h2>Spelregels</h2>
        <ul>
            <li>Woorden moeten minstens 4 letters tellen.</li>
            <li>Woorden moeten de middelste letter bevatten.</li>
            <li>Letters mogen meerdere keren gebruikt worden.</li>
            <li>Je krijgt bonuspunten voor lange woorden en woorden waarin de middelste letter vaak voorkomt.</li>
        </ul>
    </SBModal>
}

export default HelpModal