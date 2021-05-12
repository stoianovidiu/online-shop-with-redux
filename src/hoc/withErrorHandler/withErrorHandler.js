import React, { Fragment } from "react";

import Modal from "../../components/UI/Modal/Modal";
import httpErrorHandlerHook from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = httpErrorHandlerHook(axios);
    return (
      <Fragment>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;