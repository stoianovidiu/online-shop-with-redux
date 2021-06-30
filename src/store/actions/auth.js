import axios from "../../axios-instance";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (username, userRoles) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: username,
    roles: userRoles,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("roles");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("cart");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (formUser, formPassword) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username: formUser,
      password: formPassword,
    };
    axios
      .post("/login", authData)
      .then((resp) => {
        localStorage.setItem("username", resp.data.username);
        localStorage.setItem("roles", JSON.stringify(resp.data.roles));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        dispatch(authSuccess(resp.data.username, resp.data.roles));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authInfo = () => {
  return {
    type: actionTypes.AUTH_INFO,
    user: localStorage.getItem("username"),
    roles: JSON.parse(localStorage.getItem("roles")),
  };
};
