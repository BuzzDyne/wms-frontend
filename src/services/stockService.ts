import { axiosPrivate } from "../api/axios";

export const getStockTypes = async () => {
  const response = await axiosPrivate.get("/stock/type-from-stock");
  return response.data.data;
};

export const getStockColors = async (typeId: number) => {
  const response = await axiosPrivate.get(
    `/stock/color-from-stock?type_id=${typeId}`
  );
  return response.data.data;
};

export const getStockSizes = async (typeId: number, colorId: number) => {
  const response = await axiosPrivate.get(
    `/stock/size-from-stock?type_id=${typeId}&color_id=${colorId}`
  );
  return response.data.data;
};
