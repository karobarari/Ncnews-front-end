import Articles from "./Articles";
import Querybar from "./Queries";
import { useEffect, useState } from "react";
import { getQueries } from "./queryAxios";
import { useSearchParams } from "react-router-dom";

const DisplaySection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();
  const order = searchParams.get("order");
  const sortby = searchParams.get("sortby");
  const topic = searchParams.get("topic");
console.log(topic,order,sortby);
  useEffect(() => {
    setLoading(true);
    getQueries(topic, order, sortby)
      .then((response) => {
        setArticles(response);
      })
      .finally(() => setLoading(false));
      return ()=>{}
  }, [order, sortby, topic]);

  return (
    <div className="home-display-section">
      <Querybar loading={loading}/>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="articles-list">
          <Articles articles={articles} />
        </div>
      )}
    </div>
  );
};

export default DisplaySection;
