import axios from "axios";
import {
  ArticleModal,
  ArticleModalFormAddDTO,
  ClientDTO,
  ClientModal,
  FormEditAdmin,
  IForm,
} from "../interface";

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

export async function getTop4Article() {
  try {
    const response = await axios.get(
      "/articles?_sort=dateCreate&_order=desc&_page=1&_limit=4"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticleByCategoryId(id: number) {
  try {
    const response = await axios.get(
      `/articles?categoryId=${id}&_page=1&_limit=8`
    );
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

export async function getTop4ByView() {
  try {
    const response = await axios.get(
      "/articles?_sort=view&_order=desc&_page=1&_limit=4"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getTop4ByLike() {
  try {
    const response = await axios.get(
      "/articles?_sort=like&_order=desc&_page=1&_limit=4"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getListCategories() {
  try {
    const response = await axios.get("/categories");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getNewsByCategory(id: number, pageIndex: number) {
  try {
    const response = await axios.get(
      `/articles?_sort=dateCreate&_order=desc&categoryId=${id}&_page=${pageIndex}&_limit=5`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticlesId(id: string | undefined) {
  try {
    if (!id) {
      return false;
    }
    const response = await axios.get("/articles?id=" + id);
    const getUserById = await axios.get(
      "/users?id=" + response.data[0].authorId
    );
    const articleDetaile = {
      ...response.data[0],
      user: getUserById.data[0],
    };
    return articleDetaile;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllAuthor() {
  try {
    const response = await axios.get(`/users`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function editArticlesById(article: ArticleModal) {
  try {
    const response = await axios.put("/articles/" + article.id, article);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteArticlesById(id: number) {
  try {
    const response = await axios.delete("/articles/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSearch(title: string, pageIndex: number) {
  try {
    const response = await axios.get(
      `/articles?_sort=dateCreate&_order=desc&title_like=${title}&_page=${pageIndex}&_limit=5`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function editViewArticlesById(id: number) {
  try {
    const response = await axios.put("/articles/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function increasViewByArticleId(id: number) {
  try {
    const articleById = await axios.get("/articles?id=" + id);

    const currentView = articleById.data[0].view;
    const response = await axios.patch("/articles/" + id, {
      view: currentView + 1,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticlesPage(pageIndex: number) {
  try {
    const response = await axios.get(
      `/articles?_sort=dateCreate&_order=desc&_page=${pageIndex}&_limit=10`
    );
    const nextPage = await axios.get(
      `/articles?_sort=dateCreate&_order=desc&_page=${pageIndex + 1}&_limit=10`
    );
    const data = {
      next: nextPage.data.length !== 0 ? true : false,
      listArticle: response.data,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function editAccountAdmin(adminAcc: FormEditAdmin) {
  try {
    const response = await axios.patch(`/users/${adminAcc.id}`, adminAcc);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function checkClientExist(email: string) {
  try {
    const check = await axios.get(`/clients?email=${email}`);
    return check.data.length !== 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
}

export async function addAccountClient(client: ClientDTO) {
  try {
    const response = await axios.post(`/clients`, client);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getClient(email: string) {
  try {
    const response = await axios.get(`/clients?email=${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function increaseLike(email: string, id: number) {
  try {
    const userByEmail = await axios.get(`/clients?email=${email}`);
    const articleById = await axios.get(`/articles?id=${id}`);

    // Increase Like For Acticle
    const currentLike = articleById.data[0].like;
    const responseActicle = await axios.patch("/articles/" + id, {
      like: currentLike + 1,
    });

    // Push Acticle To Liked List
    const currentList = userByEmail.data[0].articlesLiked;
    const updateList = currentList.includes(id)
      ? currentList
      : currentList.push(id);
    console.log(updateList, currentList);
    const userId = userByEmail.data[0].id;
    const responseUser = await axios.patch(`/clients/${userId}`, {
      articlesLiked: currentList,
    });

    return responseActicle.data, responseUser.data;
  } catch (error) {
    console.log(error);
  }
}

export async function decreaseLike(email: string, id: number) {
  try {
    const userByEmail = await axios.get(`/clients?email=${email}`);
    const articleById = await axios.get(`/articles?id=${id}`);

    // Decrease Like For Acticle
    const currentLike = articleById.data[0].like;
    const responseActicle = await axios.patch("/articles/" + id, {
      like: currentLike - 1,
    });

    // Pop Acticle From Liked List
    const currentList = userByEmail.data[0].articlesLiked;
    const updateList = currentList.includes(id)
      ? currentList.pop(id)
      : currentList;
    console.log(updateList, currentList);
    const userId = userByEmail.data[0].id;
    const responseUser = await axios.patch(`/clients/${userId}`, {
      articlesLiked: currentList,
    });

    return responseActicle.data, responseUser.data;
  } catch (error) {
    console.log(error);
  }
}
