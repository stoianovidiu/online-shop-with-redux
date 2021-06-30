import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  isAdding: false,
  wasAdded: true,
  isLoading: false,
  isDone: false,
  error: null,
};

const fetchProductsStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const fetchProductsSuccess = (state, action) => {
  return {
    ...state,
    products: action.productsData,
    isLoading: false,
  };
};

const fetchProductsFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.error,
  };
};

const addProductStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const addProductSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    isDone: true,
  };
};

const addProductFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.error,
  };
};

const addProductHandler = (state, action) => {
  return {
    ...state,
    wasAdded: false,
    isAdding: true,
  };
};

const cancelAddHandler = (state, action) => {
  return {
    ...state,
    wasAdded: false,
    isAdding: false,
  };
};

const productsCancelMessageHandler = (state, action) => {
  return {
    ...state,
    isDone: false,
    isAdding: false,
    wasAdded: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action);
    case actionTypes.ADD_PRODUCT_START:
      return addProductStart(state, action);
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return addProductSuccess(state, action);
    case actionTypes.ADD_PRODUCT_FAIL:
      return addProductFail(state, action);
    case actionTypes.ADD_PRODUCT_HANDLER:
      return addProductHandler(state, action);
    case actionTypes.CANCEL_ADD_HANDLER:
      return cancelAddHandler(state, action);
    case actionTypes.CANCEL_MESSAGE_HANDLER:
      return productsCancelMessageHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
