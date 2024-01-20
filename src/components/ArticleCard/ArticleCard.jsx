import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleId, getAllComments } from "./singleArticle";
import ArticleBody from "./ArticleBody";
import Comments from "./Comments";
import { imageGenerator } from "../LoginPage/costumHooks";
import { ErrorComponent } from "../ErrorPage";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [fetchedArticle, setFetchArticle] = useState([]);
  const [fetchedComments, setFetchedComment] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    getArticleId(article_id)
      .then((res) => {
        setFetchArticle(res);
      })
      .catch(() => {
        setError("Article Id not found!");
      });
    setNewComment({});
    return () => {};
  }, [article_id]);
  useEffect(() => {
    getAllComments(article_id)
      .then((res) => {

        setFetchedComment(res);
      })
      .catch(() => {
        setCommentError("Article Id not found!");
      });
    return () => {};
  }, [article_id]);

  if (error) {
    return <ErrorComponent error={error} />;
  } else {
    return (
      <div>
        <ArticleBody
          setNewComment={setNewComment}
          fetchedArticle={fetchedArticle}
        />
        <Comments newComment={newComment} fetchedComments={fetchedComments} />
      </div>
    );
  }
};
export default ArticleCard;
