import { ArticleModal } from '../../interface';
import './styleHome.css'
import { useNavigate } from 'react-router-dom';

interface ITop4 {
    listTop4: ArticleModal[] | undefined
}

export default function HomePageCom1({ listTop4 }: ITop4) {
    let navigate = useNavigate();
    const getCategory = (id: number) => {
        switch (id) {
            case 1:
                return "Lập trình"
                break;
            case 2:
                return "UI/UX"
                break;
            case 3:
                return "Block Chain"
                break;
            case 4:
                return "Mobile"
                break;
            case 5:
                return "Internet"
                break;
        }
    }
    const handleCategory =(id: number)=>{
        navigate(`/category/${id}`)
    }
    return (
        <div className="backgroundCom1 text-white">
            <div className="container ">
                {listTop4 &&
                    <div className="w-75 py-5 px-5 ">
                        <p className="h1">{listTop4[0].title} </p>
                        <span onClick={()=>handleCategory(listTop4[0].categoryId)} className="btn btn-outline-info">{getCategory(listTop4[0].categoryId)} </span>
                        <span className="p-3">{listTop4[0].like} <i className="far fa-heart"></i> </span>
                        <p className="mt-2">{listTop4[0].description} </p>
                    </div>
                }
                {listTop4 &&
                    <div className="row px-5 py-4 borderCom1 rounded-top">
                        <div className="col-12 col-md-4 px-4">
                            <p className="h5">{listTop4[1].title} </p>
                            <span className="btn btn-outline-info">{getCategory(listTop4[1].categoryId)} </span>
                            <span className="p-3">{listTop4[1].like}  <i className="far fa-heart"></i></span>
                        </div>
                        <div className="col-12 col-md-4 px-4">
                            <p className="h5">{listTop4[2].title} </p>
                            <span className="btn btn-outline-info">{getCategory(listTop4[2].categoryId)} </span>
                            <span className="p-3">{listTop4[2].like}  <i className="far fa-heart"></i></span>
                        </div>
                        <div className="col-12 col-md-4 px-4">
                            <p className="h5">{listTop4[3].title} </p>
                            <span className="btn btn-outline-info">{getCategory(listTop4[3].categoryId)} </span>
                            <span className="p-3">{listTop4[3].like}  <i className="far fa-heart"></i></span>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

