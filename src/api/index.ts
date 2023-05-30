import { AuthApi, AdminsApi, UsersApi, ArticlesApi } from "./typescript-axios";

const BASE_PATH = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PATH}`;

const apiKey = (_: string) => {
  return localStorage.getItem("X-PecoriToken") || "";
};

export const authApi = new AuthApi({ apiKey }, BASE_PATH);
export const adminsApi = new AdminsApi({ apiKey }, BASE_PATH);
export const usersApi = new UsersApi({ apiKey }, BASE_PATH);
export const articlesApi = new ArticlesApi({ apiKey }, BASE_PATH);
