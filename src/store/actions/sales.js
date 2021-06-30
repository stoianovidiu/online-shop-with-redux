import axios from "../../axios-instance";

import * as actionTypes from "./actionTypes";

export const fetchSalesStart = () => {
  return {
    type: actionTypes.FETCH_SALES_START,
  };
};

export const fetchSalesSuccess = (sales) => {
  return {
    type: actionTypes.FETCH_SALES_SUCCESS,
    sales: sales,
  };
};

export const fetchSalesFail = (error) => {
  return {
    type: actionTypes.FETCH_SALES_FAIL,
    error: error,
  };
};

export const fetchSales = () => {
  return (dispatch) => {
    dispatch(fetchSalesStart());
    axios
      .get("/sales")
      .then((resp) => {
        dispatch(fetchSalesSuccess(resp.data));
      })
      .catch((err) => {
        dispatch(fetchSalesFail(err));
      });
  };
};
