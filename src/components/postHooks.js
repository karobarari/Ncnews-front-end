import axios from "axios";

export const postComment = (articleId, Username, CmBody) => {
  return axios
    .post(`https://ncnews-yzwd.onrender.com/api/articles/1/comments`, {
      username: "tickle122",
      body: "testing comment",
    })
    .then((res) => {
     return; res
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUsers = () => {
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/users`)
    .then((res) => {
      return res.data.users;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteComment = (comment_id) => {
  axios
    .delete(`https://ncnews-yzwd.onrender.com/api/comments/1`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
