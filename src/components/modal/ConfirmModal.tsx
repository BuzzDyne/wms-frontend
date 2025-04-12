import { Modal } from "antd";
import React, { useState } from "react";

interface ConfirmModalProps {
  modalType?: "positive" | "negative";
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  titleText: string;
  bodyText: string;
  okText: string;
  cancelText: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  modalType = "positive",
  isOpen,
  onSubmit,
  onClose,
  titleText,
  bodyText,
  okText,
  cancelText,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const closeSelf = () => {
    onClose();
    setIsLoading(false);
  };

  return (
    <Modal
      title={titleText}
      open={isOpen}
      onOk={onSubmit}
      onCancel={closeSelf}
      confirmLoading={isLoading}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{
        type: "default",
        className: modalType === "positive" ? "solid-green" : "solid-red",
      }}
    >
      <p>{bodyText}</p>
    </Modal>
  );
};

export default ConfirmModal;
