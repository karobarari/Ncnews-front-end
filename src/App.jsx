import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import DisplaySection from "./components/DisplaySection";
import ArticleCard from "./components/ArticleCard";


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
