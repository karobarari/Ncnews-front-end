const ArticleBody = ({ fetchedArticle }) => {
  const formattedDate = new Date(
    fetchedArticle.created_at
  ).toLocaleDateString();

  return (
    <div className="single-article">
      <h3>author: {fetchedArticle.author}</h3>
      <h2>{fetchedArticle.title}</h2>
      <img src={fetchedArticle.article_img_url} alt="" />
      <h3>topic {fetchedArticle.topic}</h3>
      <p>wroted at {formattedDate}</p>
      <p>{fetchedArticle.body}</p>
      <button>commets: {fetchedArticle.comment_count}</button>
    </div>
  );
};

export default ArticleBody;
