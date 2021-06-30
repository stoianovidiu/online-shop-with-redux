import React, { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import classes from "./AddProduct.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import ActionDoneMessage from "../../components/ConfirmMessage/ActionDoneMessage/ActionDoneMessage";
import axios from "../../axios-instance";
import { checkValidity } from "../../Utility/Utility";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const AddProduct = (props) => {
  const [productToAdd, setProductToAdd] = useState({
    id: +"",
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const [priceRules, setPriceRules] = useState({
    validation: {
      required: true,
      isNumeric: true,
    },
    valid: false,
    touched: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const actionDoneMessage = (
    <ActionDoneMessage
      message="Product was added to the list!"
      clicked={props.onCancelMessage}
    />
  );

  const addButtonHandler = () => {
    const productToAddWithId = {
      ...productToAdd,
      id: props.products[props.products.length - 1].id + 1,
    };
    props.onAddProduct(productToAddWithId);
  };

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
      ...productToAdd,
      [field]: userInput,
    };

    setProductToAdd(updatedFields);
  };

  const checkForm = useCallback(() => {
    const addProd = { ...productToAdd };
    const isValid = !Object.values(addProd).some((field) => {
      return field === null || field === "";
    });

    if (isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [productToAdd]);

  useEffect(() => {
    checkForm();
  }, [checkForm]);

  const fieldElementsArray = [];
  for (let key in productToAdd) {
    if (key === "id") continue;
    fieldElementsArray.push({
      element: key,
      data: productToAdd[key],
    });
  }

  let form = (
    <Fragment>
      <h2>Add Product</h2>
      {fieldElementsArray.map((el) => {
        return (
          <Input
            key={el.element}
            label={el.element.charAt(0).toUpperCase() + el.element.slice(1)}
            type="text"
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
      <Button clicked={props.onAddCancel}>CANCEL</Button>
      <Button
        clicked={addButtonHandler}
        disabled={isFormValid && priceRules.valid ? false : true}
      >
        ADD
      </Button>
    </Fragment>
  );

  if (props.isLoading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.AddProduct}>
      <Modal show={props.isDone} modalClosed={props.onCancelMessage}>
        {actionDoneMessage}
      </Modal>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    isLoading: state.products.isLoading,
    isDone: state.products.isDone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddProduct: (productToAddWithId) =>
      dispatch(actions.addProduct(productToAddWithId)),
    onAddCancel: () => dispatch(actions.cancelAddHandler()),
    onCancelMessage: () => dispatch(actions.productsCancelMessageHandler()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(AddProduct, axios));
