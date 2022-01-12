const getEmailFromLocal = (): string => {
  const admin = localStorage.getItem("admin");
  if (typeof admin === "string") return JSON.parse(admin).userName;
  return "";
};

export { getEmailFromLocal };
