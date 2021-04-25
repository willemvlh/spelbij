import SBModal from "../Modal";
import React from "react";

const HelpModal:React.FC<{isOpen: boolean, onRequestClose: () => void}> = (props) => {
    return <SBModal {...props}>
        <ul>
            <li>Woorden moeten minstens 4 letters tellen.</li>
            <li>Woorden moeten de middenste letter bevatten.</li>
            <li>Letters mogen meerdere keren gebruikt worden.</li>
        </ul>
    </SBModal>
}

export default HelpModal