import React from "react";
import { Modal, Form, Input, message, ColorPicker } from "antd";

interface InventoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  confirmLoading: boolean;
  isEditing: boolean;
  activeTab: "color" | "type" | "size";
  initialValues?: any;
}

const InventoryModal: React.FC<InventoryModalProps> = ({
  visible,
  onClose,
  onSubmit,
  confirmLoading,
  isEditing,
  activeTab,
  initialValues = {},
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (activeTab === "color") {
        // Remove leading '#' from the color hex before sending to the backend
        values.hex = values.hex.replace(/^#/, "");
      }
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={`${isEditing ? "Edit" : "Add New"} ${activeTab}`}
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      destroyOnClose
    >
      <Form layout="vertical" form={form} initialValues={initialValues}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>

        {activeTab === "color" && (
          <Form.Item
            label="Color Hex"
            name="hex"
            rules={[{ required: true, message: "Please select a color!" }]}
          >
            <ColorPicker
              format="hex"
              showText
              onChange={(color) =>
                form.setFieldValue("hex", color.toHexString())
              }
            />
          </Form.Item>
        )}

        {activeTab !== "color" && (
          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: "Please input the value!" }]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default InventoryModal;
