import axios from "axios";

const postArticle = (newArticle) => {
  const {
    articleAuthor,
    articleBody,
    articleImage,
    atricleTitle,
    articleTopic,
  } = newArticle;
console.log(articleAuthor,
    articleBody,
    articleImage,
    atricleTitle,
    articleTopic,)
  return axios
    .post("https://ncnews-yzwd.onrender.com/api/articles", {
      title: atricleTitle,
      topic: articleTopic,
      author: articleAuthor,
      body: articleBody,
      article_img_url: articleImage,
    })
    .then((res) => {
      return res.data.postedArticle;
    })
    .catch((err) => {
      throw err;
    });
};
export default postArticle;
