import API from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getUsers = async (): Promise<UserResponse[]> => {
  const { data } = await API.get("https://fakestoreapi.com/users");
  return data;
};
export const useGetUsers = () => {
  return useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
    keepPreviousData: true,
  });
};

const getUser = async (id: string): Promise<UserResponse> => {
  const { data } = await API.get(`https://fakestoreapi.com/users/${id}`);
  return data;
};
export const useGetUser = (id: string) => {
  return useQuery({
    queryFn: () => getUser(id),
    queryKey: ["users", id],
  });
};

const addUser = async (payload: UserResponse) => {
  const { data } = await API.post("users", { ...payload });

  return data;
};

const editUser = async (payload: UserResponse) => {
  const { data } = await API.put(`users/${payload.id}`, { ...payload });

  return data;
};

const deleteUser = async (id: string) => {
  const { data } = await API.delete(`users/${id}`);

  return data;
};
export const useAddUsers = () => {
  return useMutation<{ id: number }, AxiosError<string>, UserResponse>(addUser);
};

export const useEditUsers = () => {
  return useMutation<{ id: number }, AxiosError<string>, UserResponse>(
    editUser
  );
};

export const useDeleteUsers = () => {
  return useMutation<{ id: number }, AxiosError<string>, string>(deleteUser);
};
