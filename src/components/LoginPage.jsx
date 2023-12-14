// LoginPage.js
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Userset";
import { getUsers } from "./postHooks";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const { login } = useContext(UserContext);
  const [validUsernames, setValidUsernames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((res) => {
        const usernames = res.map((user) => user.username);
        setValidUsernames(usernames);
      })
      .then(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      return;
    }
    login(username);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Select a username:
          <select
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            <option value="" disabled>
              Choose a username
            </option>
            {loading ? (
              <option value="" disabled>
                Loading...
              </option>
            ) : (
              validUsernames.map((username) => (
                <option value={username} key={username}>
                  {username}
                </option>
              ))
            )}
          </select>
        </label>

        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
