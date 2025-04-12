import { axiosPrivate } from "../api/axios";

export const getInboundStatus = async (): Promise<boolean> => {
  const response = await axiosPrivate.get("/inbound/inbound-status");
  return response.data.inbound_active === 1;
};

export const toggleInboundStatus = async (
  newStatus: "on" | "off"
): Promise<void> => {
  await axiosPrivate.put(`/inbound/inbound-status/toggle/${newStatus}`);
};

export const getInboundSchedules = async (
  year: number
): Promise<{ id: number; schedule_date: string; notes: string }[]> => {
  const response = await axiosPrivate.get(`/inbound/schedules`, {
    params: { year },
  });
  return response.data.map((schedule: any) => ({
    id: schedule.id,
    schedule_date: schedule.schedule_date,
    notes: schedule.notes,
  }));
};

export const deleteInboundSchedule = async (id: number): Promise<void> => {
  await axiosPrivate.delete(`/inbound/schedules/${id}`);
};

export const createInboundSchedule = async (schedule: {
  schedule_date: string;
  notes: string;
}): Promise<void> => {
  await axiosPrivate.post("/inbound/schedules", schedule);
};
