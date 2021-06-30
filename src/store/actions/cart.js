import axios from "../../axios-instance";

import * as actionTypes from "./actionTypes";

export const createOrderStart = () => {
  return {
    type: actionTypes.CREATE_ORDER_START,
  };
};

export const createOrderSuccess = (cart) => {
  localStorage.removeItem("cart");
  cart.splice(0, cart.length);
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
  };
};

export const createOrderFail = (error) => {
  return {
    type: actionTypes.CREATE_ORDER_FAIL,
    error: error,
  };
};

export const createOrder = (user, cart) => {
  return (dispatch) => {
    dispatch(createOrderStart());

    const orderedProd = cart.map((prod) => {
      return {
        productId: prod.id,
        quantity: prod.quantity,
      };
    });

    axios
      .post("/orders", {
        customer: user,
        products: orderedProd,
      })
      .then(() => {
        dispatch(orderCancelMessageHandler());
        dispatch(createOrderSuccess(cart));
      })
      .catch((err) => {
        dispatch(createOrderFail(err));
      });
  };
};

export const deleteCartProduct = (cart, product) => {
  const index = cart.indexOf(product);
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  return {
    type: actionTypes.DELETE_CART_PRODUCT,
  };
};

export const orderCancelMessageHandler = () => {
  return {
    type: actionTypes.ORDER_CANCEL_MESSAGE_HANDLER,
  };
};

export const orderOpenMessage = () => {
  return {
    type: actionTypes.ORDER_OPEN_MESSAGE,
  };
};
