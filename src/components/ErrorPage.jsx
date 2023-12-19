import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <h2>Not a valid path!</h2>
      <Link to={"/"}>Go back to Login</Link>
    </>
  );
};

export const ErrorComponent = ({ error }) => {
  return (
    <div>
      <h2>{error}</h2>
      <Link to={"/articles"}>Go back to Home</Link>
    </div>
  );
};
