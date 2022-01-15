import React from "react";

// import { ArticleModal } from "../../interface";
import HomePageCom1 from "./BannerComponent";
import HomePageCom2 from "./HottestCategoryComponent";
import HomePageCom3 from "./MostViewLikeComponent";

export default function HomePageComponent() {
  return (
    <div className="home">
      <HomePageCom1 />
      <HomePageCom2 />
      <HomePageCom3 />
    </div>
  );
}
