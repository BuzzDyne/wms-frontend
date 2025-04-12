import React, { useState } from "react";
import { Modal, Form, Select, InputNumber, message } from "antd";
import { useRequest } from "ahooks";
import {
  getStockTypes,
  getStockColors,
  getStockSizes,
} from "../../services/stockService";

const { Option } = Select;

interface StockType {
  type_id: number;
  type_name: string;
}

interface StockColor {
  color_id: number;
  color_name: string;
}

interface StockSize {
  size_id: number;
  size_name: string;
}

interface AddNewItemModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: { stock_id: number; add_quantity: number }) => void;
}

const AddNewItemModal: React.FC<AddNewItemModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [typeId, setTypeId] = useState<number | undefined>(undefined);
  const [colorId, setColorId] = useState<number | undefined>(undefined);

  const { data: types = [], loading: loadingTypes } = useRequest(
    getStockTypes,
    {
      ready: visible,
      onError: () => message.error("Failed to load types."),
    }
  );

  const {
    data: colors = [],
    loading: loadingColors,
    run: fetchColors,
  } = useRequest(
    async (typeId: number) => {
      return await getStockColors(typeId);
    },
    {
      manual: true,
      onError: () => message.error("Failed to load colors."),
    }
  );

  const {
    data: sizes = [],
    loading: loadingSizes,
    run: fetchSizes,
  } = useRequest(
    async (typeId: number, colorId: number) => {
      return await getStockSizes(typeId, colorId);
    },
    {
      manual: true,
      onError: () => message.error("Failed to load sizes."),
    }
  );

  const handleTypeChange = (value: number) => {
    setTypeId(value);
    form.setFieldsValue({ color_id: undefined, size_id: undefined });
    setColorId(undefined);
    fetchColors(value); // Pass the selected type_id directly
  };

  const handleColorChange = (value: number) => {
    setColorId(value);
    form.setFieldsValue({ size_id: undefined });
    fetchSizes(typeId!, value); // Pass both typeId and colorId directly
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
        setTypeId(undefined);
        setColorId(undefined);
      })
      .catch(() => {
        message.error("Please fill in all required fields");
      });
  };

  return (
    <Modal
      title="Add New Item"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Type"
          name="type_id"
          rules={[{ required: true, message: "Type is required" }]}
        >
          <Select
            placeholder="Select Type"
            loading={loadingTypes}
            onChange={handleTypeChange}
            showSearch
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .includes(input.toLowerCase()) || false
            }
          >
            {types.map((type: StockType) => (
              <Option key={type.type_id} value={type.type_id}>
                {type.type_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Color"
          name="color_id"
          rules={[{ required: true, message: "Color is required" }]}
        >
          <Select
            placeholder="Select Color"
            loading={loadingColors}
            onChange={handleColorChange}
            disabled={!typeId}
            showSearch
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .includes(input.toLowerCase()) || false
            }
          >
            {colors.map((color: StockColor) => (
              <Option key={color.color_id} value={color.color_id}>
                {color.color_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Size"
          name="size_id"
          rules={[{ required: true, message: "Size is required" }]}
        >
          <Select
            placeholder="Select Size"
            loading={loadingSizes}
            disabled={!colorId}
            showSearch
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .includes(input.toLowerCase()) || false
            }
          >
            {sizes.map((size: StockSize) => (
              <Option key={size.size_id} value={size.size_id}>
                {size.size_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="add_quantity"
          rules={[{ required: true, message: "Quantity is required" }]}
        >
          <InputNumber
            min={1}
            placeholder="Enter quantity"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewItemModal;
