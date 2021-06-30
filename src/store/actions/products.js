import axios from "../../axios-instance";

import * as actionTypes from "./actionTypes";

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    productsData: products,
  };
};

export const fetchProductsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsStart());
    axios
      .get("/products")
      .then((resp) => {
        dispatch(fetchProductsSuccess(resp.data));
      })
      .catch((err) => {
        dispatch(fetchProductsFail(err));
      });
  };
};

export const addProductStart = () => {
  return {
    type: actionTypes.ADD_PRODUCT_START,
  };
};

export const addProductSuccess = () => {
  return {
    type: actionTypes.ADD_PRODUCT_SUCCESS,
  };
};

export const addProductFail = (error) => {
  return {
    type: actionTypes.ADD_PRODUCT_FAIL,
    error: error,
  };
};

export const addProduct = (productToAddWithId) => {
  return (dispatch) => {
    dispatch(addProductStart());
    axios
      .post("/products", productToAddWithId)
      .then(() => {
        dispatch(addProductSuccess());
      })
      .catch((err) => {
        dispatch(addProductFail(err));
      });
  };
};

export const addProductHandler = () => {
  return {
    type: actionTypes.ADD_PRODUCT_HANDLER,
  };
};

export const cancelAddHandler = () => {
  return {
    type: actionTypes.CANCEL_ADD_HANDLER,
  };
};

export const productsCancelMessageHandler = () => {
  return {
    type: actionTypes.CANCEL_MESSAGE_HANDLER,
  };
};
