import React from "react";
import { Modal, Form, Input, message, ColorPicker } from "antd";
import { useRequest } from "ahooks";
import { postNewColorStockItem } from "../../services/inventoryServices";

interface InventoryColorEditModalProps {
  visible: boolean;
  onClose: () => void;
  initialValues: { color_name: string; color_hex: string };
  refresh: () => void;
}

const InventoryColorEditModal: React.FC<InventoryColorEditModalProps> = ({
  visible,
  onClose,
  initialValues,
  refresh,
}) => {
  const [form] = Form.useForm();

  const { run: updateColor, loading } = useRequest(
    async (payload: { color_name: string; color_hex: string }) => {
      // Replace with actual update service when available
      return Promise.resolve(); // Placeholder for update logic
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("Updated color successfully");
        onClose();
        refresh();
      },
      onError: (error: any) => {
        message.error(
          error.response?.data?.detail?.errorMsg || "Unknown error occurred."
        );
      },
    }
  );

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.color_hex = values.color_hex.replace(/^#/, ""); // Remove leading '#' from hex
      updateColor({
        color_name: values.color_name,
        color_hex: values.color_hex,
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Color"
      open={visible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      destroyOnClose
    >
      <Form layout="vertical" form={form} initialValues={initialValues}>
        <Form.Item
          label="Color Name"
          name="color_name"
          rules={[{ required: true, message: "Please input the color name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Color Hex"
          name="color_hex"
          rules={[{ required: true, message: "Please select a color!" }]}
        >
          <ColorPicker
            format="hex"
            showText
            onChange={(color) =>
              form.setFieldValue("color_hex", color.toHexString())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryColorEditModal;
