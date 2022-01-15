import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Pagination,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteArticlesById } from "../../../../apis/service";
import { ArticleModal, ListArticleAdmin } from "../../../../interface";
import style from "./style.module.css";

interface Props {
  listArticle: ListArticleAdmin;
  reLoad: () => void;
  nextPage: () => void;
  prePage: () => void;
  pageIndex: number;
}

export default function ArticleList({
  listArticle = { next: false, listArticle: [] },
  reLoad,
  nextPage,
  prePage,
  pageIndex,
}: Props): ReactElement {
  const navigate = useNavigate();
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure to delete this article") === true) {
      await deleteArticlesById(id);
      reLoad();
    }
  };

  return (
    <div className="">
      <h2 className="text-center">List Article</h2>
      <div className="list-article">
        {listArticle.listArticle.length !== 0 ? (
          <Table responsive>
            <thead>
              <tr className="text-center">
                <th className="col-1">#</th>
                <th>Title</th>
                <th>Date Created</th>
                <th className="col-1">Action</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {listArticle.listArticle.map((article, i) => (
                <tr key={article.id} className={style.tableRow}>
                  <td className="text-center">{pageIndex * 10 - 10 + i}</td>
                  <td className={``}>{article.title}</td>
                  <td className="text-center ">
                    {moment(article.dateCreate).format("DD/MM/YYYY, h:mm:ss a")}
                  </td>
                  <td className="">
                    <div className="d-flex justify-content-between">
                      <a
                        onClick={() => {
                          navigate(`/admin/edit-new/${article.id}`);
                        }}
                        className={`text-primary ${style.pointer}`}
                      >
                        <i className="far fa-edit"></i>
                      </a>
                      <a
                        onClick={() => {
                          handleDelete(article.id);
                        }}
                        className={`text-danger ${style.pointer}`}
                      >
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div></div>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <Pagination>
            <Pagination.Prev disabled={pageIndex === 1} onClick={prePage} />
            <Pagination.Next
              disabled={!listArticle.next as boolean}
              onClick={nextPage}
            />
          </Pagination>
          {/* <button
            onClick={() => {
              navigate("/admin/create-new");
            }}
            className={`${style.add}`}
          >
            +
          </button> */}
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id={`tooltip-left`}>Add new acticle</Tooltip>}
          >
            <button
              onClick={() => {
                navigate("/admin/create-new");
              }}
              className={`${style.add}`}
            >
              +
            </button>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}
