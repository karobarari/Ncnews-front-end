import { useEffect, useState } from "react";
import { getAlltopics } from "./queryAxios";
import { Link, NavLink, Navigate } from "react-router-dom";

const Querybar = ({ loading }) => {
  const [slugs, setSlugs] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [sort, setSort] = useState("created_at");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    getAlltopics()
      .then((res) => {
        const slugs = res.map((top) => {
          return top.slug;
        });
        setSlugs(slugs);
      })
      .catch(() => {});
  }, []);
  const handleSortChange = (event) => {
    event.preventDefault();
    if (event.target.value === "Sortby") {
      setTopic("ASC");
    }

    setSort(event.target.value);
  };
  const handleTopicChange = (event) => {
    event.preventDefault();
    if (event.target.value === "topic") {
      setTopic("");
    }
    setTopic(event.target.value);
  };
  const handleOrderChange = (event) => {
    if (event.target.value === "order") {
      setOrder("created_at");
    }
    setOrder(event.target.value);
  };

  return (
    <div class="flex items-center justify-center pb-4 pt-4">
      {loading ? (
        <p>loading filter...</p>
      ) : (
        <form class="flex space-x-1">
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(event) => {
              handleTopicChange(event);
            }}
          >
            <option value={"topic"}>topic</option>
            {slugs.map((topic) => {
              return (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              );
            })}
          </select>
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleOrderChange}
          >
            <option>order</option>

            <option value="ASC">latest</option>
            <option value="DESC">oldest</option>
          </select>
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSortChange}
          >
            <option value="Sortby">Sort by</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
            <option value="created_at">Time</option>
          </select>
          <nav>
            <NavLink
              to={`/articles?topic=${topic}&order=${order}&sortby=${sort}`}
            >
              <button
                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                disabled={loading}
              >
                search
              </button>
            </NavLink>
          </nav>{" "}
        </form>
      )}
      <Link
      to={"/articlePost"}>
      <button
        class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        post +
      </button>
      </Link>
    </div>
  );
};
export default Querybar;
