import React from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css"
import {CloseOutlined} from "@material-ui/icons";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    shouldCloseOnOverlayClick?: boolean;

}

const SBModal: React.FC<ModalProps> =
    ({shouldCloseOnOverlayClick = true, isOpen, onRequestClose, children}) => {
        return <Modal
            style={{
                content: {
                    fontFamily: "Noto Serif, serif",
                    maxWidth: "320px",
                    border: "solid 1px #aaa",
                    background: "white",
                    padding: "18px",
                    boxShadow: "3px 3px 3px grey",
                    margin: "auto",
                    maxHeight: "600px"
                }
            }}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick} ariaHideApp={false}
            onRequestClose={onRequestClose}
            isOpen={isOpen} shouldCloseOnEsc={true}>
            <div className={styles.content}>
                <div style={{textAlign: "right", visibility: shouldCloseOnOverlayClick ? "initial" : "hidden"}}>
                    <CloseOutlined onClick={onRequestClose} style={{cursor: "pointer"}}/>
                </div>
                {children}
            </div>

        </Modal>
    }

export default SBModal