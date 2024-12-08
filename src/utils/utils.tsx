import dayjs from "dayjs";
import { PICKLIST_STATUS_MAPPING } from "./constant";
import { Tag } from "antd";

export function capitalizeString(str: string | undefined): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const formatDate = (date: string | null): string => {
  return date ? dayjs(date).format("YYYY-MM-DD") : "-";
};

export const prettyPicklistStatus = (status: string): JSX.Element => {
  const { label, color } = PICKLIST_STATUS_MAPPING[status] || {
    label: status,
    color: "default",
  };
  return <Tag color={color}>{label}</Tag>;
};
