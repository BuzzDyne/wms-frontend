import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { changePassword } from "../../services/userServices";

interface UserResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const UserResetPasswordModal: React.FC<UserResetPasswordModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await changePassword(userId, { new_password: values.new_password });
      message.success("Password reset successfully.");
      onClose();
    } catch (error) {
      message.error("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Reset Password"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="new_password"
          label="New Password"
          rules={[
            { required: true, message: "Password is required." },
            { min: 4, message: "Password must be at least 4 characters long." },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserResetPasswordModal;
