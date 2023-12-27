import React, { useContext } from "react";
import { UserContext } from "./Userset";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Header = () => {
  const navigate = useNavigate();
  const { user,logout } = useContext(UserContext);
  const currentDateTime = new Date();
  const formattedDate = format(currentDateTime, "yyyy-MM-dd HH:mm");

  const handleBackToLogin = () => {
    logout()
    navigate("/");
  };
  return (
    <div class="flex flex-col bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-md w-full">
      <h1 onClick={() => navigate("/")}>
        <span class="justify-center shadow-md text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          NC News
        </span>
      </h1>
      <div class="p-5">
        {user ? (
          <>
            <p class="bg-[#fffcdfbe] font-sm rounded-lg text-xs p-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
             
                <img class="max-h-8" src={user.avatar_url} alt="user avatar" />
              Logged in as: {user.username}
            </p>
            <div class="flex flex-row justify-between">
              <p class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                Today's Date: {formattedDate}
              </p>
              <button
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={handleBackToLogin}
              >
                Back to Login
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
