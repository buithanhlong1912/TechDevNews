import axios from "axios";
import { ArticleModal, ArticleModalFormAddDTO } from "../interface";

axios.defaults.baseURL = 'http://localhost:3000';

export async function getArticles() {
    try {
        const response = await axios.get('/articles');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getArticlesByAuthorId(id: number) {
    try {
        const response = await axios.get('/articles?authorId=' + id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getTop4Article() {
    try {
        const response = await axios.get('/articles?_sort=dateCreate&_order=desc&_page=1&_limit=4');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getArticleByCategoryId(id: number) {
    try {
        const response = await axios.get(`/articles?categoryId=${id}&_page=1&_limit=8`);
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
            view: 0
        }
        const response = await axios.post('/articles', data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export async function getTop4ByView() {
    try {
        const response = await axios.get('/articles?_sort=view&_order=desc&_page=1&_limit=4');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getTop4ByLike() {
    try {
        const response = await axios.get('/articles?_sort=like&_order=desc&_page=1&_limit=4');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getListCategories() {
    try {
        const response = await axios.get('/categories');
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
        const response = await axios.get('/articles?id=' + id);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function editArticlesById(article: ArticleModal) {
    try {
        const response = await axios.put('/articles/' + article.id, article);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}