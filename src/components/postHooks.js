import axios from "axios";
import { useEffect, useState } from "react";

export const postComment = (articleId, Username, CmBody) => {
  return axios
    .post(
      `https://ncnews-yzwd.onrender.com/api/articles/${articleId}/comments`,
      {
        username: Username,
        body: CmBody,
      }
    )
    .then((res) => {
      return res.data.postedCm;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      throw error;
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
  return axios
    .delete(`https://ncnews-yzwd.onrender.com/api/comments/${comment_id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const imageGenerator = (array) => {
  const usernames = array.map((data) => data.author);
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/users`)
    .then((response) => {
      const users = response.data.users;

      const avatarUrls = usernames.map((username) => {
        const user = users.find((user) => user.username === username);
        return user
          ? { username: user.username, avatar_url: user.avatar_url }
          : null;
      });

      return avatarUrls;
    })
    .catch((err) => {
      console.error(err);
      throw err; // Rethrow the error to handle it at the caller level if needed
    });
};
