import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";

const Articles = ({ articles }) => {
  const [article, setArticle] = useState(0);
  const navigate = useNavigate();

  const handleClick = (event, articleId) => {
    event.preventDefault();
    setArticle(articleId);
    navigate(`/ArticleCard/${articleId}`);
  };

  return (
    <>
    <ul>
        {articles.map((article) => (
          <li
            value={article.article_id}
            key={article.article_id}
            onClick={(event) => handleClick(event, article.article_id)}
          >
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="" />
            <h3>author: {article.author}</h3>
            <p>Comments: {article.comment_count}</p>
            <p>votes: {article.votes}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Articles;
