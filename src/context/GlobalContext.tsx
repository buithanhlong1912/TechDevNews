import { useContext, createContext } from "react";
import { ArticleModal } from "../interface";

export interface Props {
  listByView: ArticleModal[] | undefined;
  setListByView: (listByView: ArticleModal[]) => void;
  listByLike: ArticleModal[] | undefined;
  setListByLike: (listByLike: ArticleModal[]) => void;
  listTop4: ArticleModal[] | undefined;
  setListTop4: (listTop4: ArticleModal[]) => void;
  listByCategory: ArticleModal[] | undefined;
  setListByCategory: (listByCategory: ArticleModal[]) => void;
  getCategory: (id: number) => string;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  user: {
    email: string;
    imageUrl: string;
    name: string;
  };
  setUser: (user: { email: string; imageUrl: string; name: string }) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const CreateGlobalContext = createContext<Props>({
  listByView: [],
  setListByView: () => {},
  listByLike: [],
  setListByLike: () => {},
  listTop4: [],
  setListTop4: () => {},
  listByCategory: [],
  setListByCategory: () => {},
  getCategory: (id: number) => {
    switch (id) {
      case 1:
        return "Lập trình";
      case 2:
        return "UI/UX";
      case 3:
        return "Block Chain";
      case 4:
        return "Mobile";
      case 5:
        return "Internet";
      default:
        return "";
    }
  },
  pageIndex: 1,
  setPageIndex: () => {},
  user: {
    email: "",
    imageUrl: "",
    name: "",
  },
  setUser: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
});

const useGlobalContext = () => useContext(CreateGlobalContext);

export { CreateGlobalContext, useGlobalContext };
