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
