import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import DisplaySection from "./components/Home/DisplaySection";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/articles" element={<DisplaySection />} />
        <Route path="/ArticleCard/:article_id" element={<ArticleCard />} />
      </Routes>
    </>
  );
}

export default App;
