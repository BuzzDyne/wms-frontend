import { axiosPrivate } from "../api/axios";

export const fetchInboundDetail = async (id: number) => {
  const response = await axiosPrivate.get(`/inbound/${id}`);
  return response.data;
};

export const addInboundItem = async (
  inboundId: number,
  payload: { stock_id: number; add_quantity: number }
) => {
  await axiosPrivate.post(`/inbound/${inboundId}/items`, payload);
};

export const submitInbound = async (inboundId: number) => {
  await axiosPrivate.post(`/inbound/${inboundId}/submit`);
};

export const deleteInboundItem = async (itemId: number) => {
  await axiosPrivate.delete(`/inbound/items/${itemId}`);
};

export const cancelInbound = async (inboundId: number) => {
  await axiosPrivate.delete(`/inbound/${inboundId}`);
};
