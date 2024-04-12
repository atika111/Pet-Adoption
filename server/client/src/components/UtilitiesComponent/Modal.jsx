import React from "react";
import styles from "../../utility.module.css";

function Modal({ isOpen, closeModal, modalContent }) {
  console.log("isOpen: ", isOpen);
  if (!isOpen) return null;
  return (
    <div className={`${styles.modalOverlay}`}>
      <div className={`${styles.modalContainer}`}>
        <div className="model-content">
          <span className={styles.close} onClick={closeModal}>
            X
          </span>
          {modalContent}
        </div>
      </div>
    </div>
  );
}

export default Modal;
