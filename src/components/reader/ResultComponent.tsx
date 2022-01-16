import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllAuthor,
  getNewsByCategory,
  getSearch,
  increasViewByArticleId,
} from "../../apis/service";
import { useGlobalContext } from "../../context/GlobalContext";
import { ArticleModal, UserModal } from "../../interface";

export default function ResultComponent() {
  const [listByCategotyID, setListByCategotyID] = useState<ArticleModal[]>([]);
  const [listAuthors, setListAuthors] = useState<UserModal[]>([]);
  const { pageIndex, setPageIndex } = useGlobalContext();
  let navigate = useNavigate();
  const { title = "" } = useParams();

  useEffect(() => {
    getSearch(title, pageIndex).then((data) => setListByCategotyID(data));
  }, [pageIndex, title]);

  useEffect(() => {
    getAllAuthor().then((data) => setListAuthors(data));
  }, [pageIndex]);

  const formatDate = (date: string): string => {
    var myDate = new Date(date);
    var output =
      ("0" + myDate.getDate()).slice(-2) +
      "/" +
      ("0" + (myDate.getMonth() + 1)).slice(-2) +
      "/" +
      myDate.getFullYear();
    return output;
  };

  const getAuthor = useCallback(
    (id: number) => {
      const newList = listAuthors.filter((data) => data.id === id);
      return newList[0]?.info?.name;
    },
    [listAuthors, pageIndex]
  );

  const handleDetailComponent = async (id: number) => {
    await increasViewByArticleId(id);
    navigate(`/article/${id}`);
  };
  return (
    <div>
      <div className="container">
        <p className="h1 text text-left p-5">
          {listByCategotyID.length > 0
            ? `The Search For " ${title} "`
            : `NO Search For " ${title} "`}
        </p>
        <div className="row">
          <div className="col-12 col-lg-8">
            {listByCategotyID.map((data, index) => (
              <div key={index} className="row py-lg-4">
                <div className="col-12 col-lg-4 text-center">
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDetailComponent(data.id)}
                    className="rounded imgNewsByCate"
                    src={data.cover}
                    alt="image"
                  />
                </div>
                <div className="col-12 col-lg-8">
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDetailComponent(data.id)}
                    className="h4 pb-2"
                  >
                    {data.title}
                  </p>
                  <span className="fontAuthor">
                    By{" "}
                    <span style={{ color: "black" }}>
                      {getAuthor(data.authorId)}{" "}
                    </span>{" "}
                  </span>
                  <span className="fontAuthor ml-3">
                    {" "}
                    &nbsp; {formatDate(data.dateCreate)}{" "}
                  </span>
                  <p className="pt-3">{data.description}</p>
                </div>
              </div>
            ))}
            <div className="mt-5">
              <Pagination className="d-flex justify-content-between px-auto">
                <Pagination.Prev
                  disabled={pageIndex === 1}
                  onClick={() => setPageIndex(pageIndex - 1)}
                  className="paginationBtn"
                >
                  Previous
                </Pagination.Prev>
                <Pagination.Next
                  disabled={listByCategotyID.length < 5}
                  onClick={() => setPageIndex(pageIndex + 1)}
                  className="paginationBtn"
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </div>
          </div>
          <div className="col-lg-4 ">
            <img
              className="ads"
              src="https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/271550698_4109672639135219_8325075614311138622_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=9foygCd8KucAX8Outce&_nc_ht=scontent.fhan4-3.fna&oh=00_AT8BQK5Sdp85j5ge6zQOHb6K3vskJY7VxP9azIHsAi-BXQ&oe=61E4B22D"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
