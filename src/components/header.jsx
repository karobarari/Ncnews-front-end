import { useContext, useEffect } from "react";
import { UserContext } from "./Userset";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, } = useContext(UserContext);

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const handleLogout = () => {
    navigate("/")
  };
  return (
    <div className="Header">
      <h1>NC news</h1>
      <div className="date-section">
        <p>
          Todays Date: <br />
          {date}/{month}/{year}
        </p>
        <button onClick={handleLogout}>back to login</button>
      </div>
    </div>
  );
};

export default Header;
