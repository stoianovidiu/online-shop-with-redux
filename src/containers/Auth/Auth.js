import React, { Fragment, useState } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../Utility/Utility";
import classes from "./Auth.module.css";
import { useHistory } from "react-router";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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

  const [isLoading, setIsLoading] = useState(false);

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      data: authForm[key],
    });
  }

  const history = useHistory();
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
    setIsLoading(true);
    axios
      .post("/login", {
        username: authForm.username.value,
        password: authForm.password.value,
      })
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setIsLoading(false);
          props.setUser(resp.data.username);
          props.setRoles(resp.data.roles);
          props.setIsAuthenticated(true);
          localStorage.setItem("username", resp.data.username);
          localStorage.setItem("roles", JSON.stringify(resp.data.roles));
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
          history.replace("/products");
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
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
      {isLoading ? (
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

export default withErrorHandler(Auth, axios);
