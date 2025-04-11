import React from "react";
import { Modal, Form, Input, message } from "antd";

interface InventoryTypeEditModalProps {
  visible: boolean;
  onClose: () => void;
  initialValues: { type_name: string };
  refresh: () => void;
}

const InventoryTypeEditModal: React.FC<InventoryTypeEditModalProps> = ({
  visible,
  onClose,
  initialValues,
  refresh,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Add logic for updating type
      message.success("Updated type successfully");
      onClose();
      refresh();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Type"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      destroyOnClose
    >
      <Form layout="vertical" form={form} initialValues={initialValues}>
        <Form.Item
          label="Type Name"
          name="type_name"
          rules={[{ required: true, message: "Please input the type name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryTypeEditModal;
