import { axiosInstance } from "../api/axios";

export const getInboundStatus = async (): Promise<boolean> => {
  const response = await axiosInstance.get("/inbound/inbound-status");
  return response.data.inbound_active === 1;
};

export const toggleInboundStatus = async (
  newStatus: "on" | "off"
): Promise<void> => {
  await axiosInstance.put(`/inbound/inbound-status/toggle/${newStatus}`);
};
