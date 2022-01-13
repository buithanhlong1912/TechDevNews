import React, { ReactElement, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArticleModal } from "../../../../interface";

interface Props {
  listArticle: ArticleModal[]
}

export default function ArticleList({ listArticle = [] }: Props): ReactElement {

  const navigate = useNavigate();

  return (
    < >
      <div className="list-article">
        {listArticle.length !== 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date Created</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {listArticle.map((article, i) => (
                <tr key={article.id}>
                  <td>{i}</td>
                  <td>{article.title}</td>
                  <td>{article.dateCreate}</td>
                  <td>
                    <Button onClick={() => { navigate(`/admin/edit-new/${article.id}`) }} variant="success">Edit</Button>
                  </td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>You don't have any article</div>
        )}
      </div>
      <div className="my-2" >
        <Button onClick={() => { navigate('/admin/create-new') }}>Create new</Button>
      </div>
    </>
  );
}
