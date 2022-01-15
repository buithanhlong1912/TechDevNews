import React from "react";
import { useNavigate } from "react-router-dom";
import { editArticlesById, increasViewByArticleId } from "../../apis/service";
import { useGlobalContext } from "../../context/GlobalContext";
import { ArticleModal } from "../../interface";

interface ICom3 {
  listByView: ArticleModal[] | undefined;
  listByLike: ArticleModal[] | undefined;
}
export default function HomePageCom3() {
  const { listByLike, listByView } = useGlobalContext();
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
    navigate(`/category/${id}`);
  };

  const handleDetailComponent = async (id: number) => {
    await increasViewByArticleId(id);
    navigate(`/article/${id}`)
  };

  return (
    <div className="com3 py-5">
      <div className="container ">
        <div className="row">
          <div className="col-12 col-md-6 px-5">
            <p className="text-center logoCom3">
              <i className="fab fa-hotjar"></i>
            </p>
            <p className="h3 text-center">Trending</p>
            <p className=" text-center pb-3">The Most Like</p>
            {listByLike && (
              <div>
                <div>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDetailComponent(listByLike[0].id)}
                    className="rounded imgCoverCom3"
                    src={listByLike[0].cover}
                    alt="image"
                  />
                </div>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDetailComponent(listByLike[0].id)}
                  className="h5 pt-3"
                >
                  {listByLike[0].title}
                </p>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCategory(listByLike[0].categoryId)}
                  className="categoryCom3"
                >
                  {getCategory(listByLike[0].categoryId)}{" "}
                </span>
                <span>
                  {listByLike[0].like} <i className="far fa-heart"></i>
                </span>
                <p className="py-3">{listByLike[0].description}</p>
                <hr></hr>
                <div className="row">
                  <div className="col-12 text-center col-lg-2">
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByLike[1].id)}
                      className="rounded imgCoverCom3member"
                      src={listByLike[1].cover}
                      alt="image"
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0 col-lg-10">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByLike[1].id)}
                      className="h5"
                    >
                      {listByLike[1].title}
                    </p>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategory(listByLike[1].categoryId)}
                      className="categoryCom3"
                    >
                      {getCategory(listByLike[1].categoryId)}{" "}
                    </span>
                    <span>
                      {listByLike[1].like} <i className="far fa-heart"></i>
                    </span>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-12 text-center col-lg-2">
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByLike[2].id)}
                      className="rounded imgCoverCom3member"
                      src={listByLike[2].cover}
                      alt="image"
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0 col-lg-10">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByLike[2].id)}
                      className="h5"
                    >
                      {listByLike[2].title}
                    </p>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategory(listByLike[2].categoryId)}
                      className="categoryCom3"
                    >
                      {getCategory(listByLike[2].categoryId)}{" "}
                    </span>
                    <span>
                      {listByLike[2].like} <i className="far fa-heart"></i>
                    </span>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-12 text-center col-lg-2">
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByLike[3].id)}
                      className="rounded imgCoverCom3member"
                      src={listByLike[3].cover}
                      alt="image"
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0 col-lg-10">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByLike[3].id)}
                      className="h5"
                    >
                      {listByLike[3].title}
                    </p>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategory(listByLike[3].categoryId)}
                      className="categoryCom3"
                    >
                      {getCategory(listByLike[3].categoryId)}{" "}
                    </span>
                    <span>
                      {listByLike[3].like} <i className="far fa-heart"></i>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 px-5">
            <p className="text-center logoCom3">
              <i className="far fa-bookmark"></i>
            </p>
            <p className="h3 text-center">Popular</p>
            <p className=" text-center pb-3">The Most View</p>
            {listByView && (
              <div>
                <div>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDetailComponent(listByView[0].id)}
                    className="rounded imgCoverCom3"
                    src={listByView[0].cover}
                    alt="image"
                  />
                </div>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDetailComponent(listByView[0].id)}
                  className="h5 pt-3"
                >
                  {listByView[0].title}
                </p>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCategory(listByView[0].categoryId)}
                  className="categoryCom3"
                >
                  {getCategory(listByView[0].categoryId)}{" "}
                </span>
                <span>
                  {listByView[0].view} <i className="fas fa-eye"></i>
                </span>
                <p className="py-3">{listByView[0].description}</p>
                <hr />
                <div className="row">
                  <div className="col-12 text-center col-lg-2">
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByView[1].id)}
                      className="rounded imgCoverCom3member"
                      src={listByView[1].cover}
                      alt="image"
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0 col-lg-10">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByView[1].id)}
                      className="h5"
                    >
                      {listByView[1].title}
                    </p>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategory(listByView[1].categoryId)}
                      className="categoryCom3"
                    >
                      {getCategory(listByView[1].categoryId)}{" "}
                    </span>
                    <span>
                      {listByView[1].view} <i className="fas fa-eye"></i>
                    </span>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-12 text-center col-lg-2">
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByView[2].id)}
                      className="rounded imgCoverCom3member"
                      src={listByView[2].cover}
                      alt="image"
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0 col-lg-10">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByView[2].id)}
                      className="h5"
                    >
                      {listByView[2].title}
                    </p>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategory(listByView[2].categoryId)}
                      className="categoryCom3"
                    >
                      {getCategory(listByView[2].categoryId)}{" "}
                    </span>
                    <span>
                      {listByView[2].view} <i className="fas fa-eye"></i>
                    </span>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-12 text-center col-lg-2">
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByView[3].id)}
                      className="rounded imgCoverCom3member"
                      src={listByView[3].cover}
                      alt="image"
                    />
                  </div>
                  <div className="col-12 mt-3 mt-lg-0 col-lg-10">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailComponent(listByView[3].id)}
                      className="h5"
                    >
                      {listByView[3].title}
                    </p>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategory(listByView[3].categoryId)}
                      className="categoryCom3"
                    >
                      {getCategory(listByView[3].categoryId)}{" "}
                    </span>
                    <span>
                      {listByView[3].view} <i className="fas fa-eye"></i>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
