import Articles from "./Articles";
import Querybar from "./Queries";
import { useEffect, useState } from "react";
import { getQueries } from "./queryAxios";
import { useSearchParams } from "react-router-dom";
import { ErrorComponent } from "../ErrorPage";

const DisplaySection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [p, setP] = useState(1); //p is equivelent to page

  const order = searchParams.get("order");
  const sortby = searchParams.get("sortby");
  const topic = searchParams.get("topic");

  useEffect(() => {
    setLoading(true);
    getQueries(topic, order, sortby, p)
      .then((response) => {
        setArticles(response);
      })
      .finally(() => setLoading(false))
      .catch(() => {
        setError("no articles found");
      });

    return () => {};
  }, [order, sortby, topic, p]);
  const handleNextPage = () => {
    //limit articles for each page is 10
    if (articles.length >= 10) {
      setP(p + 1);
    }
  };
  const handleBackPage = () => {
    if (p !== 1) {
      setP(p - 1);
    }
  };
  if (error) {
    return <ErrorComponent error={error} />;
  } else {
    return (
      <div className="home-display-section">
        <Querybar loading={loading} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="articles-list">
            <Articles articles={articles} />{" "}
          </div>
        )}
        <div class="flex justify-center items-center">
          <button
            onClick={() => {
              handleBackPage();
            }}
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 m-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 "
          >
            {"<<"}page before
          </button>
          <p>page: {p}</p>
          <button
            onClick={() => {
              handleNextPage();
            }}
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 m-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            next page{">>"}
          </button>
        </div>
      </div>
    );
  }
};

export default DisplaySection;
