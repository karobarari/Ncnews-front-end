import axios from "axios";
import Articles from "./Articles";
import { useEffect, useState } from "react";
import Querybar from "./Queries";
import getQueries from "./queryAxios";

const DisplaySection = () => {
  const [articles, setArticles] = useState([]);
  const [chosenTopic, setChosenTopic] = useState("");
  useEffect(() => {
    if (chosenTopic !== "alltopics") {
      getQueries(chosenTopic)
        .then((res) => {
          setArticles(res.data.articles);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        });
    } else {
      axios
        .get("https://ncnews-yzwd.onrender.com/api/articles")
        .then((response) => {
          setArticles(response.data.articles);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        });
    }
  }, [chosenTopic]);

  return (
    <div className="home-display-section">
      <Querybar setChosenTopic={setChosenTopic} />
      <h2>football</h2>
      <div className="articles-list">
        <Articles articles={articles} />
      </div>
    </div>
  );
};
export default DisplaySection;
