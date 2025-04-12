import React from "react";
import { Modal, Form, Select, message } from "antd";
import { useRequest } from "ahooks";
import {
  getStockTypes,
  getStockColors,
  getStockSizes,
} from "../../services/inventoryService";

const { Option } = Select;

interface CreateStockModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    type_id: number;
    size_id: number;
    color_id: number;
  }) => void;
}

const CreateStockModal: React.FC<CreateStockModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const { data: types = [], loading: loadingTypes } = useRequest(
    getStockTypes,
    {
      ready: visible,
      onError: () => message.error("Failed to load types."),
    }
  );

  const { data: colors = [], loading: loadingColors } = useRequest(
    getStockColors,
    {
      ready: visible,
      onError: () => message.error("Failed to load colors."),
    }
  );

  const { data: sizes = [], loading: loadingSizes } = useRequest(
    getStockSizes,
    {
      ready: visible,
      onError: () => message.error("Failed to load sizes."),
    }
  );

  return (
    <Modal
      title="Create New Stock"
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loadingTypes || loadingColors || loadingSizes}
    >
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="type_id"
          label="Type"
          rules={[{ required: true, message: "Please select a type" }]}
        >
          <Select
            placeholder="Select Type"
            loading={loadingTypes}
            showSearch
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .includes(input.toLowerCase()) || false
            }
          >
            {types.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.type_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="color_id"
          label="Color"
          rules={[{ required: true, message: "Please select a color" }]}
        >
          <Select
            placeholder="Select Color"
            loading={loadingColors}
            showSearch
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .includes(input.toLowerCase()) || false
            }
          >
            {colors.map((color) => (
              <Option key={color.id} value={color.id}>
                {color.color_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="size_id"
          label="Size"
          rules={[{ required: true, message: "Please select a size" }]}
        >
          <Select
            placeholder="Select Size"
            loading={loadingSizes}
            showSearch
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .includes(input.toLowerCase()) || false
            }
          >
            {sizes.map((size) => (
              <Option key={size.id} value={size.id}>
                {size.size_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStockModal;
