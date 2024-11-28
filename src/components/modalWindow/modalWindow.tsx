import React from "react";
import ReactDOM from "react-dom";
import * as style from "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={style.modalOverlayStyle}
      data-open={isOpen ? "true" : "false"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={style.modalContainerStyle}>
        <div className={style.modalHeaderStyle}>
          <h2>{title}</h2>
          <button className={style.closeButtonStyle} onClick={onClose}>
            {" "}
            &times;
          </button>
        </div>
        <div className={style.modalContentStyle}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
