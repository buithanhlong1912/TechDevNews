import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export async function getArticles() {
  try {
    const response = await axios.get("/articles");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getArticlesById(id: number) {
  try {
    const response = await axios.get("/articles/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuthors() {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getCategoies() {
  try {
    const response = await axios.get("/categories");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticlesByAuthorId(id: number) {
  try {
    const response = await axios.get(
      `/articles?_sort=dateCreate&_order=desc&authorId=${id}&_page=1&_limit=4`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
