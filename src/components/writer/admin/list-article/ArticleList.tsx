import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteArticlesById } from "../../../../apis/service";
import { ArticleModal } from "../../../../interface";
import style from "./style.module.css";

interface Props {
  listArticle: ArticleModal[];
  reLoad: () => void;
}

export default function ArticleList({
  listArticle = [],
  reLoad,
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
        {listArticle.length !== 0 ? (
          <Table responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Title</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {listArticle.map((article, i) => (
                <tr key={article.id} className={style.tableRow}>
                  <td className="text-center">{i + 1}</td>
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
      </div>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip id={`tooltip-left`}>Add new acticle</Tooltip>}
      >
        <button
          onClick={() => {
            navigate("/admin/create-new");
          }}
          className={`position-absolute ${style.add}`}
        >
          +
        </button>
      </OverlayTrigger>
    </div>
  );
}
