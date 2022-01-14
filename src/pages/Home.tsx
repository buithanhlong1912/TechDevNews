import React from "react";
import { Route, Routes } from "react-router-dom";
import ArticleDetails from "../components/ArticleDetails/ArticleDetails";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import HomePageComponent from "../components/reader/HomePageComponent";
import NewsByCategoryCom from "../components/reader/NewsByCategoryCom";

export default function Home() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        {/* <Route path="/" element={<HomePageComponent />} /> */}
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/category/:id" element={<NewsByCategoryCom />} />
      </Routes>
      <Footer />
    </div>
  );
}
