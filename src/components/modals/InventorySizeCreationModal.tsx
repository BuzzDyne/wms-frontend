import React from "react";
import { Modal, Form, Input, message } from "antd";
import { useRequest } from "ahooks";
import { postNewSizeStockItem } from "../../services/inventoryServices";

interface InventorySizeCreationModalProps {
  visible: boolean;
  onClose: () => void;
  refresh: () => void;
}

const InventorySizeCreationModal: React.FC<InventorySizeCreationModalProps> = ({
  visible,
  onClose,
  refresh,
}) => {
  const [form] = Form.useForm();

  const { run: createSize, loading } = useRequest(
    async (payload: { size_name_start: string; size_name_end: string }) =>
      postNewSizeStockItem(payload),
    {
      manual: true,
      onSuccess: () => {
        message.success("Created size successfully");
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
      createSize(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Add New Size"
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
          label="Size Name Start"
          name="size_name_start"
          rules={[
            { required: true, message: "Please input the start size name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Size Name End" name="size_name_end" rules={[]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventorySizeCreationModal;
