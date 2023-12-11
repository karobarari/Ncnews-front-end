import axios from "axios";
import Articles from "./Articles";
import { useEffect, useState } from "react";
import Querybar from "./Queries";

const DisplaySection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://ncnews-yzwd.onrender.com/api/articles")
      .then((response) => {
        setArticles(response.data.articles);
      });
  }, [articles]);
  return (
    <div className="home-display-section">
      <Querybar />
      <h2>football</h2>
      <div className="articles-list">
        <Articles articles={articles} />
      </div>
    </div>
  );
};
export default DisplaySection;
