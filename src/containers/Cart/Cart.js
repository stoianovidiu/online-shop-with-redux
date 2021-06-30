import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import ConfirmMessage from "../../components/ConfirmMessage/ConfirmMessage";
import ActionDoneMessage from "../../components/ConfirmMessage/ActionDoneMessage/ActionDoneMessage";
import classes from "./Cart.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const Cart = (props) => {
  const history = useHistory();

  const productDeleteHandler = (product) => {
    props.onDeleteProduct(props.cart, product);
  };

  const checkoutButtonHandler = () => {
    props.onCreateOrder(props.user, props.cart);
  };

  const openMessage = () => {
    props.onOpenMessage();
  };

  const cancelMessage = () => {
    if (props.isConfirming && props.isDone) {
      props.onCancelMessage();
      history.replace("/products");
    } else {
      props.onCancelMessage();
    }
  };

  const goToProductsBtnHandler = () => {
    history.push("/products");
  };

  let confirmMessage = null;

  if (props.isConfirming && !props.isDone) {
    confirmMessage = (
      <ConfirmMessage
        cart={props.cart}
        clicked1={cancelMessage}
        clicked2={checkoutButtonHandler}
      />
    );
  } else if (props.isConfirming && props.isDone) {
    confirmMessage = (
      <ActionDoneMessage message={props.message} clicked={cancelMessage} />
    );
  }

  if (props.isLoading) {
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
      <Modal
        show={props.isDone || props.isConfirming}
        modalClosed={cancelMessage}
      >
        {confirmMessage}
      </Modal>
      <Header
        title="Shopping Cart"
        paramsId={props.match.params}
        btn1={props.cart.length > 0 ? "CHECKOUT" : "GO TO PRODUCTS LIST"}
        clicked1={props.cart.length > 0 ? openMessage : goToProductsBtnHandler}
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

export const mapStateToProps = (state) => {
  return {
    isLoading: state.cart.isLoading,
    isConfirming: state.cart.isConfirming,
    isDone: state.cart.isDone,
    message: state.cart.message,
    cart: state.prod.cart,
    user: state.auth.user,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onCreateOrder: (user, cart) => dispatch(actions.createOrder(user, cart)),
    onDeleteProduct: (cart, product) =>
      dispatch(actions.deleteCartProduct(cart, product)),
    onOpenMessage: () => dispatch(actions.orderOpenMessage()),
    onCancelMessage: () => dispatch(actions.orderCancelMessageHandler()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Cart, axios));
