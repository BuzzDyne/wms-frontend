import React, { useState } from "react";
import { Table, Typography, Button, message, Modal, Input, Space } from "antd";
import CardContent from "../common/CardContent";
import { useRequest } from "ahooks";
import {
  fetchStockMappings,
  deleteStockMapping,
} from "../../services/mappingServices";

const { Title } = Typography;

const InventorySetting: React.FC = () => {
  const {
    data: stockMappings,
    loading,
    refresh,
  } = useRequest(fetchStockMappings);

  const [filters, setFilters] = useState({
    stock_type: "",
    stock_color: "",
    stock_size: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ stock_type: "", stock_color: "", stock_size: "" });
  };

  const filteredData = stockMappings?.filter((item: any) => {
    return (
      (!filters.stock_type ||
        item.stock_type
          .toLowerCase()
          .includes(filters.stock_type.toLowerCase())) &&
      (!filters.stock_color ||
        item.stock_color
          .toLowerCase()
          .includes(filters.stock_color.toLowerCase())) &&
      (!filters.stock_size ||
        item.stock_size
          .toLowerCase()
          .includes(filters.stock_size.toLowerCase()))
    );
  });

  const handleDelete = (mappingId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this mapping?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteStockMapping(mappingId);
          message.success("Mapping deleted successfully.");
          refresh(); // Refresh the data
        } catch (error) {
          message.error("Failed to delete mapping.");
        }
      },
    });
  };

  const columns = [
    // Removed Stock ID column
    {
      title: "Stock Type",
      dataIndex: "stock_type",
      key: "stock_type",
    },
    {
      title: "Stock Color",
      dataIndex: "stock_color",
      key: "stock_color",
    },
    {
      title: "Stock Size",
      dataIndex: "stock_size",
      key: "stock_size",
    },
  ];

  const expandedRowRender = (record: any) => {
    const innerColumns = [
      { title: "Ecom Code", dataIndex: "ecom_code", key: "ecom_code" },
      {
        title: "Field 1",
        dataIndex: "field1",
        key: "field1",
        render: (text: string) => (
          <Typography.Text ellipsis={{ tooltip: text }}>{text}</Typography.Text>
        ),
      },
      {
        title: "Field 2",
        dataIndex: "field2",
        key: "field2",
        render: (text: string) => (
          <Typography.Text ellipsis={{ tooltip: text }}>{text}</Typography.Text>
        ),
      },
      {
        title: "Field 3",
        dataIndex: "field3",
        key: "field3",
        render: (text: string) => (
          <Typography.Text ellipsis={{ tooltip: text }}>{text}</Typography.Text>
        ),
      },
      {
        title: "Field 4",
        dataIndex: "field4",
        key: "field4",
        render: (text: string) => (
          <Typography.Text ellipsis={{ tooltip: text }}>{text}</Typography.Text>
        ),
      },
      {
        title: "Field 5",
        dataIndex: "field5",
        key: "field5",
        render: (text: string) => (
          <Typography.Text ellipsis={{ tooltip: text }}>{text}</Typography.Text>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, mapping: any) => (
          <Button danger onClick={() => handleDelete(mapping.mapping_id)}>
            Delete
          </Button>
        ),
      },
    ];

    return (
      <Table
        dataSource={record.mappings}
        columns={innerColumns}
        pagination={false}
        rowKey="mapping_id"
        size="small"
      />
    );
  };

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        Inventory Mapping
      </Title>
      <CardContent>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search Stock Type"
            value={filters.stock_type}
            onChange={(e) => handleFilterChange("stock_type", e.target.value)}
          />
          <Input
            placeholder="Search Stock Color"
            value={filters.stock_color}
            onChange={(e) => handleFilterChange("stock_color", e.target.value)}
          />
          <Input
            placeholder="Search Stock Size"
            value={filters.stock_size}
            onChange={(e) => handleFilterChange("stock_size", e.target.value)}
          />
          <Button onClick={resetFilters}>Reset Filters</Button>
        </Space>
        <Table
          dataSource={filteredData}
          columns={columns}
          expandable={{ expandedRowRender }}
          loading={loading}
          rowKey="stock_id"
          size="small"
        />
      </CardContent>
    </>
  );
};

export default InventorySetting;
