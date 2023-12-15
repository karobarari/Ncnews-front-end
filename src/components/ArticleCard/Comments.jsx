import { useContext, useEffect, useState } from "react";
import { formatDateTime } from "../formatDateTime";
import { UserContext } from "../Userset";
import { deleteComment, imageGenerator } from "../postHooks";

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
    <ol>
      {fetchedComments
        .filter((comment) => comment.body && comment.comment_id !== deleted)
        .map((comment, index) => (
          <li key={comment.comment_id}>
            {avatars[index] && (
              <img
                className="avatar-img"
                src={avatars[index].avatar_url}
                alt=""
              />
            )}
            <p>{comment.author ? comment.author : user.username}:</p>
            <p>{comment.body}</p>
            <p>
              {formatDateTime(comment.created_at) !== "Invalid Date"
                ? formatDateTime(comment.created_at)
                : ""}
            </p>
            {user.username === comment.author ? (
              <button
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
            <p>{comment.votes}</p>
          </li>
        ))}
    </ol>
  );
};

export default Comments;
