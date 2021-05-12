import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";

import Header from "../../components/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import ConfirmMessage from "../../components/ConfirmMessage/ConfirmMessage";
import ActionDoneMessage from "../../components/ConfirmMessage/ActionDoneMessage/ActionDoneMessage";
import classes from "./Product.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const EditProduct = React.lazy(() => import("../EditProduct/EditProduct"));

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [wasEdited, setWasEdited] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (wasEdited) {
      setIsLoading(true);
      axios
        .get(`/products/${props.match.params.id}`)
        .then((resp) => {
          if (resp.status >= 200 && resp.status < 300) {
            setIsLoading(false);
            setWasEdited(false);
            setProduct(resp.data);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [props.match.params.id, wasEdited]);

  const addToCartButtonHandler = () => {
    const updatedProduct = { ...product, quantity: 1 };
    const cart = props.cart.slice();
    const foundProduct = cart.find((prod) => prod.id === updatedProduct.id);

    props.setCart(
      foundProduct
        ? [
            ...cart.filter((prod) => prod.id !== updatedProduct.id),
            { ...foundProduct, quantity: foundProduct.quantity + 1 },
          ]
        : [...cart, updatedProduct]
    );

    setIsDone(true);
  };

  const deleteProductHandler = () => {
    setIsLoading(true);
    axios
      .delete(`/products/${props.match.params.id}`)
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setIsLoading(false);
          setIsConfirming(false);
          setIsDone(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const editProductHandler = () => {
    setWasEdited(false);
    setIsEditing(true);
  };

  const openMessage = () => {
    setIsConfirming(true);
  };

  const cancelMessage = () => {
    if (isConfirming) {
      setIsConfirming(false);
    } else if (isDone) {
      setIsDone(false);
      if (props.roles.includes("admin")) {
        history.replace("/products");
      }
    }
  };

  let confirmMessage = null;

  if (isConfirming) {
    confirmMessage = (
      <ConfirmMessage
        action="delete"
        prodName={product.name}
        clicked1={cancelMessage}
        clicked2={deleteProductHandler}
      />
    );
  } else if (isDone) {
    confirmMessage = (
      <ActionDoneMessage
        message={
          props.roles.includes("admin")
            ? `The product "${product.name}" has been successfully deleted!`
            : `The product "${product.name}" was added to the shopping cart!`
        }
        clicked={cancelMessage}
      />
    );
  }

  if (isLoading && !isEditing) {
    confirmMessage = <Spinner />;
  }

  let modeDisplay = (
    <Fragment>
      <Header
        title={"Product: " + product.name}
        paramsId={props.match.params}
        roles={props.roles}
        btn1={props.roles.includes("admin") ? "EDIT" : "ADD TO CART"}
        clicked1={
          props.roles.includes("admin")
            ? editProductHandler
            : addToCartButtonHandler
        }
        btn2="DELETE"
        clicked2={openMessage}
      />
      <div className={classes.Product}>
        <div className={classes.ProdList}>
          <p>
            <span>Name:</span> {product.name}
          </p>
          <p>
            <span>Category:</span> {product.category}
          </p>
          <p>
            <span>Price:</span> {product.price} EUR
          </p>
          <p>
            <span>Description:</span> {product.description}
          </p>
        </div>
        <img src={product.image} alt={product.name + "img"} />
      </div>
    </Fragment>
  );

  if (isLoading && wasEdited) {
    modeDisplay = <Spinner />;
  }

  if (isEditing) {
    modeDisplay = (
      <div className={classes.Product}>
        <EditProduct
          product={product}
          currProd={props.match.params.id}
          setIsEditing={setIsEditing}
          setWasEdited={setWasEdited}
        />
      </div>
    );
  }

  return (
    <Fragment>
      <Modal show={isDone || isConfirming} modalClosed={cancelMessage}>
        {confirmMessage}
      </Modal>
      {modeDisplay}
    </Fragment>
  );
};

export default withErrorHandler(Product, axios);
