import axios from "axios";


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