import axios from "axios";
import { ArticleModal, ArticleModalFormAddDTO, IForm } from "../interface";

axios.defaults.baseURL = "http://localhost:3000";

export async function getArticles() {
  try {
    const response = await axios.get("/articles");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticlesByAuthorId(id: number) {
  try {
    const response = await axios.get("/articles?authorId=" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createAricle(article: ArticleModalFormAddDTO) {
  try {
    const data = {
      ...article,
      dateCreate: new Date(),
      like: 0,
      disLike: 0,
      view: 0,
    };
    const response = await axios.post("/articles", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(form: IForm) {
  const { userName, password } = form;
  try {
    const response = await axios.get(`/users?userName=${userName}`);
    if (response.data.length !== 0) {
      if (response.data[0].password === password) {
        return response.data[0];
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
