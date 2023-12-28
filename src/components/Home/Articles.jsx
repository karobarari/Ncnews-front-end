import { useNavigate } from "react-router-dom";
import { imageGenerator } from "../LoginPage/costumHooks";
import { useEffect, useState } from "react";

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
    <div class="flex items-center justify-center">
      <ul>
        {articles.map((article, index) => (
          <li
            class="bg-gradient-to-r
            from-blue-500
            via-red-500
            to-yellow-500
            rounded-lg
            p-2
            mb-2"
            value={article.article_id}
            key={article.article_id}
            onClick={(event) => handleClick(event, article.article_id)}
          >
            <div class="shadow-md text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg px-5 py-2.5 text-center">
              <h2 class="p-3 border-2 rounded-md mb-3 bg-gray-100 ">
                {article.title}
              </h2>
              <div class="flex items-center justify-center">
                <img
                  class="rounded-md"
                  src={article.article_img_url}
                  alt="article-image"
                />
              </div>
              <div class="">
                <h3 class="p-2">author: {article.author}</h3>
                {avatars[index] && (
                  <div class="flex items-center justify-center">
                    <img
                      class="max-h-12 rounded-full"
                      src={avatars[index].avatar_url}
                      alt=""
                    />{" "}
                  </div>
                )}

                <p>Comments: {article.comment_count}</p>
                <p>votes: {article.votes}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
