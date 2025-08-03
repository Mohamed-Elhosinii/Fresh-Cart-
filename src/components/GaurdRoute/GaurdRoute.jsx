import { useContext } from "react";
import { Navigate } from "react-router";
import { TokenContext } from "../../context/Token.context";

export default function GaurdRoute({ children }) {
  let { token } = useContext(TokenContext);
  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
