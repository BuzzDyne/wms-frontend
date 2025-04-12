import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { createUser } from "../../services/userServices";
import { AxiosError } from "axios";

const roles = [
  { id: 1, name: "Owner" },
  { id: 2, name: "Warehouse" },
  { id: 3, name: "Ecommerce" },
  { id: 4, name: "Packer" },
];

interface UserCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserCreationModal: React.FC<UserCreationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await createUser(values);
      message.success("User created successfully.");
      onClose();
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data?.detail &&
        typeof error.response.data.detail === "string" &&
        (error.response.data.detail.endsWith("already exists.") ||
          error.response.data.detail.endsWith("last active owner."))
      ) {
        message.error(error.response.data.detail);
      } else {
        message.error("Failed to create user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create New User"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: "Username is required." },
            {
              pattern: /^[a-zA-Z][a-zA-Z0-9.]{2,}$/,
              message:
                "Username must start with a letter, be alphanumeric (including dots), and at least 3 characters long.",
            },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Password is required." },
            { min: 4, message: "Password must be at least 4 characters long." },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          name="rolename"
          label="Role"
          rules={[{ required: true, message: "Role is required." }]}
        >
          <Select placeholder="Select a role">
            {roles.map((role) => (
              <Select.Option key={role.id} value={role.name}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreationModal;
