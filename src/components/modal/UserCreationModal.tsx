import { Input, Form, App as AntdApp, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BasicModalProps } from "../../models/types";

const UserCreationModal: React.FC<BasicModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { message } = AntdApp.useApp();
  const { t } = useTranslation();

  const closeSelf = () => {
    onClose();
    setIsLoading(false);
  };

  return (
    <Modal
      title={t("account-management.modal-create.title")}
      open={isOpen}
      onOk={closeSelf}
      onCancel={closeSelf}
      confirmLoading={isLoading}
    >
      <Form layout="vertical">
        <Form.Item
          label={t("account-management.modal-create.field.username.label")}
          required
        >
          <Input
            placeholder={t(
              "account-management.modal-create.field.username.placeholder"
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreationModal;
