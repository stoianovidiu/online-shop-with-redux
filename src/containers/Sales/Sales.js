import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Sales.module.css";
import axios from "../../axios-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const Sales = (props) => {
  const { onFetchSales } = props;
  useEffect(() => {
    onFetchSales();
  }, [onFetchSales]);

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
          {props.sales.map((item, index) => {
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

  if (props.isLoading) {
    listProducts = <Spinner />;
  }

  return <div className={classes.Sales}>{listProducts}</div>;
};

const mapStateToProps = (state) => {
  return {
    sales: state.sales.sales,
    isLoading: state.sales.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSales: () => dispatch(actions.fetchSales()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Sales, axios));
