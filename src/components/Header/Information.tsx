import styles from "./Header.module.css";
import {Help, ImportContacts} from "@material-ui/icons";
import React, {useState} from "react";
import InfoModal from "./Modals/NewGameModal/NewGameModal";
import HelpModal from "./Modals/HelpModal";

export const Information = () => {
    let [helpModalIsOpen, setHelpModalIsOpen] = useState(false);
    let [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    return <div id={styles.help}>
        <ImportContacts className={styles.icon} onClick={() => setInfoModalIsOpen(true)} />
        <Help className={styles.icon} style={{paddingLeft: "5px"}} onClick={() => setHelpModalIsOpen(true)} fontSize={"default"}/>

        <HelpModal isOpen={helpModalIsOpen} onRequestClose={() => setHelpModalIsOpen(false)}/>
        <InfoModal isOpen={infoModalIsOpen} onRequestClose={() => setInfoModalIsOpen(false)}/>
    </div>;
}