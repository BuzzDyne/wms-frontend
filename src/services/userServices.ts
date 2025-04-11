import { axiosPrivate } from "../api/axios";

export const fetchUsers = async () => {
  const response = await axiosPrivate.get("/user/");
  return response.data.data;
};

export const createUser = async (payload: {
  username: string;
  password: string;
  rolename: string;
}) => {
  const response = await axiosPrivate.post("/user/", payload);
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axiosPrivate.delete(`/user/${userId}`);
  return response.data;
};

export const changePassword = async (
  userId: number,
  payload: { new_password: string }
) => {
  const response = await axiosPrivate.put(
    `/user/${userId}/change-password`,
    payload
  );
  return response.data;
};
