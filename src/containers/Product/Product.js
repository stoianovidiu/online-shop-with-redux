import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import ConfirmMessage from "../../components/ConfirmMessage/ConfirmMessage";
import ActionDoneMessage from "../../components/ConfirmMessage/ActionDoneMessage/ActionDoneMessage";
import classes from "./Product.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const EditProduct = React.lazy(() => import("../EditProduct/EditProduct"));

const Product = (props) => {
  const history = useHistory();

  const { onFetchProd } = props;
  const { wasEdited } = props;
  const { onDeleteProd } = props;
  const { onCancelEdit } = props;

  useEffect(() => {
    onFetchProd(props.match.params.id);
  }, [props.match.params.id, onFetchProd]);

  useEffect(() => {
    onCancelEdit();
  }, [onCancelEdit]);

  const addToCartButtonHandler = () => {
    props.onAddToCart();
  };

  const deleteProductHandler = () => {
    onDeleteProd(props.match.params.id);
  };

  const editProductHandler = () => {
    props.onEditProductHandler();
  };

  const openMessage = () => {
    props.onOpenMessage();
  };

  const cancelMessage = () => {
    if (props.isConfirming && props.isDone) {
      props.onCancelMessageHandler();
      history.replace("/products");
    } else {
      props.onCancelMessageHandler();
    }
  };

  let confirmMessage = null;

  if (props.isConfirming && !props.isDone) {
    confirmMessage = (
      <ConfirmMessage
        action="delete"
        prodName={props.product.name}
        clicked1={cancelMessage}
        clicked2={deleteProductHandler}
      />
    );
  } else if (props.isConfirming && props.isDone) {
    confirmMessage = (
      <ActionDoneMessage
        message={
          props.roles.includes("admin")
            ? `The product "${props.product.name}" has been successfully deleted!`
            : `The product "${props.product.name}" was added to the shopping cart!`
        }
        clicked={cancelMessage}
      />
    );
  }

  if (props.isLoading && !props.isEditing) {
    confirmMessage = <Spinner />;
  }

  let modeDisplay = (
    <Fragment>
      <Header
        title={"Product: " + props.product.name}
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
            <span>Name:</span> {props.product.name}
          </p>
          <p>
            <span>Category:</span> {props.product.category}
          </p>
          <p>
            <span>Price:</span> {props.product.price} EUR
          </p>
          <p>
            <span>Description:</span> {props.product.description}
          </p>
        </div>
        <img src={props.product.image} alt={props.product.name + "img"} />
      </div>
    </Fragment>
  );

  if (props.isLoading && wasEdited) {
    modeDisplay = <Spinner />;
  }

  if (props.isEditing) {
    modeDisplay = (
      <div className={classes.Product}>
        <EditProduct currProdId={props.match.params.id} />
      </div>
    );
  }

  return (
    <Fragment>
      <Modal
        show={props.isDone || props.isConfirming}
        modalClosed={cancelMessage}
      >
        {confirmMessage}
      </Modal>
      {modeDisplay}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.prod.product,
    isEditing: state.prod.isEditing,
    wasEdited: state.prod.wasEdited,
    isConfirming: state.prod.isConfirming,
    isDone: state.prod.isDone,
    isLoading: state.prod.isLoading,
    cart: state.prod.cart,

    roles: state.auth.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProd: (prodId) => dispatch(actions.fetchProd(prodId)),
    onAddToCart: (cart) => dispatch(actions.addToCart(cart)),
    onDeleteProd: (prodId) => dispatch(actions.deleteProd(prodId)),
    onEditProductHandler: () => dispatch(actions.editProdHandler()),
    onOpenMessage: () => dispatch(actions.openMessage()),
    onCancelMessageHandler: (isConfirming, isDone) =>
      dispatch(actions.prodCancelMessageHandler()),
    onCancelEdit: () => dispatch(actions.cancelEditHandler()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Product, axios));
