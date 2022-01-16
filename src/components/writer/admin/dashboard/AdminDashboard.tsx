import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { getArticlesPage } from "../../../../apis/service";
import Auth from "../../../../guard/AuthGuard";
import { ArticleModal, IAdmin, ListArticleAdmin } from "../../../../interface";
import { getAdminFromLocal } from "../../../../utilities";
import ArticleForm from "../../handle-news/ArticleForm";
import AdminHeader from "../admin-header/AdminHeader";
import ArticleList from "../list-article/ArticleList";
import AdminProfile from "../profile/AdminProfile";

export default function AdminDashboard() {
  const [listArticle, setListArticle] = useState<ListArticleAdmin>({ next: false, listArticle: [] });
  const [load, setLoad] = useState(true);
  const [pageIndex, setpageIndex] = useState(1);
  const [searchKey, setSearchKey] = useState('');

  const nextPage = () => {
    setpageIndex((pageIndex) => pageIndex + 1)
  }

  const prePage = () => {
    setpageIndex((pageIndex) => pageIndex - 1)
  }

  const admin: IAdmin = getAdminFromLocal();

  const getArticleFromApis = async () => {
    const listArticleFromApis = await getArticlesPage(pageIndex, searchKey) as ListArticleAdmin;
    setListArticle(listArticleFromApis);
  };

  useEffect(() => {
    getArticleFromApis();
  }, [load, pageIndex, searchKey]);

  const _handleLoad = () => {
    setLoad((load) => !load);
  };


  const actionValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    setpageIndex(1);
  }

  return (
    <>
      <div className="mt-2">
        <Container>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={"/admin/manage-article"} />}
            />
            <Route
              path="/manage-article"
              element={
                <ArticleList
                  listArticle={listArticle}
                  reLoad={_handleLoad}
                  nextPage={nextPage}
                  prePage={prePage}
                  pageIndex={pageIndex}
                  actionValueChange={actionValueChange} />
              }
            />
            <Route
              path="/profile"
              element={<AdminProfile adminAccount={admin} />}
            />
            <Route
              path="/create-new"
              element={<ArticleForm type={"create"} reLoad={_handleLoad} />}
            />
            <Route
              path="/edit-new/:id"
              element={<ArticleForm type={"edit"} reLoad={_handleLoad} />}
            />
          </Routes>
        </Container>
      </div>
    </>
    // </Auth>
  );
}
