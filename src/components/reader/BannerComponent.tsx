import { ArticleModal } from "../../interface";
import "./StyleHomePage.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { editArticlesById, increasViewByArticleId } from "../../apis/service";
interface ITop4 {
  listTop4: ArticleModal[] | undefined;
}

export default function HomePageCom1({ listTop4 }: ITop4) {
  let navigate = useNavigate();
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
    }
  };
  const handleCategory = (id: number) => {
    navigate(`/home/category/${id}`);
  };
  const handleDetailComponent = (id: number) => {
    increasViewByArticleId(id)
    navigate(`/home/article/${id}`);
    
  };

  return (
    <div className="backgroundCom1 text-white">
      <div className="container ">
        {listTop4 && (
          <div className="w-75 py-5 px-5 ">
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleDetailComponent(listTop4[0].id)}
              className="h1"
            >
              {listTop4[0].title}{" "}
            </p>
            <span
              onClick={() => handleCategory(listTop4[0].categoryId)}
              className="btn btn-outline-info"
            >
              {getCategory(listTop4[0].categoryId)}{" "}
            </span>
            <span className="p-3">
              {listTop4[0].like} <i className="far fa-heart"></i>{" "}
            </span>
            <p className="mt-2">{listTop4[0].description} </p>
          </div>
        )}
        {listTop4 && (
          <div className="row px-5 py-4 borderCom1 rounded-top">
            <div className="col-12 col-md-4 px-4">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => handleDetailComponent(listTop4[1].id)}
                className="h5"
              >
                {listTop4[1].title}{" "}
              </p>
              <span
                onClick={() => handleCategory(listTop4[1].categoryId)}
                className="btn btn-outline-info"
              >
                {getCategory(listTop4[1].categoryId)}{" "}
              </span>
              <span className="p-3">
                {listTop4[1].like} <i className="far fa-heart"></i>
              </span>
            </div>
            <div className="col-12 col-md-4 px-4">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => handleDetailComponent(listTop4[2].id)}
                className="h5"
              >
                {listTop4[2].title}{" "}
              </p>
              <span
                onClick={() => handleCategory(listTop4[2].categoryId)}
                className="btn btn-outline-info"
              >
                {getCategory(listTop4[2].categoryId)}{" "}
              </span>
              <span className="p-3">
                {listTop4[2].like} <i className="far fa-heart"></i>
              </span>
            </div>
            <div className="col-12 col-md-4 px-4">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => handleDetailComponent(listTop4[3].id)}
                className="h5"
              >
                {listTop4[3].title}{" "}
              </p>
              <span
                onClick={() => handleCategory(listTop4[3].categoryId)}
                className="btn btn-outline-info"
              >
                {getCategory(listTop4[3].categoryId)}{" "}
              </span>
              <span className="p-3">
                {listTop4[3].like} <i className="far fa-heart"></i>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
