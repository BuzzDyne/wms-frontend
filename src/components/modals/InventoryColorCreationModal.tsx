import React from "react";
import { Modal, Form, Input, message, ColorPicker } from "antd";
import { useRequest } from "ahooks";
import { postNewColorStockItem } from "../../services/inventoryServices";

interface InventoryColorCreationModalProps {
  visible: boolean;
  onClose: () => void;
  refresh: () => void;
}

const InventoryColorCreationModal: React.FC<
  InventoryColorCreationModalProps
> = ({ visible, onClose, refresh }) => {
  const [form] = Form.useForm();

  const { run: createColor, loading } = useRequest(
    async (payload: { color_name: string; color_hex: string }) =>
      postNewColorStockItem(payload),
    {
      manual: true,
      onSuccess: () => {
        message.success("Created color successfully");
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
      values.hex = values.hex.replace(/^#/, ""); // Remove leading '#' from hex
      createColor({ color_name: values.name, color_hex: values.hex });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Add New Color"
      open={visible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Color Name"
          name="name"
          rules={[{ required: true, message: "Please input the color name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Color Hex"
          name="hex"
          rules={[{ required: true, message: "Please select a color!" }]}
        >
          <ColorPicker
            format="hex"
            showText
            onChange={(color) => form.setFieldValue("hex", color.toHexString())}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryColorCreationModal;
