import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Userset";
import { getUsers } from "./costumHooks";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const { login, logout } = useContext(UserContext);
  const [validUsernames, setValidUsernames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logout();
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
    <div class="relative p-0.5 mt-10  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 via-pink-300 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500  dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 flex items-center justify-center ">
      <form
        class="px-64 py-20 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md"
        onSubmit={handleSubmit}
      >
        <label>
          Login as:
          <select
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          type="submit"
          disabled={loading}
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Login
          </span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
