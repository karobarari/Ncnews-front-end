import axios from "axios";

export const VoteUp =()=>{
  axios.patch(`https://ncnews-yzwd.onrender.com/api/articles/1`, {
    inc_votes: 1,
  }).then((res)=>{
    console.log(res)
  })
}
export const VoteDown = () => {
  axios
    .patch(`https://ncnews-yzwd.onrender.com/api/articles/1`, {
      inc_votes: -1,
    })
    .then((res) => {
      console.log(res);
    });
};
