// LoginPage.js
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Userset";
import { getUsers } from "./postHooks";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const { login } = useContext(UserContext);
  const [validUsernames, setValidUsernames] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      const usernames = res.map((user) => user.username);
      setValidUsernames(usernames);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username)
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>validUsernames: </p>
      {validUsernames.map((username) => (
        <p key={username}>{username}</p>
      ))}
    </div>
  );
};

export default LoginPage;
