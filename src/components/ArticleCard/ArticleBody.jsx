import { useContext, useEffect, useState } from "react";
import { formatDateTime } from "../LoginPage/formatDateTime";
import { voteDown, voteUp } from "./voteUps";
import { postComment } from "../LoginPage/costumHooks";
import { UserContext } from "../Userset";
import { format } from "date-fns";
import deleteArticle from "./deleteArticle";
import { Link } from "react-router-dom";

const ArticleBody = ({ setNewComment, fetchedArticle }) => {
  const [votesCount, setVotesCount] = useState();
  const [err, setErr] = useState(null);
  const [input, setInput] = useState([]);
  const currentDateTime = new Date();
  const formattedDate = format(currentDateTime, "yyyy-MM-dd HH:mm:ss");
  const { user } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState({ like: false, dislike: false });
  const [postCommentError, setPostCommentError] = useState(null);
  const [articleDeleted, setArticleDeleted] = useState(false);
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
    if (isClicked.like) {
      setVotesCount((currCount) => currCount - 1);
      setIsClicked((prev) => ({ ...prev, like: false }));

      voteDown(fetchedArticle.article_id).then((res) => {
        setVotesCount(res);
      });
    } else {
      setVotesCount((currCount) => currCount + 1);
      setIsClicked((prev) => ({ ...prev, like: true }));
      voteUp(fetchedArticle.article_id)
        .then((res) => {
          setVotesCount(res);
        })
        .catch(() => {
          setVotesCount((currentCount) => currentCount - 1);
          setErr("Something went wrong, please try again.");
        });
      setIsClicked((prev) => ({ ...prev, like: true }));
    }
  };
  const handleDislike = () => {
    if (isClicked.dislike) {
      setVotesCount((currCount) => currCount + 1);
      setIsClicked((prev) => ({ ...prev, dislike: false }));

      voteUp(fetchedArticle.article_id).then((res) => {
        setVotesCount(res);
      });
    } else {
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
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = /\S/g; //pervents from posting only white space.
    if (input.length !== 0 && regex.test(input)) {
      setPostCommentError("");
      setNewComment({
        article_id: fetchedArticle.article_id,
        author: user.username,
        comment_id: fetchedArticle.comment_id,
        created_at: formattedDate,
        votes: fetchedArticle.comment_id,
        body: input,
      });
      postComment(fetchedArticle.article_id, user.username, input);
    } else {
      setPostCommentError("can't post an empty comment!");
    }
  };
  const handleDeleteArticle = async () => {
    try {
      setArticleDeleted(true);
      deletedArticle = deleteArticle(fetchedArticle.article_id);
    } catch {}
  };
  if (articleDeleted) {
    return (
      <>
        <p>Article and comments deleted successfully.</p>
        <Link to={"/articles"}>Go back to Home</Link>
      </>
    );
  } else {
    return (
      <div
        class="mt-10 mb-10 p-1 bg-gradient-to-r
            from-blue-500
            via-red-500
            to-yellow-500
            rounded-lg
            "
      >
        <div
          class="items-center justify-center bg-gray-100
            p-10 m-1 rounded-lg
            "
        >
          <h2>{title}</h2>
          <div
            class="flex items-center justify-center 
            m-5"
          >
            <img src={article_img_url} alt="Artcle image" />
          </div>
          <h3>topic {topic}</h3>
          <h3 class="font-georgia">Author: {author}</h3>

          <p>wroted at {formatDateTime(created_at)}</p>
          <div
            class="mt-10 p-1 bg-gray-100
            rounded-lg"
          >
            <p class="bg-white rounded-lg border-gray-200 border-2 p-4">
              {body}
            </p>
          </div>
          <p>commets: {comment_count}</p>
          <p>votes:{votesCount ? votesCount : votes}</p>
          {err ? <p>{err}</p> : null}
          <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            onClick={handleLike}
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              👍
            </span>
          </button>
          <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            onClick={handleDislike}
          >
            {" "}
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              👎
            </span>
          </button>
          <form onSubmit={handleSubmit}>
            <textarea
              class="shadow-md w-full px-0 text-sm text-gray-900 bg-white border-2 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="  Write a comment..."
              required
              type="text"
              onChange={handleChange}
              value={input}
            />
            {postCommentError ? (
              <p className="error-paragraph">{postCommentError}</p>
            ) : (
              ""
            )}
            <p>{500 - input.length} remaining characters</p>
            <button
              class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              disabled={input.length > 500}
              type="submit"
            >
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Post comment
              </span>
            </button>
          </form>
          {user.username === author ? (
            <button
              onClick={() => {
                handleDeleteArticle();
              }}
              type="button"
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete Article
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
};
export default ArticleBody;
