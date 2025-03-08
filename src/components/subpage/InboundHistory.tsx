import React, { useState } from "react";
import { Col, Row, Table, Typography, Button, Select } from "antd";
import CardContent from "../common/CardContent";

const { Title } = Typography;
const { Option } = Select;

const InboundHistory: React.FC = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleFilterClick = () => {
    // Dummy filter action
  };

  const handleResetClick = () => {
    setStatus(undefined);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Inbound Date",
      dataIndex: "inbound_date",
      key: "inbound_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <span>
          <Button size="small">View</Button>
        </span>
      ),
    },
  ];

  const data = [
    {
      id: "1",
      inbound_date: "2023-10-01",
      status: "Completed",
    },
    {
      id: "2",
      inbound_date: "2023-10-02",
      status: "Pending",
    },
  ];

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        Inbound History
      </Title>
      <CardContent>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Select
              placeholder="Select Status"
              style={{ width: "100%" }}
              onChange={handleStatusChange}
              value={status}
            >
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button
              className="solid-blue"
              onClick={handleFilterClick}
              style={{ marginRight: 8 }}
            >
              Filter
            </Button>
            <Button onClick={handleResetClick}>Reset</Button>
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: 1,
            pageSize: 10,
            total: data.length,
            showSizeChanger: true,
          }}
          rowKey="id"
        />
      </CardContent>
    </>
  );
};

export default InboundHistory;
