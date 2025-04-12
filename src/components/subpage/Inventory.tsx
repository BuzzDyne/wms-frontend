import React, { useState } from "react";
import { Table, Typography, Select, Button, message, Row, Col } from "antd";
import { useRequest } from "ahooks";
import {
  getInventory,
  Stock,
  createStock,
} from "../../services/inventoryService";
import CreateStockModal from "../modals/CreateStockModal";
import { AxiosError } from "axios";
import "./Inventory.css"; // Import the new CSS file

const { Title } = Typography;
const { Option } = Select;

const Inventory: React.FC = () => {
  const { data: inventory, loading, refresh } = useRequest(getInventory);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTypeChange = (value: string | undefined) => {
    setSelectedType(value ?? null);
  };

  const handleCreateStock = async (values: {
    type_id: number;
    size_id: number;
    color_id: number;
  }) => {
    try {
      await createStock(values);
      message.success("Stock created successfully!");
      setIsModalVisible(false);
      refresh();
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data?.detail &&
        typeof error.response.data.detail === "string" &&
        error.response.data.detail.endsWith("already exists.")
      ) {
        message.error(error.response.data.detail);
      } else {
        message.error("Failed to create stock.");
      }
    }
  };

  const filteredInventory =
    inventory?.filter(
      (item) => !selectedType || item.type_name === selectedType
    ) || [];

  // Helper to compute how many rows match a condition starting from a given index
  const getRowSpan = (
    data: Stock[],
    startIndex: number,
    level: "type" | "color"
  ): number => {
    const current = data[startIndex];
    let count = 0;

    for (let i = startIndex; i < data.length; i++) {
      const compare = data[i];

      if (level === "type") {
        if (compare.type_name !== current.type_name) break;
      }

      if (level === "color") {
        if (
          compare.type_name !== current.type_name ||
          compare.color_name !== current.color_name
        )
          break;
      }

      count++;
    }

    return count;
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type_name",
      render: (_: string, row: Stock, index: number) => {
        const isFirstOfGroup =
          index === 0 ||
          filteredInventory[index - 1].type_name !== row.type_name;

        if (isFirstOfGroup) {
          const rowSpan = getRowSpan(filteredInventory, index, "type");
          return { children: row.type_name, props: { rowSpan } };
        }

        return { children: null, props: { rowSpan: 0 } };
      },
    },
    {
      title: "Color",
      dataIndex: "color_name",
      render: (_: string, row: Stock, index: number) => {
        const isFirstOfGroup =
          index === 0 ||
          filteredInventory[index - 1].type_name !== row.type_name ||
          filteredInventory[index - 1].color_name !== row.color_name;

        if (isFirstOfGroup) {
          const rowSpan = getRowSpan(filteredInventory, index, "color");
          return { children: row.color_name, props: { rowSpan } };
        }

        return { children: null, props: { rowSpan: 0 } };
      },
    },
    {
      title: "Size",
      dataIndex: "size_name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
  ];

  return (
    <div>
      <Title level={2}>Inventory</Title>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Select<string>
            showSearch
            allowClear
            placeholder="Select Type"
            onChange={handleTypeChange}
            style={{ width: 200 }}
            optionFilterProp="children"
            filterOption={(input, option) => {
              const label =
                typeof option?.children === "string" ? option.children : "";
              return label.toLowerCase().includes(input.toLowerCase());
            }}
          >
            {Array.from(new Set(inventory?.map((item) => item.type_name))).map(
              (type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              )
            )}
          </Select>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Create New Stock
          </Button>
        </Col>
      </Row>

      <Table
        className="custom-table" // Add a custom class to the table
        dataSource={filteredInventory}
        columns={columns}
        rowKey="stock_id"
        loading={loading}
        pagination={false}
        rowClassName={(record, index) => {
          const typeIndexMap = new Map<string, number>();
          let currentIndex = 0;
          for (let item of filteredInventory) {
            if (!typeIndexMap.has(item.type_name)) {
              typeIndexMap.set(item.type_name, currentIndex++);
            }
          }

          const typeClassIndex = typeIndexMap.get(record.type_name) ?? 0;
          return typeClassIndex % 2 === 0 ? "row-light" : "row-dark";
        }}
      />

      <CreateStockModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleCreateStock}
      />
    </div>
  );
};

export default Inventory;
