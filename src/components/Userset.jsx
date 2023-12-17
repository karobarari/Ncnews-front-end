// AuthContext.js
import { createContext, useEffect, useState } from "react";
import { getUsers } from "./postHooks";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          avatar_url:
            "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
          name: "",
          username: "",
        };
  });

  const [loginUsername, setLoginUsername] = useState("");
  const [validUsers, setValidUsers] = useState([]);
  const navigate = useNavigate();

  const login = (userData) => {
    setLoginUsername(userData);
  };
  useEffect(() => {
    getUsers().then((res) => {
      setValidUsers(res);
    });
    validUsers.map((validUser) => {
      if (validUser.username === loginUsername) {
        setUser(validUser);
        localStorage.setItem("user", JSON.stringify(validUser));

        navigate("/articles");
      }
    });
  }, [loginUsername]);
  const logout = () => {
    // Your logout logic here
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
