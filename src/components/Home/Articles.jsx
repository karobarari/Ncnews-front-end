import { useNavigate } from "react-router-dom";

const Articles = ({ avatars, articles }) => {
  const navigate = useNavigate();

  const handleClick = (event, articleId) => {
    event.preventDefault();
    navigate(`/Articles/${articleId}`);
  };

  return (
    <>
      <ul>
        {articles.map((article, index) => (
          <li
            value={article.article_id}
            key={article.article_id}
            onClick={(event) => handleClick(event, article.article_id)}
          >
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="" />
            <h3>author: {article.author}</h3>
            {avatars[index] && (
              <img
                className="avatar-img"
                src={avatars[index].avatar_url}
                alt=""
              />
            )}
            <p>Comments: {article.comment_count}</p>
            <p>votes: {article.votes}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Articles;
