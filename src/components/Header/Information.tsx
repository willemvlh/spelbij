import styles from "./Header.module.css";
import {Help} from "@material-ui/icons";
import Modal from "react-modal";
import React, {useState} from "react";

export const Information = () => {
    let [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => setModalIsOpen(false);

    return <div id={styles.help}><Help style={{cursor: "pointer"}} onClick={() => setModalIsOpen(true)} fontSize={"large"} htmlColor={"#444"}/>
        <Modal  className={styles.modal} ariaHideApp={false} onRequestClose={closeModal} contentLabel={"Hallo"}
               isOpen={modalIsOpen} shouldCloseOnEsc={true}>
            <h1>Spelbij</h1>
            <ul>
                <li>Woorden moeten minstens 4 letters tellen.</li>
                <li>Woorden moeten de middenste letter bevatten.</li>
                <li>Letters mogen meerdere keren gebruikt worden.</li>
            </ul>
        </Modal>
    </div>;
}