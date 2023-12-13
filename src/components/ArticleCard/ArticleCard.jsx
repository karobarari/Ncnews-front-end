import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleId, getAllComments } from "./singleArticle";
import ArticleBody from "./ArticleBody";
import Comments from "./Comments";
import Header from "../header";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [fetchedArticle, setFetchArticle] = useState([]);
  const [fetchedComments, setFetchedComment] = useState([]);

  useEffect(() => {
    getArticleId(article_id).then((res) => {
      setFetchArticle(res.data.article);
    });
    return () => {};
  }, [article_id]);

  useEffect(() => {
    getAllComments(article_id).then((res) => {
      setFetchedComment(res.data.comment);
    });
    return () => {};
  }, [article_id]);

  return (
    <div>
      <ArticleBody fetchedArticle={fetchedArticle} />
      <Comments fetchedComments={fetchedComments} />
    </div>
  );
};
export default ArticleCard;
