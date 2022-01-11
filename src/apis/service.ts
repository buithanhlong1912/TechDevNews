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