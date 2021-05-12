import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";

import Header from "../../components/Header/Header";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Products.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const AddProduct = React.lazy(() => import("../AddProduct/AddProduct"));

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [wasAdded, setWasAdded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wasAdded) {
      setIsLoading(true);
      axios
        .get("/products")
        .then((resp) => {
          if (resp.status >= 200 && resp.status < 300) {
            setIsLoading(false);
            setProducts(resp.data);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [wasAdded]);

  const history = useHistory();

  const productClickedHandler = (prod) => {
    history.push(`/products/${prod.id}`);
  };

  const productAddHandler = () => {
    setWasAdded(false);
    setIsAdding(true);
  };

  const listProducts = products.map((prod) => {
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
        clicked1={productAddHandler}
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

  if (isLoading && !isAdding) {
    modeDisplay = <Spinner />;
  }

  if (isAdding) {
    modeDisplay = (
      <AddProduct
        setIsAdding={setIsAdding}
        setWasAdded={setWasAdded}
        products={products}
      />
    );
  }

  return <div className={classes.Products}>{modeDisplay}</div>;
};

export default withErrorHandler(Products, axios);
