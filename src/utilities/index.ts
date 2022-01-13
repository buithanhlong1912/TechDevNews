import { IAdmin } from "../interface";

const getEmailFromLocal = (): string => {
  const admin = localStorage.getItem("admin");
  if (typeof admin === "string") return JSON.parse(admin).userName;
  return "";
};

const getAdminFromLocal = (): IAdmin | boolean => {
  const admin = localStorage.getItem("admin");
  if (typeof admin === "string") return JSON.parse(admin);
  return false;
};

export { getEmailFromLocal };
