const PostArticle = () => {
  return (
    <div>
      <form action="post">
        <input class="bg-gray-100" type="text" placeholder="Title" />
        <select name="topic">
          <option value="">topic</option>
        </select>
        <input class="bg-gray-100" type="text" placeholder="Article body" />
        <input type="text" />
      </form>
    </div>
  );
};
export default PostArticle;
