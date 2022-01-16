export interface ArticleModal {
  id: number;
  title: string;
  description: string;
  content: string;
  cover: string;
  authorId: number;
  categoryId: number;
  dateCreate: string;
  like: number;
  disLike: number;
  view: number;
}

export interface ArticleModalFormAddDTO {
  title: string;
  description: string;
  content: string;
  cover: string;
  authorId: number;
  categoryId: number;
}

export interface UserModal {
  id: number;
  userName: string;
  password: string;
  type: string;
  info: {
    name: string;
    age: number;
    about: string;
    avt: string;
    gender: string;
  };
}

export interface IAdmin {
  id: number;
  userName: string;
  type: string;
  info: {
    name: string;
    age: number;
    about: string;
    avt: string;
    gender: number;
  };
}

export interface IForm {
  userName: string;
  password: string;
}

export interface ArticleDetailDTO {
  id: number;
  title: string;
  description: string;
  content: string;
  cover: string;
  authorId: number;
  categoryId: number;
  dateCreate: string;
  like: number;
  disLike: number;
  view: number;
  user: IAdmin;
}

export interface ListArticleAdmin {
  next: Boolean;
  listArticle: ArticleModal[];
}

export interface FormEditAdmin {
  id: number;
  info: {
    about: string;
    name: string;
    avt: string;
    gender: string;
    age: number;
  };
}

export interface ClientModal {
  id: number;
  email: string;
  imageUrl: string;
  name: string;
  articlesLiked: number[];
}

export interface ClientDTO {
  email: string;
  imageUrl: string;
  name: string;
  articlesLiked: number[];
}
