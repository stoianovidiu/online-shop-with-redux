import React, { Fragment, useCallback, useEffect, useState } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./EditProduct.module.css";
import axios from "../../axios-instance";
import Modal from "../../components/UI/Modal/Modal";
import ActionDoneMessage from "../../components/ConfirmMessage/ActionDoneMessage/ActionDoneMessage";
import { checkValidity } from "../../Utility/Utility";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const EditProduct = (props) => {
  const [editedProduct, setEditedProduct] = useState(props.product);
  const [priceRules, setPriceRules] = useState({
    validation: {
      required: true,
      isNumeric: true,
    },
    valid: true,
    touched: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const editInputHandler = (event, field) => {
    let userInput = event.target.value;
    if (field === "price") {
      const rules = {
        ...priceRules,
        valid: checkValidity(userInput, priceRules.validation),
        touched: true,
      };
      setPriceRules(rules);
    }

    const updatedFields = {
      ...editedProduct,
      [field]: userInput,
    };
    setEditedProduct(updatedFields);
  };

  const checkForm = useCallback(() => {
    const edProd = { ...editedProduct };
    const isValid = !Object.values(edProd).some((field) => {
      return field === null || field === "";
    });

    if (isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [editedProduct]);

  useEffect(() => {
    checkForm();
  }, [checkForm]);

  const cancelEditHandler = () => {
    props.setIsEditing(false);
    props.setWasEdited(false);
  };

  const saveEditHandler = () => {
    setIsLoading(true);
    axios
      .put(`/products/${props.currProd}`, editedProduct)
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setIsLoading(false);
          props.setWasEdited(true);
          setIsDone(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const closeMessage = () => {
    setIsDone(false);
    props.setIsEditing(false);
  };

  const elementsArray = [];
  for (let key in editedProduct) {
    if (key === "id") {
      continue;
    }
    elementsArray.push({
      element: key,
      data: editedProduct[key],
    });
  }

  let form = (
    <Fragment>
      <h2>Edit: {props.product.name}</h2>
      {elementsArray.map((el) => {
        return (
          <Input
            key={el.element}
            type="text"
            label={el.element.charAt(0).toUpperCase() + el.element.slice(1)}
            value={el.data}
            invalid={el.element === "price" ? !priceRules.valid : false}
            shouldValidate={
              el.element === "price" ? priceRules.validation : null
            }
            touched={priceRules.touched}
            changed={(event) => editInputHandler(event, el.element)}
          />
        );
      })}
      <div>
        <Button clicked={cancelEditHandler}>CANCEL</Button>
        <Button
          clicked={saveEditHandler}
          disabled={isFormValid && priceRules.valid ? false : true}
        >
          SAVE
        </Button>
      </div>
    </Fragment>
  );

  const confirmMessage = (
    <ActionDoneMessage
      message={`The product "${props.product.name}" was successfully edited.`}
      clicked={closeMessage}
    />
  );
  if (isLoading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.EditProduct}>
      <Modal show={isDone} modalClosed={closeMessage}>
        {confirmMessage}
      </Modal>
      {form}
    </div>
  );
};

export default withErrorHandler(EditProduct, axios);
