import React from "react";
import Modal from "react-modal";

const SBModal: React.FC<{ isOpen: boolean, onRequestClose: () => void, shouldCloseOnOverlayClick?: boolean }> =
    ({shouldCloseOnOverlayClick = true, isOpen, onRequestClose, children}) => {
        return <Modal
            style={{
                content: {
                    width: "300px",
                    maxWidth: "95%",
                    border: "solid 1px #aaa",
                    background: "white",
                    padding: "20px",
                    boxShadow: "3px 3px 3px grey",
                    margin: 'auto'
                }
            }}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick} ariaHideApp={false}
            onRequestClose={onRequestClose}
            isOpen={isOpen} shouldCloseOnEsc={true}>
            {children}
        </Modal>
    }

export default SBModal