import Articles from "./Articles";
import Querybar from "./Queries";
import { useEffect, useState } from "react";
import { getQueries, getAllArticles } from "./queryAxios";
import { imageGenerator } from "../postHooks";


const DisplaySection = () => {
  const [articles, setArticles] = useState([]);
  const [chosenTopic, setChosenTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    setLoading(true); // Set loading to true when starting the API request

    if (chosenTopic !== "alltopics") {
      getQueries(chosenTopic)
        .then((res) => {
          setArticles(res.data.articles);
        })
        .finally(() => setLoading(false)); // Set loading to false when the API request is complete
    } else {
      getAllArticles()
        .then((response) => {
          setArticles(response.data.articles);
        })
        .finally(() => setLoading(false)); // Set loading to false when the API request is complete
    }
  }, [chosenTopic]);

  useEffect(() => {
    // Use imageGenerator to fetch avatars for unique authors
    imageGenerator(articles).then((res) => {
      setAvatars(res);
    });
  }, [articles]);

  return (
    <div className="home-display-section">
      <Querybar setChosenTopic={setChosenTopic} />
      <h2>{chosenTopic}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="articles-list">
          <Articles avatars={avatars} articles={articles} />
        </div>
      )}
    </div>
  );
};

export default DisplaySection;
