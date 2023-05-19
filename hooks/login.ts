import { STORAGE_TOKEN_KEY } from "@/constant";
import API from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const doLogin = async (payload: LoginPayload) => {
  const { username, password } = payload;

  const { data } = await API.post("auth/login", { username, password });

  return data;
};
const doLogout = async () => {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  window.location.href = "/";
};
export const useLogin = () => {
  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<string>,
    LoginPayload
  >(doLogin, {
    onSuccess: (e) => {
      localStorage.setItem(STORAGE_TOKEN_KEY, e.token);
    },
  });
  return { login: loginMutation, logout: doLogout };
};
