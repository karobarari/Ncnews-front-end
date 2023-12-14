import { useContext, useEffect, useState } from "react";
import { formatDateTime } from "../formatDateTime";
import { voteDown, voteUp } from "../voteUps";
import { postComment } from "../postHooks";
import { UserContext } from "../Userset";
import { format } from "date-fns";

const ArticleBody = ({ setNewComment, fetchedArticle }) => {
  const [votesCount, setVotesCount] = useState();
  const [err, setErr] = useState(null);
  const [input, setInput] = useState([]);
  const currentDateTime = new Date();
  const formattedDate = format(currentDateTime, "yyyy-MM-dd HH:mm:ss");
  const { user } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState({ like: false, dislike: false });

  const {
    author,
    article_img_url,
    title,
    topic,
    votes,
    created_at,
    body,
    comment_count,
  } = fetchedArticle;

  const handleLike = () => {
    setVotesCount((currCount) => currCount + 1);
    setIsClicked((prev) => ({ ...prev, like: true }));
    setIsClicked(true);
    voteUp(fetchedArticle.article_id)
      .then((res) => {
        setVotesCount(res);
      })
      .catch((err) => {
        setVotesCount((currentCount) => currentCount - 1);
        setErr("Something went wrong, please try again.");
      });
    setIsClicked((prev) => ({ ...prev, like: true }));
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
    setIsClicked((prev) => ({ ...prev, dislike: true }));
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setNewComment({
      article_id: fetchedArticle.article_id,
      author: user.username,
      comment_id: fetchedArticle.comment_id,
      created_at: formattedDate,
      votes: fetchedArticle.comment_id,
      body: input ? input : "",
    });
    postComment(fetchedArticle.article_id, user.username, input).then(
      (res) => {}
    );
  };
  return (
    <div className="single-article">
      <h3>author: {author}</h3>
      <h2>{title}</h2>
      <img src={article_img_url} alt="" />
      <h3>topic {topic}</h3>
      <p>wroted at {formatDateTime(created_at)}</p>
      <p>{body}</p>
      <p>commets: {comment_count}</p>
      <p>votes:{votesCount ? votesCount : votes}</p>
      {err ? <p>{err}</p> : null}
      <button onClick={handleLike} disabled={isClicked.like}>
        👍
      </button>
      <button onClick={handleDislike} disabled={isClicked.dislike}>
        👎
      </button>
      <form onSubmit={handleSubmit}>
        <textarea type="text" onChange={handleChange} value={input} />
        <p>{500 - input.length} remaining characters</p>
        <button disabled={input.length > 500} type="submit">
          post a comment
        </button>
      </form>
    </div>
  );
};

export default ArticleBody;
