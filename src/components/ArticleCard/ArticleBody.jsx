import { useEffect, useState } from "react";
import { formatDateTime } from "../formatDateTime";
import { voteDown, voteUp } from "../voteUps";

const ArticleBody = ({ fetchedArticle }) => {
  const [votesCount, setVotesCount] = useState();
  const [err, setErr] = useState(null);

  const handleLike = () => {
    setVotesCount((currCount) => currCount + 1);
    voteUp(fetchedArticle.article_id)
      .then((res) => {
        setVotesCount(res);
      })
      .catch((err) => {
        setVotesCount((currentCount) => currentCount - 1);
        setErr("Something went wrong, please try again.");
      });
  };
  const handleDislike = () => {
    setVotesCount((currCount) => currCount - 1);
    voteDown(fetchedArticle.article_id)
      .then((res) => {
        setVotesCount(res);
      })
      .catch((err) => {
        setVotesCount((currentCount) => currentCount + 1);
        setErr("Something went wrong, please try again.");
      });
  };
  return (
    <div className="single-article">
      <h3>author: {fetchedArticle.author}</h3>
      <h2>{fetchedArticle.title}</h2>
      <img src={fetchedArticle.article_img_url} alt="" />
      <h3>topic {fetchedArticle.topic}</h3>
      <p>wroted at {formatDateTime(fetchedArticle.created_at)}</p>
      <p>{fetchedArticle.body}</p>
      <button>commets: {fetchedArticle.comment_count}</button>
      <p>votes:{votesCount?votesCount:fetchedArticle.votes}</p>
      {err ? <p>{err}</p> : null}
      <button onClick={handleLike}>👍</button>
      <button onClick={handleDislike}>👎</button>
    </div>
  );
};

export default ArticleBody;
