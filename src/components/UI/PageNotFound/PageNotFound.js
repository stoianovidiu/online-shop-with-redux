import { useEffect } from "react";
import { useHistory } from "react-router";

import Spinner from "../Spinner/Spinner";

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.replace("/");
    }, 1000);
  }, [history]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Page not found!</h1>
      <h3>Redirecting...</h3>
      <Spinner />
    </div>
  );
};

export default NotFound;
