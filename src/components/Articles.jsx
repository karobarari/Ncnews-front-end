const Articles = ({ articles }) => {

    const handleClick =()=>{

    }
  return (
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.article_id} onClick={handleClick}>
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="" />
            <h3>author: {article.author}</h3>
            <p>Comments: {article.comment_count}</p>
            <p>votes: {article.votes}</p>
          </li>
        );
      })}
    </ul>
  );
};
export default Articles;
