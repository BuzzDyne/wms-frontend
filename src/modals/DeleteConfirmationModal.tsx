import React from "react";
import { Modal } from "antd";
import { formatDateVerbose } from "../utils/utils";

interface DeleteConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading: boolean;
  itemName: string;
  scheduleDate: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  confirmLoading,
  itemName,
  scheduleDate,
}) => {
  return (
    <Modal
      title="Delete Schedule"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      <p>
        Are you sure you want to delete the schedule "{itemName}" scheduled on{" "}
        {formatDateVerbose(scheduleDate)}?
      </p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
