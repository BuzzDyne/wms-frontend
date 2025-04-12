import { axiosPrivate } from "../api/axios";

export const fetchStockMappings = async () => {
  const response = await axiosPrivate.get("/mapping/stock-mappings");
  return response.data;
};

export const deleteStockMapping = async (mappingId: number) => {
  await axiosPrivate.delete(`/mapping/stock-mappings/${mappingId}`);
};
