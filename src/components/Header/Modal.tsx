import React from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css"
import {CloseOutlined} from "@material-ui/icons";

const SBModal: React.FC<{ isOpen: boolean, onRequestClose: () => void, shouldCloseOnOverlayClick?: boolean }> =
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
                    bottom: "auto"
                }
            }}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick} ariaHideApp={false}
            onRequestClose={onRequestClose}
            isOpen={isOpen} shouldCloseOnEsc={true}>
            <div className={styles.content}>
                {shouldCloseOnOverlayClick && <div style={{textAlign: "right"}} onClick={onRequestClose}><CloseOutlined/></div>}
                {children}
            </div>

        </Modal>
    }

export default SBModal