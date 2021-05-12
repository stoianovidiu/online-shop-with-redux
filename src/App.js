import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import "./App.css";
import Logout from "./containers/Auth/Logout/Logout";
import Layout from "./hoc/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import PageNotFound from "./components/UI/PageNotFound/PageNotFound";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Products = React.lazy(() => import("./containers/Products/Products"));
const Product = React.lazy(() => import("./containers/Product/Product"));
const Cart = React.lazy(() => import("./containers/Cart/Cart"));
const Sales = React.lazy(() => import("./containers/Sales/Sales"));

const App = (props) => {
  const [cart, setCart] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  const parsedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    if (parsedAuth) {
      setUser(localStorage.getItem("username"));
      setRoles(JSON.parse(localStorage.getItem("roles")));
      setIsAuthenticated(true);
    }
  }, [parsedAuth]);

  useEffect(() => {
    const parsedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(parsedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  let routes = null;

  if (parsedAuth) {
    routes = (
      <Switch>
        <Route
          path="/products"
          exact
          render={(props) => {
            return <Products {...props} roles={roles} />;
          }}
        />

        <Route
          path="/products/:id"
          render={(props) => {
            return (
              <Product {...props} cart={cart} setCart={setCart} roles={roles} />
            );
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
            return (
              <Cart {...props} cart={cart} setCart={setCart} user={user} />
            );
          }}
        />

        <Route
          path="/logout"
          render={() => {
            return (
              <Logout setIsAuthenticated={setIsAuthenticated} cart={cart} />
            );
          }}
        />

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
        <Route
          path="/auth"
          render={(props) => (
            <Auth
              {...props}
              authenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              setRoles={setRoles}
              setUser={setUser}
            />
          )}
        />
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );
  }

  return (
    <div>
      <Layout isAuthenticated={isAuthenticated} roles={roles}>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
