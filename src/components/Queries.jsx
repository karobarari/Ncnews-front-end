import axios from "axios";
import { useEffect, useState } from "react";

const Querybar = ({ setChosenTopic }) => {
  const [topics, setTopics] = useState([]); //for map

  const handleQueryChange = (event) => {
    
      setChosenTopic(event.target.value);
    
  };
  useEffect(() => {
    axios.get("https://ncnews-yzwd.onrender.com/api/topics").then((res) => {
      setTopics(res.data.topics);
    });
  }, [topics]);

  return (
    <div className="query-container">
      <select name="select2" id="select2" onChange={handleQueryChange}>
        <option value="alltopics">all topics</option>
        {topics.map((topic) => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug} ||-
              {topic.description} :) -||
            </option>
          );
        })}
      </select>
      <select name="select3" id="select3"></select>
    </div>
  );
};
export default Querybar;
