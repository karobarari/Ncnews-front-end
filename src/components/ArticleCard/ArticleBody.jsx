import { formatDateTime } from "../formatDateTime";

const ArticleBody = ({ fetchedArticle }) => {
 
  return (
    <div className="single-article">
      <h3>author: {fetchedArticle.author}</h3>
      <h2>{fetchedArticle.title}</h2>
      <img src={fetchedArticle.article_img_url} alt="" />
      <h3>topic {fetchedArticle.topic}</h3>
      <p>wroted at {formatDateTime(fetchedArticle.created_at)}</p>
      <p>{fetchedArticle.body}</p>
      <button>commets: {fetchedArticle.comment_count}</button>
    </div>
  );
};

export default ArticleBody;
