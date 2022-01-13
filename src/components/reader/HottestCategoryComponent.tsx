import React from 'react';
import { ArticleModal } from '../../interface';

interface ICom2{
  listByCategory: ArticleModal[] | undefined
}

export default function HomePageCom2({listByCategory}:ICom2) {
  return (
    <div className="container my-5 ">
      <p className="h3 text-center">Spotlights</p>
      <p className=" text-center">The Hottest Category</p>
      <div className="row pt-3 ">
          {listByCategory?.map((data,index)=>(
            <div key={index} className="col-12 col-sm-6 col-md-3 px-4">
              <div>
                 <img className="rounded imgCoverCom2" src={data.cover} alt="image" />
              </div>
              <p className="h5 pt-3">{data.title}</p>
              <p>{data.like}  <i className="far fa-heart"></i></p>
            </div>
          ))}
      </div>
    </div>
  )
}

