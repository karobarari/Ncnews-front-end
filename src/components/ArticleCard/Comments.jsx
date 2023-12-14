import { useContext } from "react";
import { formatDateTime } from "../formatDateTime";
import { UserContext } from "../Userset";

const Comments = ({ newComment, fetchedComments }) => {
  const {user}=useContext(UserContext)
  if (newComment !== null) {
    fetchedComments.unshift(newComment);
  }
  return (
    <ol>
      {fetchedComments.map(
        (comment) =>
          comment.body && (
            <li key={comment.comment_id}>
              <p>{comment.author ? comment.author : user.username}:</p>
              <p>{comment.body}</p>

              <p>
                {formatDateTime(comment.created_at) !== "Invalid Date"
                  ? formatDateTime(comment.created_at)
                  : ""}
              </p>

              <p>{comment.votes}</p>
            </li>
          )
      )}
    </ol>
  );
};
export default Comments;
