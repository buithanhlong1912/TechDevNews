import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { getArticles, getArticlesByAuthorId } from "../../../../apis/service";
import Auth from "../../../../guard/AuthGuard";
import AuthGuard from "../../../../guard/AuthGuard";
import { ArticleModal } from "../../../../interface";
import ArticleForm from "../../handle-news/ArticleForm";
import AdminHeader from "../admin-header/AdminHeader";
import ArticleList from "../list-article/ArticleList";
import AdminProfile from "../profile/AdminProfile";

export default function AdminDashboard() {
  const [listArticle, setListArticle] = useState<ArticleModal[]>([]);
  const [load, setLoad] = useState(true);

  const getArticleFromApis = async () => {
    const listArticleFromApis: ArticleModal[] = await getArticles();
    setListArticle(listArticleFromApis);
  };

  useEffect(() => {
    getArticleFromApis();
    return () => {
      getArticleFromApis();
    };
  }, [load]);

  const _handleLoad = () => {
    setLoad((load) => !load);
  };
  return (
    <Auth orRedirectTo="/admin/login">
      <Container>
        <AdminHeader />
        <Container className="mt-2">
          <Routes>
            <Route path="/" element={<Navigate to={"/admin/manage-article"} />} />
            <Route path="/manage-article" element={<ArticleList listArticle={listArticle} />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/create-new" element={<ArticleForm type={'create'} reLoad={_handleLoad} />} />
            <Route path="/edit-new/:id" element={<ArticleForm type={'edit'} reLoad={_handleLoad} />} />
          </Routes>
        </Container>
      </Container>
    </Auth>
  );
}
