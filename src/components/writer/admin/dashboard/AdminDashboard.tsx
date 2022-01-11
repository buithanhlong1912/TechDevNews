import React, {  useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { getArticlesByAuthorId } from "../../../../apis/service";
import { ArticleModal } from "../../../../interface";
import ArticleForm from "../../handle-news/ArticleForm";
import AdminHeader from "../admin-header/AdminHeader";
import ArticleList from "../list-article/ArticleList";
import AdminProfile from "../profile/AdminProfile";
import styles from "./AdminDashboard.module.css";


export default function AdminDashboard() {
  const [listArticle, setListArticle] = useState<ArticleModal[]>([]);

  const getArticleFromApis = async () => {
    const idAuthor = 1;
    const listArticleFromApis: ArticleModal[] = await getArticlesByAuthorId(idAuthor);
    setListArticle(listArticleFromApis);
  };

  useEffect(() => {
    getArticleFromApis()
    return () => {
      getArticleFromApis()
    }
  }, [])

 
  return (
    <Container>
      <AdminHeader />
      <Container className="mt-2">
        <Routes>
          <Route path="/" element={<Navigate to={"/admin/manage-article"} />} />
          <Route path="/manage-article" element={<ArticleList listArticle={listArticle} />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/create-new" element={<ArticleForm type={'create'}/>} />
        </Routes>
      </Container>
    </Container>
  );
}
