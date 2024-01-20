import axios from "axios";

const deleteArticle = (article_id) => {
  return axios
    .delete(`https://ncnews-yzwd.onrender.com/api/articles/${article_id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
export default deleteArticle