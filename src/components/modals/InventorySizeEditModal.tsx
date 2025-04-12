import React from "react";
import { Modal, Form, Input, message } from "antd";

interface InventorySizeEditModalProps {
  visible: boolean;
  onClose: () => void;
  initialValues: { size_name_start: string; size_name_end: string };
  refresh: () => void;
}

const InventorySizeEditModal: React.FC<InventorySizeEditModalProps> = ({
  visible,
  onClose,
  initialValues,
  refresh,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Add logic for updating size
      message.success("Updated size successfully");
      onClose();
      refresh();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Size"
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
          label="Size Name Start"
          name="size_name_start"
          rules={[
            { required: true, message: "Please input the start size name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Size Name End"
          name="size_name_end"
          rules={[
            { required: true, message: "Please input the end size name!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventorySizeEditModal;
