import React, { Fragment, useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Sales.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Sales = (props) => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/sales")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setSales(resp.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  let listProducts = (
    <Fragment>
      <Header title="Sales" paramsId={props.match.params} />
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.sales}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );

  if (isLoading) {
    listProducts = <Spinner />;
  }

  return <div className={classes.Sales}>{listProducts}</div>;
};

export default withErrorHandler(Sales, axios);
