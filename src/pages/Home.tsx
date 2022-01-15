import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  getArticleByCategoryId,
  getTop4Article,
  getTop4ByLike,
  getTop4ByView,
} from "../apis/service";
import ArticleDetails from "../components/ArticleDetails/ArticleDetails";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import HomePageComponent from "../components/reader/HomePageComponent";
import NewsByCategoryCom from "../components/reader/NewsByCategoryCom"; 
import ResultComponent from "../components/reader/ResultComponent";
import { CreateGlobalContext } from "../context/GlobalContext";
import { ArticleModal } from "../interface";

export default function Home() {
  const [listTop4, setListTop4] = useState<ArticleModal[]>();
  const [listByCategory, setListByCategory] = useState<ArticleModal[]>();
  const [listByView, setListByView] = useState<ArticleModal[]>();
  const [listByLike, setListByLike] = useState<ArticleModal[]>();
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    getTop4Article().then((data) => setListTop4(data));
    getArticleByCategoryId(2).then((data) => setListByCategory(data));
    getTop4ByView().then((data) => setListByView(data));
    getTop4ByLike().then((data) => setListByLike(data));
  }, []);

  const getCategory = (id: number) => {
    switch (id) {
      case 1:
        return "Lập trình";
      case 2:
        return "UI/UX";
      case 3:
        return "Block Chain";
      case 4:
        return "Mobile";
      case 5:
        return "Internet";
      default:
        return "";
    }
  };

  return (
    <CreateGlobalContext.Provider
      value={{
        listTop4,
        setListTop4,
        listByCategory,
        setListByCategory,
        listByView,
        setListByView,
        listByLike,
        setListByLike,
        getCategory,
        pageIndex,
        setPageIndex,
      }}
    >
      <div>
        <Header />
        <div style={{ minHeight: "90vh" }}>
          <Routes>
            <Route path="/" element={<HomePageComponent />} />
            {/* <Route path="/" element={<HomePageComponent />} /> */}
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/category/:id" element={<NewsByCategoryCom />} />
            <Route
              path="/article/search/:title"
              element={<ResultComponent />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </CreateGlobalContext.Provider>
  );
}
