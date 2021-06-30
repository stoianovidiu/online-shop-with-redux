import * as actionTypes from "../actions/actionTypes";

const initialState = {
  product: {},
  cart:
    localStorage.getItem("cart") !== null
      ? JSON.parse(localStorage.getItem("cart")).slice()
      : [],
  isEditing: false,
  wasEdited: true,
  isConfirming: false,
  isDone: false,
  isLoading: false,
  error: null,
};

const fetchProdStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const fetchProdSuccess = (state, action) => {
  return {
    ...state,
    product: action.prod,
    isLoading: false,
    wasEdited: false,
  };
};

const fetchProdFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.error,
  };
};

const deleteProdStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const deleteProdSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    wasEdited: true,
    isConfirming: true,
    isDone: true,
  };
};

const deleteProdFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.error,
  };
};

const editProdHandler = (state, action) => {
  return {
    ...state,
    wasEdited: false,
    isEditing: true,
  };
};

const editProdStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const editProdSuccess = (state, action) => {
  return {
    ...state,
    product: action.editedProd,
    isLoading: false,
    wasEdited: true,
    isDone: true,
  };
};

const editProdFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    wasEdited: false,
    error: action.error,
  };
};

const cancelEditHandler = (state, action) => {
  return {
    ...state,
    isEditing: false,
    wasEdited: false,
  };
};

const cancelEditMessage = (state, action) => {
  return {
    ...state,
    isDone: false,
    isEditing: false,
  };
};

const openMessage = (state, action) => {
  return {
    ...state,
    isConfirming: true,
  };
};

const prodCancelMessageHandler = (state, action) => {
  return {
    ...state,
    isConfirming: false,
    isDone: false,
  };
};

const addToCart = (state, action) => {
  const updatedProduct = { ...state.product, quantity: 1 };
  let cartClone = state.cart.slice();
  const foundProduct = cartClone.find((prod) => prod.id === updatedProduct.id);

  cartClone = foundProduct
    ? [
        ...cartClone.filter((prod) => prod.id !== updatedProduct.id),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]
    : [...cartClone, updatedProduct];

  localStorage.setItem("cart", JSON.stringify(cartClone));
  return {
    ...state,
    cart: cartClone.slice(),
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROD_START:
      return fetchProdStart(state, action);
    case actionTypes.FETCH_PROD_SUCCESS:
      return fetchProdSuccess(state, action);
    case actionTypes.FETCH_PROD_FAIL:
      return fetchProdFail(state, action);
    case actionTypes.DELETE_PROD_START:
      return deleteProdStart(state, action);
    case actionTypes.DELETE_PROD_SUCCESS:
      return deleteProdSuccess(state, action);
    case actionTypes.DELETE_PROD_FAIL:
      return deleteProdFail(state, action);
    case actionTypes.EDIT_PROD_HANDLER:
      return editProdHandler(state, action);
    case actionTypes.CANCEL_EDIT_HANDLER:
      return cancelEditHandler(state, action);
    case actionTypes.EDIT_PROD_START:
      return editProdStart(state, action);
    case actionTypes.EDIT_PROD_SUCCESS:
      return editProdSuccess(state, action);
    case actionTypes.EDIT_PROD_FAIL:
      return editProdFail(state, action);
    case actionTypes.CANCEL_EDIT_MESSAGE:
      return cancelEditMessage(state, action);
    case actionTypes.OPEN_MESSAGE:
      return openMessage(state, action);
    case actionTypes.PROD_CANCEL_MESSAGE_HANDLER:
      return prodCancelMessageHandler(state, action);
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    default:
      return state;
  }
};

export default reducer;
