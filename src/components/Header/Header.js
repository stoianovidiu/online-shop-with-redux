import React from "react";

import classes from "./Header.module.css";
import Button from "../UI/Button/Button";
import { useLocation } from "react-router";

const Header = (props) => {
  const location = useLocation();
  let buttons = (
    <div>
      <Button clicked={props.clicked1}>{props.btn1}</Button>
      <Button clicked={props.clicked2}>{props.btn2}</Button>
    </div>
  );

  if (
    Object.keys(props.paramsId).length === 0 ||
    !props.roles.includes("admin")
  ) {
    buttons = <Button clicked={props.clicked1}>{props.btn1}</Button>;
  }

  if (
    location.pathname === "/sales" ||
    (location.pathname === "/products" && !props.roles.includes("admin"))
  ) {
    buttons = null;
  }

  return (
    <div className={classes.Header}>
      <h2>{props.title}</h2>
      {buttons}
    </div>
  );
};

export default Header;
