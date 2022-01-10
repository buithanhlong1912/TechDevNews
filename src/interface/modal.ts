export interface ArticleModal {
    id: number,
    title: string,
    description: string,
    content: string,
    cover:string,
    authorId: number,
    categoryId: number,
    dateCreate: string,
    like: number,
    disLike: number,
    view: number
}