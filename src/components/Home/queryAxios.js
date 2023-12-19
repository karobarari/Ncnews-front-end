import axios from "axios";

const instance = axios.create({
  baseURL: "https://ncnews-yzwd.onrender.com/api",
});

export const getQueries = (
  chosenTopic,
  order = "ASC",
  sortby = "created_at"
) => {
  if (chosenTopic || order || sortby) {
    return instance
      .get(`/articles?topic=${chosenTopic}&sort_by=${sortby}&order=${order}`)
      .then((res) => {
        return res.data.articles;
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        throw error;
      });
  } else {
    return instance
      .get(`/articles`)
      .then((res) => {
        return res.data.articles;
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        throw error;
      });
  }
};
export const getAlltopics = () => {
  return instance
    .get("/topics")
    .then((res) => {
      return res.data.topics;
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      throw error;
    });
};
