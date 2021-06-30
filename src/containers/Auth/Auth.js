import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../Utility/Utility";
import classes from "./Auth.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    username: {
      label: "User Name",
      type: "text",
      placeholder: "Your Username",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Your Password",
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      data: authForm[key],
    });
  }

  const inputChangedHandler = (event, fieldName) => {
    const updatedFields = {
      ...authForm,
      [fieldName]: {
        ...authForm[fieldName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[fieldName].validation
        ),
        touched: true,
      },
    };
    setAuthForm(updatedFields);
  };

  const loginHandler = (event) => {
    event.preventDefault();

    props.onAuth(authForm.username.value, authForm.password.value);
  };

  let form = formElementsArray.map((formElement) => {
    return (
      <Input
        key={formElement.id}
        label={formElement.data.label}
        type={formElement.data.type}
        placeholder={formElement.data.placeholder}
        value={formElement.data.value}
        changed={(event) => inputChangedHandler(event, formElement.id)}
        invalid={!formElement.data.valid}
        shouldValidate={formElement.data.validation}
        touched={formElement.data.touched}
      />
    );
  });

  return (
    <div className={classes.Auth}>
      {props.isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p>Sign In</p>
          <hr style={{ borderTop: "solid dodgerblue" }}></hr>
          {form}
          <Button clicked={loginHandler}>LOG IN</Button>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (formUser, formPassword) =>
      dispatch(actions.auth(formUser, formPassword)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
