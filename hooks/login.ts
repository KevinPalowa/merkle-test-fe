import { STORAGE_TOKEN_KEY } from "@/constant";
import API from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const doLogin = async (payload: LoginPayload) => {
  const { username, password } = payload;

  const { data } = await API.post("auth/login", { username, password });

  return data;
};
export const useLogin = () => {
  return useMutation<LoginResponse, AxiosError<string>, LoginPayload>(doLogin, {
    onSuccess: (e) => {
      localStorage.setItem(STORAGE_TOKEN_KEY, e.token);
    },
  });
};
