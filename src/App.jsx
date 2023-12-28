import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import DisplaySection from "./components/Home/DisplaySection";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import LoginPage from "./components/LoginPage/LoginPage";
import { ErrorPage } from "./components/ErrorPage";
import PostArticle from "./components/PostArticle/PostArticle";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/articles" element={<DisplaySection />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
        <Route path="/articlePost" element={<PostArticle />} />
      </Routes>
    </>
  );
}

export default App;
