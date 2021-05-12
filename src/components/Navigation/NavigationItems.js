import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  const navItem = props.roles.includes("admin") ? (
    <NavigationItem link="/sales">Sales</NavigationItem>
  ) : (
    <NavigationItem link="/orders">Shopping Cart</NavigationItem>
  );
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/products">Products</NavigationItem>
      {navItem}
      <NavigationItem link="/logout">Logout</NavigationItem>
    </ul>
  );
};

export default navigationItems;
