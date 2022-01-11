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

export interface IForm {
  userName: string;
  password: string;
}
