export const TOAST_DURATION = 3;

export const ROLE_NAMES = {
  1: "owner",
  2: "warehouse",
  3: "ecommerce",
  4: "packer",
};

export const XLS_FILE_FORMAT =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export const MAX_FILE_SIZE_MB = 10;

export const PICKLIST_STATUS_MAPPING: {
  [key: string]: { value: string; label: string; color: string };
} = {
  ON_DRAFT: { value: "ON_DRAFT", label: "On Draft", color: "default" },
  CANCELLED: { value: "CANCELLED", label: "Cancelled", color: "error" },
  CREATED: { value: "CREATED", label: "Created", color: "processing" },
  ON_PICKING: { value: "ON_PICKING", label: "On Picking", color: "warning" },
  COMPLETED: { value: "COMPLETED", label: "Completed", color: "success" },
};
