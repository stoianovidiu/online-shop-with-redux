import React, { Fragment, memo } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
          pointerEvents: props.show ? "auto" : "none",
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default memo(
  Modal,
  (prevState, nextState) => nextState.show === prevState.show
);
