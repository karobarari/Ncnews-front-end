import { formatDateTime } from "../formatDateTime";

const Comments = ({ fetchedComments }) => {
  return (
    <ol>
      {fetchedComments.map((comment) => (
        <li key={comment.comment_id}>
          <p>Author: {comment.author}</p>
          <p>Body: {comment.body}</p>

          <p>Created At: {formatDateTime(comment.created_at)}</p>

          <p>Votes: {comment.votes}</p>
        </li>
      ))}
    </ol>
  );
};
export default Comments;
