import React, { useState } from "react";
import { useHistory } from "react-router";

import Header from "../../components/Header/Header";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import ConfirmMessage from "../../components/ConfirmMessage/ConfirmMessage";
import ActionDoneMessage from "../../components/ConfirmMessage/ActionDoneMessage/ActionDoneMessage";
import classes from "./Cart.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Cart = (props) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const productDeleteHandler = (product) => {
    const cart = props.cart.slice();
    const index = cart.indexOf(product);
    cart.splice(index, 1);
    props.setCart(cart);
    setMessage("Product has been removed from the shopping cart.");
    setIsDone(true);
  };

  const checkoutButtonHandler = () => {
    setIsLoading(true);
    const orderedProd = props.cart.map((prod) => {
      return {
        productId: prod.id,
        quantity: prod.quantity,
      };
    });

    axios
      .post("/orders", {
        customer: props.user,
        products: orderedProd,
      })
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setIsLoading(false);
          setIsConfirming(false);
          setMessage("Order was created!");
          setIsDone(true);
          props.cart.length = 0;
          localStorage.removeItem("cart");
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const openMessageHandler = () => {
    setIsConfirming(true);
  };

  const cancelMessageHandler = () => {
    if (isConfirming) {
      setIsConfirming(false);
    } else if (isDone) {
      setIsDone(false);
    }
  };

  const goToProductsBtnHandler = () => {
    history.push("/products");
  };

  let confirmMessage = null;

  if (isConfirming) {
    confirmMessage = (
      <ConfirmMessage
        cart={props.cart}
        clicked1={cancelMessageHandler}
        clicked2={checkoutButtonHandler}
      />
    );
  } else if (isDone) {
    confirmMessage = (
      <ActionDoneMessage message={message} clicked={cancelMessageHandler} />
    );
  }

  if (isLoading) {
    confirmMessage = <Spinner />;
  }

  const cartProducts = props.cart.map((prod) => {
    return (
      <tr key={prod.id}>
        <td>{prod.category}</td>
        <td>{prod.name}</td>
        <td>{prod.price}</td>
        <td>{prod.quantity}</td>
        <td>
          <button
            className={classes.CartBtn}
            onClick={() => productDeleteHandler(prod)}
          >
            ❌
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className={classes.Cart}>
      <Modal show={isConfirming || isDone} modalClosed={cancelMessageHandler}>
        {confirmMessage}
      </Modal>
      <Header
        title="Shopping Cart"
        paramsId={props.match.params}
        btn1={props.cart.length > 0 ? "CHECKOUT" : "GO TO PRODUCTS LIST"}
        clicked1={
          props.cart.length > 0 ? openMessageHandler : goToProductsBtnHandler
        }
      />
      {props.cart.length < 1 ? (
        <h4>
          The shopping cart is empty! Please add something to it before trying
          to checkout.
        </h4>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{cartProducts}</tbody>
        </table>
      )}
    </div>
  );
};

export default withErrorHandler(Cart, axios);
