import React, { Suspense, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Logout from "./containers/Auth/Logout/Logout";
import Layout from "./hoc/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import PageNotFound from "./components/UI/PageNotFound/PageNotFound";
import * as actions from "./store/actions/index";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Products = React.lazy(() => import("./containers/Products/Products"));
const Product = React.lazy(() => import("./containers/Product/Product"));
const Cart = React.lazy(() => import("./containers/Cart/Cart"));
const Sales = React.lazy(() => import("./containers/Sales/Sales"));

const App = (props) => {
  const parsedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

  const { onLoggedInfo } = props;

  useEffect(() => {
    if (parsedAuth) {
      onLoggedInfo();
    }
  }, [parsedAuth, onLoggedInfo]);

  let routes = null;

  if (parsedAuth) {
    routes = (
      <Switch>
        <Route
          path="/products"
          exact
          render={(props) => {
            return <Products {...props} />;
          }}
        />

        <Route
          path="/products/:id"
          render={(props) => {
            return <Product {...props} />;
          }}
        />

        <Route
          path="/sales"
          render={(props) => {
            return <Sales {...props} />;
          }}
        />

        <Route
          path="/orders"
          render={(props) => {
            return <Cart {...props} />;
          }}
        />

        <Route
          path="/logout"
          render={() => {
            return <Logout />;
          }}
        />

        <Route path="/auth" exact>
          <Redirect to="/products" />
        </Route>

        <Route path="/" exact>
          <Redirect to="/products" />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );
  }

  return (
    <div>
      <Layout roles={props.roles}>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    cart: state.auth.cart,
    roles: state.auth.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoggedInfo: () => dispatch(actions.authInfo()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
