import React, { useEffect, useState } from "react";
import styles from "./ArticleDetails.module.css";
import {
  getArticlesById,
  getAuthors,
  getArticlesByAuthorId,
} from "../../apis/service";
import { ArticleModal } from "../../interface";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

interface IUser {
  id: number;
  userName: string;
  password: string;
  type: string;
  info: {
    name: string;
    age: number;
    about: string;
    avt: string;
    gender: string;
  };
}

function ArticleDetails() {
  const { listTop4, getCategory } = useGlobalContext();
  const [article, setArticle] = useState<ArticleModal>();
  const [users, setUsers] = useState<IUser[]>([]);
  const [author, setAuthor] = useState<IUser>();
  const [arrRelated, setRelated] = useState<ArticleModal[]>([]);

  let navigate = useNavigate();
  const handleDetailComponent = (id: number) => {
    navigate(`/article/${id}`);
  };

  let params = useParams();
  const id = !!params.id ? params.id : "1";

  useEffect(() => {
    getArticlesById(parseInt(id)).then((data) => {
      setArticle(data);
    });
    getAuthors().then((data) => {
      setUsers(data);
    });
  }, [id]);

  useEffect(() => {
    findUserById();
  }, [users, article]);

  function findUserById() {
    setAuthor(users.filter((item) => item.id === article?.authorId)[0]);
  }

  useEffect(() => {
    if (author) {
      getArticlesByAuthorId(author.id).then((data) => {
        setRelated(data);
      });
    }
  }, [author]);

  function getDate(stringDate: string): string {
    const dateCreate = new Date(stringDate);
    const dateNow = new Date();

    const dateCreateString = dateCreate.toISOString();
    const dateNowString = dateNow.toISOString();

    const dateCreateArr = dateCreateString.split("-");
    const dateNowArr = dateNowString.split("-");

    const yearCreate = dateCreateArr[0];
    const yearNow = dateNowArr[0];

    if (yearNow === yearCreate) {
      return "Release - " + yearCreate;
    } else {
      const year: any = parseInt(yearNow) - parseInt(yearCreate);
      return `Since + ${year}s ago`;
    }
  }

  const handleNavigateHome = () => {
    navigate(`/`);
  };

  return (
    <div className="mb-5">
      <div className={"container"}>
        <div>
          <p className={"m-0 py-2"}>
            {" "}
            <span
              className={styles.homeNav}
              onClick={() => handleNavigateHome()}
            >
              Home
            </span>
            / {article && getCategory(article.categoryId)}
          </p>
        </div>
      </div>
      <div style={{ backgroundColor: "#fafafa" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="pt-5 mb-3">
                <div className={styles.Rows}>
                  <div className="col-12">
                    <div className={styles.content_top}>
                      <ul
                        className={
                          "d-flex justify-content-start align-items-center p-0 mb-3" +
                          " " +
                          styles.listIcon
                        }
                      >
                        <li className={styles.listIconItem}>
                          <i
                            className="fab fa-facebook"
                            style={{ color: "rgb(59,89,152)" }}
                          ></i>
                        </li>
                        <li className={styles.listIconItem}>
                          <i
                            className="fab fa-twitter"
                            style={{ color: "rgb(0,174,239)" }}
                          ></i>
                        </li>
                        <li className={styles.listIconItem}>
                          <i
                            className="fab fa-internet-explorer"
                            style={{ color: "rgb(202,33,42)" }}
                          ></i>
                        </li>
                      </ul>
                      <h1>{article && article.title}</h1>
                      <ul className={styles.listInfor}>
                        <li>
                          <span style={{ color: "gray" }}> BY </span>
                          <span>&nbsp;</span>
                          <span> {author && author.info.name} </span>
                          <span>&nbsp;</span>
                        </li>
                        <span>&nbsp;</span>
                        <li>{article && getDate(article.dateCreate)}</li>
                        <span>&nbsp;</span>
                        <li>
                          <i
                            className="far fa-thumbs-up"
                            style={{
                              marginRight: "3px",
                              color: "rgb(66,133,244)",
                            }}
                          ></i>
                          <span>&nbsp;</span>
                          <span> {article && article.like} </span>
                          <i
                            className="far fa-thumbs-down"
                            style={{ marginRight: "3px" }}
                          ></i>
                          <span>&nbsp;</span>
                          <span> {article && article.disLike} </span>
                          <i
                            className="fas fa-eye"
                            style={{
                              marginRight: "3px",
                              color: "rgb(251,188,5)",
                            }}
                          ></i>
                          <span>&nbsp;</span>
                          <span> {article && article.view} </span>
                        </li>
                      </ul>
                    </div>
                    <div className="content_bottom">
                      <img
                        src={
                          `${!!article && article.cover}` ||
                          "https://nb-default.wpthms.com/wp-content/uploads/2016/12/woman-1209592_1280.jpg"
                        }
                        alt=""
                        className={styles.content_bottomImage}
                      />
                      <div className="content_paraGrap">
                        {article && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: article?.content,
                            }}
                          ></div>
                        )}
                      </div>
                      {/*  */}
                      <div className="row my-5">
                        <p className="h4 mb-4">Related Articles</p>
                        {arrRelated?.map((item, index) => (
                          <div
                            className={
                              "col-12 col-lg-3 text-center" +
                              " " +
                              styles.related
                            }
                            key={index}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              onClick={() => handleDetailComponent(item.id)}
                              src={item.cover}
                              className={
                                "rounded mb-1" + " " + styles.coverAvatar
                              }
                            />
                            <p
                              onClick={() => handleDetailComponent(item.id)}
                              className="h6 text-center"
                            >
                              {item.title}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className={styles.inForUser}>
                        <div className={styles.contentUser}>
                          <img
                            src={
                              `${!!author && author.info.avt}` ||
                              "https://nb-default.wpthms.com/wp-content/uploads/2016/11/nathan-160x160.jpg"
                            }
                            className={styles.Avatar}
                          />
                          <h3>{author && author.info.name}</h3>
                          <div
                            className={"container" + " " + styles.titleInfor}
                          >
                            <p>{author && author.info.about}</p>
                            <div className="row">
                              <div
                                className={"col-12" + " " + styles.inforFollow}
                              >
                                <span>Follow Me:</span>
                                <ul className={styles.social}>
                                  <li className={styles.contact}>
                                    Twitter &nbsp;|
                                  </li>
                                  <li className={styles.contact}>
                                    Facebook &nbsp;|
                                  </li>
                                  <li className={styles.contact}>
                                    Instagram &nbsp;|
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-12 col-lg-4`}>
              <div className={`pt-5 ps-3 ${styles.acticleList}`}>
                <h3 className="text-muted">List Newest Actiles</h3>
                {listTop4?.map((news, index) => (
                  <div
                    key={index}
                    className="my-4 d-flex justify-content-start align-items-start"
                  >
                    <div className={`${styles.imageSize}`}>
                      <img
                        src={news.cover}
                        alt=""
                        className={`rounded mb-1 ${styles.imageContent}`}
                      />
                    </div>
                    <div className="ms-4">
                      <p className="h5">{news.title}</p>
                      <a href={`/category/${id}`} className={`${styles.link}`}>
                        {getCategory(news.categoryId)}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ArticleDetails;
