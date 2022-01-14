import React from "react";
import { Route, Routes } from "react-router-dom";
import ArticleDetails from "../components/ArticleDetails/ArticleDetails";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import HomePageComponent from "../components/reader/homePageComponent";
import NewsByCategoryCom from "../components/reader/newsByCategoryCom";
import ResultComponent from "../components/reader/ResultComponent";

export default function Home() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        {/* <Route path="/" element={<HomePageComponent />} /> */}
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/article/search/:title" element={<ResultComponent />} />
        <Route path="/category/:id" element={<NewsByCategoryCom />} />
      </Routes>
      <Footer />
    </div>
  );
}
