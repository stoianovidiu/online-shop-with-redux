import React, { Fragment } from "react";
import { useLocation } from "react-router";

import Button from "../UI/Button/Button";
import classes from "./ConfirmMessage.module.css";

const ConfirmMessage = (props) => {
  const location = useLocation();

  let message = null;

  if (location.pathname === "/orders") {
    message = `You have ordered the following products: `;
  } else if (location.pathname === "/logout") {
    message = "Are you sure you want to logout?";
  } else {
    message = `Are you sure you want to ${props.action} the "${props.prodName}" product?`;
  }

  const list =
    location.pathname === "/orders" ? (
      <ul>
        {props.cart.map((prod) => {
          return (
            <li key={prod.id}>
              {prod.quantity}x "{prod.name}";
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <Fragment>
      <div className={classes.ConfirmMessage}>
        <h3>Confirmation</h3>
        <hr />
        <p>{message}</p>
        {list}
        <Button clicked={props.clicked1}>Cancel</Button>
        <Button clicked={props.clicked2}>OK</Button>
      </div>
    </Fragment>
  );
};

export default ConfirmMessage;
