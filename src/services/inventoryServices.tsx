import { axiosPrivate } from "../api/axios";
import {
  ColorStockItemResponse,
  CreateStockColorRequest,
  CreateStockSizeRequest,
  CreateStockTypeRequest,
  SizeStockItemResponse,
  TypeStockItemResponse,
} from "../models/api";

export const fetchSizeStockItems = async (): Promise<
  SizeStockItemResponse[]
> => {
  const res = await axiosPrivate.get(`/stock/variant/size`);
  return res.data.data;
};

export const postNewSizeStockItem = async (payload: CreateStockSizeRequest) => {
  const res = await axiosPrivate.post(`/stock/variant/size`, payload);
  return res.data;
};

export const fetchColorStockItems = async (): Promise<
  ColorStockItemResponse[]
> => {
  const res = await axiosPrivate.get(`/stock/variant/color`);
  return res.data.data;
};

export const postNewColorStockItem = async (
  payload: CreateStockColorRequest
) => {
  const res = await axiosPrivate.post(`/stock/variant/color`, payload);
  return res.data;
};

export const fetchTypeStockItems = async (): Promise<
  TypeStockItemResponse[]
> => {
  const res = await axiosPrivate.get(`/stock/variant/type`);
  return res.data.data;
};

export const postNewTypeStockItem = async (payload: CreateStockTypeRequest) => {
  const res = await axiosPrivate.post(`/stock/variant/type`, payload);
  return res.data;
};
