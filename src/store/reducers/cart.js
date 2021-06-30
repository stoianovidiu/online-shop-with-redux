import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: "",
  isConfirming: false,
  isDone: false,
  isLoading: false,
  error: null,
};

const createOrderStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const createOrderSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    message: "Order was created!",
    isConfirming: true,
    isDone: true,
  };
};

const createOrderFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.error,
  };
};

const deleteCartProduct = (state, action) => {
  return {
    ...state,
    message: "Product has been removed from the shopping cart.",
    isConfirming: true,
    isDone: true,
  };
};

const orderOpenMessage = (state, action) => {
  return {
    ...state,
    isConfirming: true,
  };
};

const orderCancelMessageHandler = (state, action) => {
  return {
    ...state,
    isConfirming: false,
    isDone: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_START:
      return createOrderStart(state, action);
    case actionTypes.CREATE_ORDER_FAIL:
      return createOrderFail(state, action);
    case actionTypes.CREATE_ORDER_SUCCESS:
      return createOrderSuccess(state, action);
    case actionTypes.DELETE_CART_PRODUCT:
      return deleteCartProduct(state, action);
    case actionTypes.ORDER_OPEN_MESSAGE:
      return orderOpenMessage(state, action);
    case actionTypes.ORDER_CANCEL_MESSAGE_HANDLER:
      return orderCancelMessageHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
