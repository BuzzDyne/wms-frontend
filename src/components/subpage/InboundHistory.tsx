import React, { useState } from "react";
import {
  Col,
  Row,
  Table,
  Typography,
  Select,
  message,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";
import CardContent from "../common/CardContent";
import { fetchInbounds, createInbound } from "../../services/inboundService";
import { error } from "console";
import { AxiosError } from "axios";

const { Title } = Typography;
const { Option } = Select;

const InboundHistory: React.FC = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    data: allData,
    loading,
    refresh,
  } = useRequest(fetchInbounds, {
    onError: () => {
      message.error("Failed to fetch inbound data");
    },
  });

  const { run: handleCreateInbound, loading: creatingInbound } = useRequest(
    async (payload: { supplier_name: string; notes: string }) =>
      createInbound(payload),
    {
      manual: true,
      onSuccess: (data) => {
        message.success("Inbound created successfully");
        setIsModalVisible(false);
        form.resetFields();
        navigate(`/inbound-list/detail/${data.inbound_id}`);
      },
      onError: (error) => {
        if (
          error instanceof AxiosError &&
          error.response?.data?.detail &&
          typeof error.response.data.detail === "string" &&
          error.response.data.detail.endsWith("date.")
        ) {
          message.error(error.response.data.detail, 3);
        } else {
          message.error("Failed to create inbound.");
        }
      },
    }
  );

  const filteredData = status
    ? allData?.filter(
        (item: { status: string }) => item.status.toLowerCase() === status
      )
    : allData;

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleContinue = (id: number) => {
    navigate(`/inbound-list/detail/${id}`);
  };

  const handleView = (id: number) => {
    navigate(`/inbound-list/detail/${id}`);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmitModal = () => {
    form
      .validateFields()
      .then((values) => {
        handleCreateInbound(values);
      })
      .catch(() => {
        message.error("Please fill in all required fields");
      });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier_name",
      key: "supplier_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <span>
          {record.status === "PENDING" ? (
            <Button size="small" onClick={() => handleContinue(record.id)}>
              Continue
            </Button>
          ) : (
            <Button size="small" onClick={() => handleView(record.id)}>
              View
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        Inbound List
      </Title>
      <CardContent>
        <Row gutter={[16, 16]} justify="space-between">
          <Col span={8}>
            <Select
              placeholder="Select Status"
              style={{ width: "100%" }}
              onChange={handleStatusChange}
              value={status}
              allowClear
            >
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Col>
          <Col>
            <Button type="primary" onClick={handleOpenModal}>
              Create New Inbound
            </Button>
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            current: 1,
            pageSize: 10,
            total: filteredData?.length || 0,
            showSizeChanger: true,
          }}
          rowKey="id"
        />
      </CardContent>

      <Modal
        title="Create New Inbound"
        open={isModalVisible}
        onCancel={handleCancelModal}
        onOk={handleSubmitModal}
        confirmLoading={creatingInbound}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Supplier Name"
            name="supplier_name"
            rules={[{ required: true, message: "Supplier name is required" }]}
          >
            <Input placeholder="Enter supplier name" />
          </Form.Item>
          <Form.Item
            label="Notes"
            name="notes"
            rules={[{ required: true, message: "Notes are required" }]}
          >
            <Input.TextArea placeholder="Enter notes" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InboundHistory;
