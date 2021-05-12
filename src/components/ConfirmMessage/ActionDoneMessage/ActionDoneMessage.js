import React from "react";

import Button from "../../UI/Button/Button";
import classes from "./ActionDoneMessage.module.css";

const actionDoneMessage = (props) => {
  return (
    <div className={classes.ActionDoneMessage}>
      <p>{props.message}</p>
      <Button clicked={props.clicked}>OK</Button>
    </div>
  );
};

export default actionDoneMessage;
