import axios from "axios";

export const getQueries = (chosenTopic, order, sortby) => {
  return axios
    .get(
      `https://ncnews-yzwd.onrender.com/api/articles?topic=${chosenTopic}&sort_by=${sortby}&order=${order}`
    )
    .then((res) => {
      return res.data.articles;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
};
export const getAlltopics = () => {
  return axios
    .get("https://ncnews-yzwd.onrender.com/api/topics")
    .then((res) => {
      return res.data.topics;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
};
