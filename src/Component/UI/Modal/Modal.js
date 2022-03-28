import styles from "./Modal.module.css";
import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import reactDom from "react-dom";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById("modal-root");

  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop />, portalElement)}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
