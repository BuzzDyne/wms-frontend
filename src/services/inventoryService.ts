import { axiosPrivate } from "../api/axios";

export interface Stock {
  stock_id: number;
  stock_type_id: number;
  type_name: string;
  stock_size_id: number;
  size_name: string;
  stock_color_id: number;
  color_name: string;
  quantity: number;
  is_active: number;
}

export const getInventory = async (): Promise<Stock[]> => {
  const response = await axiosPrivate.get("/stock/");
  return response.data.data;
};

export const createStock = async (data: {
  type_id: number;
  size_id: number;
  color_id: number;
}): Promise<void> => {
  await axiosPrivate.post("/stock/", data);
};

export const getStockTypes = async (): Promise<
  { id: number; type_name: string }[]
> => {
  const response = await axiosPrivate.get("/stock/variant/type");
  return response.data.data;
};

export const getStockColors = async (): Promise<
  { id: number; color_name: string }[]
> => {
  const response = await axiosPrivate.get("/stock/variant/color");
  return response.data.data;
};

export const getStockSizes = async (): Promise<
  { id: number; size_name: string }[]
> => {
  const response = await axiosPrivate.get("/stock/variant/size");
  return response.data.data;
};
