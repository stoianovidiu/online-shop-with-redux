import axios from "../../axios-instance";

import * as actionTypes from "./actionTypes";

export const fetchProdStart = () => {
  return {
    type: actionTypes.FETCH_PROD_START,
  };
};

export const fetchProdSuccess = (prod) => {
  return {
    type: actionTypes.FETCH_PROD_SUCCESS,
    prod: prod,
  };
};

export const fetchProdFail = (error) => {
  return {
    type: actionTypes.FETCH_PROD_FAIL,
    error: error,
  };
};

export const fetchProd = (prodId) => {
  return (dispatch) => {
    dispatch(fetchProdStart());
    axios
      .get(`/products/${prodId}`)
      .then((resp) => {
        dispatch(fetchProdSuccess(resp.data));
      })
      .catch((err) => {
        dispatch(fetchProdFail(err));
      });
  };
};

export const deleteProdStart = () => {
  return {
    type: actionTypes.DELETE_PROD_START,
  };
};

export const deleteProdSuccess = (prod) => {
  return {
    type: actionTypes.DELETE_PROD_SUCCESS,
    prod: prod,
  };
};

export const deleteProdFail = (error) => {
  return {
    type: actionTypes.DELETE_PROD_FAIL,
  };
};

export const deleteProd = (prodId) => {
  return (dispatch) => {
    dispatch(deleteProdStart());
    axios
      .delete(`/products/${prodId}`)
      .then(() => {
        dispatch(prodCancelMessageHandler());
        dispatch(deleteProdSuccess());
      })
      .catch((err) => {
        dispatch(deleteProdFail(err));
      });
  };
};

export const addToCart = (cart) => {
  return {
    type: actionTypes.ADD_TO_CART,
  };
};

export const editProdHandler = () => {
  return {
    type: actionTypes.EDIT_PROD_HANDLER,
  };
};

export const prodCancelMessageHandler = () => {
  return {
    type: actionTypes.PROD_CANCEL_MESSAGE_HANDLER,
  };
};

export const openMessage = () => {
  return {
    type: actionTypes.OPEN_MESSAGE,
  };
};

export const editProdStart = () => {
  return {
    type: actionTypes.EDIT_PROD_START,
  };
};

export const editProdSuccess = (editedProd) => {
  return {
    type: actionTypes.EDIT_PROD_SUCCESS,
    editedProd: editedProd,
  };
};

export const editProdFail = (error) => {
  return {
    type: actionTypes.DELETE_PROD_FAIL,
    error: error,
  };
};

export const editProd = (currProdId, editedProd) => {
  return (dispatch) => {
    dispatch(editProdStart());
    axios
      .put(`/products/${currProdId}`, editedProd)
      .then(() => {
        dispatch(editProdSuccess(editedProd));
      })
      .catch((err) => {
        dispatch(editProdFail(err));
      });
  };
};

export const cancelEditHandler = () => {
  return {
    type: actionTypes.CANCEL_EDIT_HANDLER,
  };
};

export const cancelEditMessage = () => {
  return {
    type: actionTypes.CANCEL_EDIT_MESSAGE,
  };
};
