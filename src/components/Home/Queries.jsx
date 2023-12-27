import { useEffect, useState } from "react";
import { getAlltopics } from "./queryAxios";
import { NavLink } from "react-router-dom";

const Querybar = ({ loading }) => {
  const [slugs, setSlugs] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [sort, setSort] = useState("created_at");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    getAlltopics().then((res) => {
      const slugs = res.map((top) => {
        return top.slug;
      });
      setSlugs(slugs);
    }).catch(()=>{
      
    })
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
    <div>
      <div class="flex items-center justify-center pb-4">
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
                <button   disabled={loading}>
                  search
                </button>
              </NavLink>
            </nav>{" "}
          </form>
        )}
      </div>
    </div>
  );
};
export default Querybar;
