import React from "react";
import { Modal, Form, Input, message } from "antd";
import { useRequest } from "ahooks";
import { postNewTypeStockItem } from "../../services/inventoryServices";

interface InventoryTypeCreationModalProps {
  visible: boolean;
  onClose: () => void;
  refresh: () => void;
}

const InventoryTypeCreationModal: React.FC<InventoryTypeCreationModalProps> = ({
  visible,
  onClose,
  refresh,
}) => {
  const [form] = Form.useForm();

  const { run: createType, loading } = useRequest(
    async (payload: { type_name: string }) => postNewTypeStockItem(payload),
    {
      manual: true,
      onSuccess: () => {
        message.success("Created type successfully");
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
      createType(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Add New Type"
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

export default InventoryTypeCreationModal;
