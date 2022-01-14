import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteArticlesById } from "../../../../apis/service";
import { ArticleModal } from "../../../../interface";

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
    <>
      <div className="list-article">
        {listArticle.length !== 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Title</th>
                <th>Date Created</th>
                <th className="col-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {listArticle.map((article, i) => (
                <tr key={article.id}>
                  <td>{i+1}</td>
                  <td>{article.title}</td>
                  <td>
                    {moment(article.dateCreate).format("DD/MM/YYYY, h:mm:ss a")}
                  </td>
                  <td className="d-flex justify-content-between">
                    <Button
                      onClick={() => {
                        navigate(`/admin/edit-new/${article.id}`);
                      }}
                      variant="success"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(article.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div></div>
        )}
      </div>
      <div className="my-2">
        <Button
          onClick={() => {
            navigate("/admin/create-new");
          }}
        >
          Create new
        </Button>
      </div>
    </>
  );
}
