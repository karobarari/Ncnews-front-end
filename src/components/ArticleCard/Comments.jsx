import { useContext, useEffect, useState } from "react";
import { formatDateTime } from "../formatDateTime";
import { UserContext } from "../Userset";
import { imageGenerator } from "../postHooks";

const Comments = ({ newComment, fetchedComments }) => {
  const { user } = useContext(UserContext);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    // Use imageGenerator to fetch avatars for unique authors
    imageGenerator(fetchedComments).then((res) => {
      setAvatars(res);
    });
  }, [fetchedComments]);

  if (newComment !== null) {
    fetchedComments.unshift(newComment);
  }

  return (
    <ol>
      {fetchedComments.map(
        (comment, index) =>
          comment.body && (
            <li key={comment.comment_id}>
              {avatars[index] && <img className="avatar-img" src={avatars[index].avatar_url} alt="" />}
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
