import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleId, getAllComments } from "./singleArticle";
import ArticleBody from "./ArticleBody";
import Comments from "./Comments";
import { imageGenerator } from "../postHooks";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [fetchedArticle, setFetchArticle] = useState([]);
  const [fetchedComments, setFetchedComment] = useState([]);
 

  const [newComment, setNewComment] = useState({});
  useEffect(() => {
    getArticleId(article_id).then((res) => {
      setFetchArticle(res.data.article);
    });
    setNewComment({});
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
      <ArticleBody
        setNewComment={setNewComment}
        fetchedArticle={fetchedArticle}
      />
      <Comments
        newComment={newComment}
        fetchedComments={fetchedComments}
      />
    </div>
  );
};
export default ArticleCard;
