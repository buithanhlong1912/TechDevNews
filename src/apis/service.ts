import axios from "axios";

export async function getArticles() {
    try {
        const response = await axios.get('/articles');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}