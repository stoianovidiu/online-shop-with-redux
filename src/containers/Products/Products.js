import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Products.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const AddProduct = React.lazy(() => import("../AddProduct/AddProduct"));

const Products = (props) => {
  const { onFetchProducts } = props;
  const { wasAdded } = props;
  const { onAddCancel } = props;
  const { wasEdited } = props;

  useEffect(() => {
    if (wasAdded || wasEdited) {
      onFetchProducts();
    }
  }, [wasAdded, wasEdited, onFetchProducts]);

  useEffect(() => {
    onAddCancel();
  }, [onAddCancel]);

  const history = useHistory();

  const productClickedHandler = (prod) => {
    history.push(`/products/${prod.id}`);
  };

  const listProducts = props.products.map((prod) => {
    return (
      <tr key={prod.id}>
        <td>{prod.category}</td>
        <td>{prod.name}</td>
        <td>{prod.price}</td>
        <td>
          <button
            className={classes.ProductsBtn}
            onClick={() => productClickedHandler(prod)}
          >
            ➡▶
          </button>
        </td>
      </tr>
    );
  });

  let modeDisplay = (
    <Fragment>
      <Header
        title="Products"
        paramsId={props.match.params}
        roles={props.roles}
        btn1="ADD"
        clicked1={props.addButtonHandler}
      />
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Product Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{listProducts}</tbody>
      </table>
    </Fragment>
  );

  if (props.isLoading && props.isAdding) {
    modeDisplay = <Spinner />;
  }

  if (props.isAdding) {
    modeDisplay = <AddProduct />;
  }

  return <div className={classes.Products}>{modeDisplay}</div>;
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    isLoading: state.products.isLoading,
    isAdding: state.products.isAdding,
    wasAdded: state.products.wasAdded,
    wasEdited: state.prod.wasEdited,
    roles: state.auth.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
    addButtonHandler: () => dispatch(actions.addProductHandler()),
    onAddCancel: () => dispatch(actions.cancelAddHandler()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Products, axios));
