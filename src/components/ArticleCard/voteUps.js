import axios from "axios";

export const voteUp = (articleId) => {
  return axios
    .patch(`https://ncnews-yzwd.onrender.com/api/articles/${articleId}`, {
      inc_votes: 1,
    })
    .then((res) => {
      return res.data.updatedArticle.votes;
    })
    .catch((err) => {
      setVotesCount((currentCount) => currentCount - 1);
      setErr(
        "Something went wrong, refresh the page and please try again."
      );
    });
};
export const voteDown = (articleId) => {
  return axios
    .patch(`https://ncnews-yzwd.onrender.com/api/articles/${articleId}`, {
      inc_votes: -1,
    })
    .then((res) => {
      return res.data.updatedArticle.votes;
    })
    .catch((err) => {
      setVotesCount((currentCount) => currentCount + 1);
      setErr("Something went wrong, refresh the page and please try again.");
    });
};
