import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import DisplaySection from "./components/Home/DisplaySection";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import LoginPage from "./components/LoginPage";
import {ErrorPage} from "./components/ErrorPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/articles" element={<DisplaySection />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
      </Routes>
    </>
  );
}

export default App;
