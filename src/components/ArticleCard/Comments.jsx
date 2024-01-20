import { useContext, useEffect, useState } from "react";
import { formatDateTime } from "../LoginPage/formatDateTime";
import { UserContext } from "../Userset";
import { deleteComment, imageGenerator } from "../LoginPage/costumHooks";

const Comments = ({ newComment, fetchedComments }) => {
  const { user } = useContext(UserContext);
  const [avatars, setAvatars] = useState([]);
  const [deleted, setDeleted] = useState([]);

  useEffect(() => {
    imageGenerator(fetchedComments).then((res) => {
      setAvatars(res);
    });
  }, [fetchedComments]);
  const handleClick = (event, articleId) => {
    event.preventDefault();
    setDeleted(articleId);
    deleteComment(articleId);
  };

  if (newComment !== null) {
    fetchedComments.unshift(newComment);
  }
  return (
    <ol
    >
      {fetchedComments
        .filter((comment) => comment.body && comment.comment_id !== deleted)
        .map((comment, index) => (
          <li
            class="p-5 m-5 bg-gray-100 rounded-xl shadow-lg"
            key={comment.comment_id}
          >
            {avatars[index] && (
              <div class="flex items-center justify-center ">
                <img
                  class="max-h-14 rounded-full "
                  src={avatars[index].avatar_url}
                  alt=""
                />
              </div>
            )}
            <h2>{comment.author ? comment.author : user.username}:</h2>
            <p>{comment.body}</p>
            <p>
              {formatDateTime(comment.created_at) !== "Invalid Date"
                ? formatDateTime(comment.created_at)
                : ""}
            </p>
            {user.username === comment.author ? (
              <button
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                value={comment.comment_id}
                onClick={(event) => {
                  handleClick(event, comment.comment_id);
                }}
              >
                Delete
              </button>
            ) : (
              ""
            )}
            <p>votes: {comment.votes}</p>
          </li>
        ))}
    </ol>
  );
};

export default Comments;
