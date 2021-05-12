import React, { Fragment } from "react";

import Backdrop from "../UI/Backdrop/Backdrop";
import NavigationItems from "../Navigation/NavigationItems";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <nav>
          <NavigationItems roles={props.roles} />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
