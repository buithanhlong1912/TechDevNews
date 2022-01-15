import React from "react";
import { useNavigate } from "react-router-dom";
import { increasViewByArticleId } from "../../apis/service";
import { useGlobalContext } from "../../context/GlobalContext";

export default function HomePageCom2() {
  const { listByCategory } = useGlobalContext();

  let navigate = useNavigate();

  const handleDetailComponent = (id: number) => {
    increasViewByArticleId(id);
    navigate(`/article/${id}`);
  };
  return (
    <div className="container my-5 ">
      <p className="h3 text-center">Spotlights</p>
      <p className=" text-center">The Hottest Category</p>
      <div className="row pt-3 ">
        {listByCategory?.map((data, index) => (
          <div
            key={index}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-3 px-4"
          >
            <div>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => handleDetailComponent(data.id)}
                className="rounded imgCoverCom2"
                src={data.cover}
                alt="image"
              />
            </div>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleDetailComponent(data.id)}
              className="h5 pt-3"
            >
              {data.title}
            </p>
            <p>
              {data.like} <i className="far fa-heart"></i>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
