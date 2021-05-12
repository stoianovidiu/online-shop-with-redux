import React, { Fragment, useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Fragment>
      {props.isAuthenticated ? (
        <Fragment>
          <Toolbar
            roles={props.roles}
            drawerToggleClicked={sideDrawerToggleHandler}
          />
          <SideDrawer
            roles={props.roles}
            open={sideDrawerIsVisible}
            closed={sideDrawerClosedHandler}
          />
        </Fragment>
      ) : null}
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
