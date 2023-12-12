import axios from "axios";
const getQueries = (chosenTopic) => {
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/articles?topic=${chosenTopic}`)
    .then((res) => {
      return res;
    });
};
export default getQueries;
