import axios from "axios";
import Articles from "./Articles";
import { useEffect, useState } from "react";
import Querybar from "./Queries";
import { getQueries, getAllArticles } from "./queryAxios";

const DisplaySection = () => {
  const [articles, setArticles] = useState([]);
  const [chosenTopic, setChosenTopic] = useState("");
  useEffect(() => {
    if (chosenTopic !== "alltopics") {
      getQueries(chosenTopic).then((res) => {
        setArticles(res.data.articles);
      });
    } else {
      getAllArticles().then((response) => {
        setArticles(response.data.articles);
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
