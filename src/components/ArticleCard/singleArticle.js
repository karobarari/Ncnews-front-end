import axios from "axios";
export const getArticleId = (article_id) => {
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/articles/${article_id}`)
    .then((res) => {
      return res.data.article;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      throw error; 
    });
};
export const getAllComments = (articleId) => {
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/articles/${articleId}/comments`)
    .then((res) => {
      return res.data.comment;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      throw error; 
    });
};
