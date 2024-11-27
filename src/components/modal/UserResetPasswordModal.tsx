import React, { useState } from "react";
import { Modal, Form, Input, App as AntdApp } from "antd";
import { BasicModalProps } from "../../models/types";
import { useTranslation } from "react-i18next";

const UserResetPasswordModal: React.FC<BasicModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { message } = AntdApp.useApp();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOk = async () => {
    setIsLoading(true);

    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      console.log("Reset Password Data:", values); // TODO BE

      // Simulate success message
      message.success(t("account-management.modal-reset-pwd.success"));
      form.resetFields(); // Reset form after successful submission
      closeSelf(); // Close the modal
    } catch (error) {
      console.error("Validation Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSelf = () => {
    form.resetFields(); // Reset form when modal closes
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      title={`${t("account-management.modal-reset-pwd.title")}(${"Adi"})`}
      open={isOpen}
      onOk={handleOk}
      onCancel={closeSelf}
      confirmLoading={isLoading}
    >
      <Form form={form} layout="vertical" validateTrigger="onBlur">
        <Form.Item
          label={t("account-management.modal-reset-pwd.field.password.label")}
          name="password"
          rules={[
            {
              required: true,
              message: t(
                "account-management.modal-reset-pwd.field.password.error.required"
              ),
            },
            {
              min: 4,
              message: t(
                "account-management.modal-reset-pwd.field.password.error.minlength"
              ),
            },
          ]}
        >
          <Input.Password
            placeholder={t(
              "account-management.modal-reset-pwd.field.password.placeholder"
            )}
          />
        </Form.Item>
        <Form.Item
          label={t("account-management.modal-reset-pwd.field.repassword.label")}
          name="repassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: t(
                "account-management.modal-reset-pwd.field.repassword.error.required"
              ),
            },
            {
              min: 4,
              message: t(
                "account-management.modal-reset-pwd.field.repassword.error.minlength"
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    t(
                      "account-management.modal-reset-pwd.field.repassword.error.mismatch"
                    )
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={t(
              "account-management.modal-reset-pwd.field.repassword.placeholder"
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserResetPasswordModal;
