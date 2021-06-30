import * as actionTypes from "../actions/actionTypes";

const initialState = {
  sales: [],
  isLoading: false,
  error: null,
};

const fetchSalesStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const fetchSalesSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    sales: action.sales,
  };
};

const fetchSalesFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SALES_START:
      return fetchSalesStart(state, action);
    case actionTypes.FETCH_SALES_SUCCESS:
      return fetchSalesSuccess(state, action);
    case actionTypes.FETCH_SALES_FAIL:
      return fetchSalesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
