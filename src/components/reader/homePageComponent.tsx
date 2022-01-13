import React, { useEffect, useState } from 'react';
import { getArticleByCategoryId, getTop4Article, getTop4ByLike, getTop4ByView } from '../../apis/service';
import { ArticleModal } from '../../interface';
import HomePageCom1 from './BannerComponent';
import HomePageCom2 from './HottestCategoryComponent';
import HomePageCom3 from './MostViewLikeComponent';

export default function HomePageComponent() {
    const [listTop4, setListTop4] = useState<ArticleModal[]>()
    const [listByCategory, setListByCategory] = useState<ArticleModal[]>()
    const [listByView, setListByView] = useState<ArticleModal[]>()
    const [listByLike, setListByLike] = useState<ArticleModal[]>()
    useEffect(() => {
        getTop4Article().then(data => setListTop4(data))
        getArticleByCategoryId(2).then(data => setListByCategory(data))
        getTop4ByView().then(data => setListByView(data))
        getTop4ByLike().then(data => setListByLike(data))
    }, []);
    return (
        <div className="home">
            <HomePageCom1 listTop4={listTop4} />
            <HomePageCom2 listByCategory={listByCategory}/>
            <HomePageCom3 listByView={listByView} listByLike={listByLike}/>
        </div>
    )
}

