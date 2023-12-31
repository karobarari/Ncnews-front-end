import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Userset";
import { getUsers } from "../LoginPage/costumHooks";
import { getAlltopics } from "../Home/queryAxios";
import postArticle from "./PostArticleHoohs";
import { Link } from "react-router-dom";

const PostArticle = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [articleTopic, setArticleTopic] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [newArticle, setnewArticle] = useState({
    atricleTitle: title,
    articleTopic: articleTopic,
    articleAuthor: user.username,
    articleBody: body,
    articleImage: image,
  });
  const [postNewArticleError, setPostNewArticleError] = useState("");

  const [NewArticleSuccessfull, setNewArticleSuccessfull] = useState("");

  useEffect(() => {
    getAlltopics().then((res) => {
      setTopics(res);
    });
  }, []);
  useEffect(() => {
    setnewArticle({
      atricleTitle: title,
      articleTopic: articleTopic,
      articleAuthor: user.username,
      articleBody: body,
      articleImage: image,
    });
  }, [title, articleTopic, body, image]);
  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleTopicChange = (e) => {
    if (e.target.value !== "") {
      setArticleTopic(e.target.value);
    }
  };
  const handleBodyChange = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const preventWhiteSpace = /\S/g; //pervents from posting only white space.
    const imageUrlRegex =
      /^https:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;

    if (
      imageUrlRegex.test(image) &&
      preventWhiteSpace.test(title) &&
      preventWhiteSpace.test(body)
    ) {
      postArticle(newArticle).then(() => {
        setNewArticleSuccessfull("new article created!");
      });
    } else {
      setPostNewArticleError(
        "Article has not been posted, please check the requiered inputs and try again"
      );
    }
  };
  if (NewArticleSuccessfull) {
    return (
      <p>
        {NewArticleSuccessfull}{" "}
        <Link class="underline" to={"/articles"}>
          Go back to Home
        </Link>
      </p>
    );
  }
  return (
    <div class="flex items-center justify-center py-10 shadow-md rounded-lg mt-10 bg-gray-200 border border-orange-200">
      <form
        class="bg-white rounded-lg p-5 shadow-2xl"
        onSubmit={handlePostSubmit}
      >
        <label>
          Title:
          <input
            onChange={handleTitleChange}
            value={title}
            type="text"
            class="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
          />
        </label>
        <label>
          Topic:
          <select
            onChange={handleTopicChange}
            class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="topic"
          >
            <option value="">topic</option>
            {topics.map((topic) => {
              return <option key={topic.slug}>{topic.slug}</option>;
            })}
          </select>
        </label>
        <label class="">
          Body:
          <textarea
            value={body}
            onChange={handleBodyChange}
            class="shadow-md w-full px-0 text-sm text-gray-900  border-2 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400
bg-gray-100 block mb-10"
            type="text"
            placeholder=" Article body"
            required
          />
        </label>
        <label>
          Image:
          <input
            value={image}
            onChange={handleImageChange}
            class="mb-5 bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Image url"
          />
        </label>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          post
        </button>
        <p class="">
          you can copy the link of your Article Image from{" "}
          {
            <a href="https://www.freeimages.com/" class="underline ">
              here
            </a>
          }
        </p>
      </form>
    </div>
  );
};
export default PostArticle;
