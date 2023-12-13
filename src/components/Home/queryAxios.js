import axios from "axios";

export const getQueries = (chosenTopic) => {
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/articles?topic=${chosenTopic}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
};

export const getAllArticles = () => {
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/articles`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
};
export const getAlltopics = () => {
  return axios
    .get("https://ncnews-yzwd.onrender.com/api/topics")
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
};
