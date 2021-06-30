import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: "",
  roles: [],
  error: null,
  isLoading: false,
  isAuthenticated: false,
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    isLoading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    roles: action.roles,
    error: null,
    isLoading: false,
    isAuthenticated: true,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    isLoading: false,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    user: "",
    roles: [],
    isAuthenticated: false,
  };
};

const authInfo = (state, action) => {
  return {
    ...state,
    user: action.user,
    roles: action.roles,
    isAuthenticated: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_INFO:
      return authInfo(state, action);
    default:
      return state;
  }
};

export default reducer;
