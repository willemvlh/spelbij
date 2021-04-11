import styles from "./Header.module.css";
import React from "react";
import Modal from "react-modal";

const SBModal:React.FC<{isOpen: boolean, onRequestClose: () => void}> = ({isOpen, onRequestClose, children}) => {
    return <Modal className={styles.modal} ariaHideApp={false} onRequestClose={onRequestClose}
                  isOpen={isOpen} shouldCloseOnEsc={true}>
        {children}
    </Modal>
}

export default SBModal