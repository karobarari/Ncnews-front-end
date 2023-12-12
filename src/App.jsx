import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Home/header";
import DisplaySection from "./components/Home/DisplaySection";
import ArticleCard from "./components/ArticleCard/ArticleCard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DisplaySection />} />
        <Route path="/ArticleCard/:article_id" element={<ArticleCard />} />
      </Routes>
    </>
  );
}

export default App;
