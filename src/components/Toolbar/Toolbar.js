import React from "react";

import NavigationItems from "../Navigation/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import classes from "./Toolbar.module.css";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />

    <nav className={classes.DesktopOnly}>
      <NavigationItems roles={props.roles} />
    </nav>
  </header>
);

export default toolbar;
