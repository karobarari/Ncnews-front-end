import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleId, getAllComments } from "./singleArticle";
import ArticleBody from "./ArticleBody";

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
      console.log(res.data);
      setFetchedComment(res.data.comment);
    });
    return () => {};
  }, [article_id]);

const formatDateTime = (createdAt) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(createdAt).toLocaleString(undefined, options);
};

  return (
    <div>
      <ArticleBody fetchedArticle={fetchedArticle} />
      <div>
        <ol>
          {fetchedComments.map((comment) => (
            <li key={comment.comment_id}>
              <p>Author: {comment.author}</p>
              <p>Body: {comment.body}</p>
              <p>
                <p>Created At: {formatDateTime(comment.created_at)}</p>
              </p>
              <p>Votes: {comment.votes}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default ArticleCard;
