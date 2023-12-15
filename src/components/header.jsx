import React, { useContext } from "react";
import { UserContext } from "./Userset";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const currentDateTime = new Date();
  const formattedDate = format(currentDateTime, "yyyy-MM-dd HH:mm");

  const handleBackToLogin = () => {
    // Navigate to the login page when the "Back to Login" button is clicked
    navigate("/");
  };

  return (
    <div className="header-container">
      <h1 className="header-title" onClick={() => navigate("/")}>
        NC News
      </h1>
      <div className="user-info">
        {user ? (
          <>
            <p>Loged in as: {user.username}!</p>
            <button onClick={handleBackToLogin}>Back to Login</button>
          </>
        ) : null}
      </div>
      <div className="date-section">
        <p>
          Today's Date: <br />
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default Header;
