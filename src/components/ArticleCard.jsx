import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [fetchedArticle, setFetchArticle] = useState([]);
  useEffect(() => {
    axios
      .get(`https://ncnews-yzwd.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        setFetchArticle(res.data.article);
      });
    return () => {};
  }, [article_id]);
  const formattedDate = new Date(
    fetchedArticle.created_at
  ).toLocaleDateString();

  console.log(fetchedArticle);
  return (
    <div className="single-article">
      <h3>author: {fetchedArticle.author}</h3>
      <h2>{fetchedArticle.title}</h2>
      <img src={fetchedArticle.article_img_url} alt="" />
      <h3>topic {fetchedArticle.topic}</h3>
      <p>wroted at {formattedDate}</p>
      <p>{fetchedArticle.body}</p>
      <button>commets: {fetchedArticle.comment_count}</button>
    </div>
  );
};
export default ArticleCard;
