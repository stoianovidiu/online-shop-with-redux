import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";

import ConfirmMessage from "../../../components/ConfirmMessage/ConfirmMessage";
import Modal from "../../../components/UI/Modal/Modal";

const Logout = (props) => {
  const [isConfirming, setIsConfirming] = useState(true);
  const history = useHistory();

  const cancelMessage = () => {
    setIsConfirming(false);
    history.goBack();
  };

  const confirmLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("cart");
    props.cart.length = 0;
    props.setIsAuthenticated(false);
  };
  const message = (
    <ConfirmMessage clicked1={cancelMessage} clicked2={confirmLogout} />
  );

  return (
    <Fragment>
      <Modal show={isConfirming} modalClosed={cancelMessage}>
        {message}
      </Modal>
    </Fragment>
  );
};

export default Logout;
