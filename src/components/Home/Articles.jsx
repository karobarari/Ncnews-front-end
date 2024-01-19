import { useNavigate } from "react-router-dom";
import { imageGenerator } from "../LoginPage/costumHooks";
import { useEffect, useState } from "react";
import { formatDateTime } from "../LoginPage/formatDateTime";

const Articles = ({ articles }) => {
  const [avatars, setAvatars] = useState([]);

  const navigate = useNavigate();

  const handleClick = (event, articleId) => {
    event.preventDefault();
    navigate(`/articles/${articleId}`);
  };
  useEffect(() => {
    imageGenerator(articles).then((res) => {
      setAvatars(res);
    });
  }, [articles]);

  return (
    <div class=" flex-wrap bg-gradient-to-r from-blue-100 via-red-100 to-yellow-100 rounded-lg">
      <ul class="flex flex-wrap justify-center">
        {articles.map((article, index) => (
          <li
            class="flex justify-center p-5 m-8 w-[300px] text-gray-900 bg-white shadow-xl font-medium rounded-lg text-center border-2 
           "
            value={article.article_id}
            key={article.article_id}
            onClick={(event) => handleClick(event, article.article_id)}
          >
            <div class="grid justify-items-center  font-medium rounded-lg text-center">
              <img
                class="max-h-[150px] w-full shadow-md rounded-xl "
                src={article.article_img_url}
                alt="Article image"
              />
              <h3 class="text-[12px] mt-2">
                {formatDateTime(article.created_at)}
              </h3>
              <span class="flex m-3">
                {avatars[index] && (
                  <img
                    class="max-h-7 rounded-full mr-2"
                    src={avatars[index].avatar_url}
                    alt=""
                  />
                )}
                <h3 class="text-sm">{article.author}</h3>
              </span>
              <h1 class="text-xl pb-3">{article.title}</h1>
              <span class="flex-row p-5 rounded-lg shadow-md mb-5 ">
                <h2 class="overflow-hidden max-h-[100px]">{article.body}</h2>
                <p>...</p>
              </span>{" "}
              <p class="mx-2 text-sm shadow-md p-2 rounded-xl">
                topic: {article.topic}
              </p>
              <span class="flex m-3 bg-slate-200 shadow-xl rounded-xl">
                <p class="mx-2 text-sm"> votes: {article.votes}</p>
                <p class="mx-2 text-sm"> comments: {article.comment_count}</p>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;

