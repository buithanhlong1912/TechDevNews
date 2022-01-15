// import { IAdmin } from "../interface";

const getEmailFromLocal = (): string => {
  const admin = localStorage.getItem("admin");
  if (typeof admin === "string") return JSON.parse(admin).userName;
  return "";
};

const getAdminFromLocal = () => {
  const admin = localStorage.getItem("admin");
  if (typeof admin === "string") return JSON.parse(admin);
  return false;
};

const getUserFromLocal = () => {
  const user = localStorage.getItem("user");
  if (typeof user === "string") return JSON.parse(user);
  return false;
};

export { getEmailFromLocal, getAdminFromLocal, getUserFromLocal };
