import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import ConfirmMessage from "../../../components/ConfirmMessage/ConfirmMessage";
import Modal from "../../../components/UI/Modal/Modal";
import * as actions from "../../../store/actions/index";

const Logout = (props) => {
  const [isConfirming, setIsConfirming] = useState(true);
  const history = useHistory();

  const cancelMessage = () => {
    setIsConfirming(false);
    history.goBack();
  };

  const confirmLogout = () => {
    props.cart.length = 0;
    props.onLogout();
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

const mapStateToProps = (state) => {
  return {
    cart: state.prod.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
