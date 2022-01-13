import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { getCategoies } from "../../apis/service";

function Header() {
  const [statusSearch, setStatus] = useState(false);
  const [menuTitle, setTitle] = useState([]);

  function handleClickSearch() {
    setStatus(!statusSearch);
  }
  useEffect(() => {
    getCategoies().then((data) => {
      setTitle(data);
    });
  }, []);

  return (
    <div className={styles.container_total}>
      <div className={"container-fluid" + " " + styles.contain}>
        <div className={"row p-0 m-0" + " " + styles.Rows}>
          <div className="col-12 col-lg-3">
            <div
              className={
                "d-flex flex-column justify-content-center align-items-center p-0 m-0" +
                " " +
                styles.content_logo
              }
            >
              <ul
                className={
                  "d-flex justify-content-evenly align-items-center m-0 p-0" +
                  " " +
                  styles.listIconHeader
                }
              >
                <li className={styles.icon_logo}>
                  <span>Jan 11, 2022</span>
                </li>
                <li className={styles.icon_logo}>
                  <i className="fab fa-facebook"></i>
                </li>
                <li className={styles.icon_logo}>
                  <i className="fab fa-twitter-square"></i>
                </li>
                <li className={styles.icon_logo}>
                  <i className="fab fa-snapchat"></i>
                </li>
              </ul>
              <img
                src="https://i.pinimg.com/originals/c4/93/69/c493696c68f79d4213baf47e6b8c1b09.jpg"
                alt=""
                className={styles.imageLogo}
              />
            </div>
          </div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-end">
            <div style={{ width: "100%" }}>
              <ul className={"row" + " " + styles.listCourse}>
                {menuTitle.map((item: any, index: number) => (
                  <li
                    className={"col-12 col-lg-2" + " " + styles.listCourseItem}
                    key={index}
                  >
                    {item && item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-2">
            <div
              className={
                "d-flex flex-column justify-content-around align-items-center p-0 m-0" +
                " " +
                styles.content_logo
              }
            >
              <ul className={"row" + " " + styles.listGroup_Header}>
                <li className={"col-6" + " " + styles.listGroup_HeaderItem}>
                  Login{" "}
                  <i
                    className={"fas fa-angle-down" + " " + styles.arrowDown}
                  ></i>
                </li>
              </ul>
              <ul className={styles.listGroup_Header2}>
                <li className={styles.groupItem2}>
                  <i className="fas fa-user-circle"></i>
                </li>
                <li className={styles.groupItem2} onClick={handleClickSearch}>
                  <i className="fas fa-search"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {statusSearch ? (
        <div className={styles.searchField}>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Search"
            />
            <i className={"fas fa-search" + " " + styles.icon}></i>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Header;
