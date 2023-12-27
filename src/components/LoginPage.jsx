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
    <div class="flex items-center justify-center ">
      <form onSubmit={handleSubmit}>
        <label>
          Select a username:
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

        <button
          class="group inline-block rounded-10px bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 text-[15px] "
          type="submit"
          disabled={loading}
        >
          <span class="text-[12px]"> Login </span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
