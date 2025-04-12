import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Typography,
  message,
  Modal,
  Card,
  Row,
  Col,
} from "antd";
import { useRequest } from "ahooks";
import {
  fetchInboundDetail,
  addInboundItem,
  submitInbound,
  deleteInboundItem,
  cancelInbound,
} from "../../services/inboundDetailService";
import AddNewItemModal from "../modals/AddNewItemModal";

const { Title, Text } = Typography;

const InboundDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const { data, loading, refresh } = useRequest(
    () => fetchInboundDetail(Number(id)),
    {
      onError: () => {
        message.error("Failed to fetch inbound details");
      },
    }
  );

  const handleAddItem = async (values: {
    stock_id: number;
    add_quantity: number;
  }) => {
    try {
      await addInboundItem(Number(id), values);
      message.success("Item added successfully");
      setIsAddItemModalVisible(false);
      refresh();
    } catch {
      message.error("Failed to add item");
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    Modal.confirm({
      title: "Delete Item",
      content: "Are you sure you want to delete this item?",
      onOk: async () => {
        try {
          await deleteInboundItem(itemId);
          message.success("Item deleted successfully");
          refresh();
        } catch {
          message.error("Failed to delete item");
        }
      },
    });
  };

  const handleSubmit = async () => {
    Modal.confirm({
      title: "Submit Inbound",
      content: "Are you sure you want to submit this inbound?",
      onOk: async () => {
        try {
          setIsSubmitting(true);
          await submitInbound(Number(id));
          message.success("Inbound submitted successfully");
          refresh();
        } catch {
          message.error("Failed to submit inbound");
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  const handleCancelInbound = async () => {
    Modal.confirm({
      title: "Cancel Inbound",
      content: "Are you sure you want to cancel this inbound?",
      onOk: async () => {
        try {
          setIsCancelling(true);
          await cancelInbound(Number(id));
          message.success("Inbound canceled successfully");
          navigate("/inbound-list/");
        } catch {
          message.error("Failed to cancel inbound");
        } finally {
          setIsCancelling(false);
        }
      },
    });
  };

  const columns = [
    { title: "Type", dataIndex: "type_name", key: "type_name" },
    { title: "Color", dataIndex: "color_name", key: "color_name" },
    { title: "Size", dataIndex: "size_name", key: "size_name" },
    { title: "Quantity", dataIndex: "add_quantity", key: "add_quantity" },
    ...(data?.inbound?.status !== "COMPLETED"
      ? [
          {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
              <Button
                danger
                size="small"
                onClick={() => handleDeleteItem(record.stock_id)}
              >
                Delete
              </Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <Title level={2}>Inbound Detail</Title>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Status:</Text>
            <br />
            <Text>{data?.inbound?.status || "N/A"}</Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Supplier Name:</Text>
            <br />
            <Text>{data?.inbound?.supplier_name || "N/A"}</Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Notes:</Text>
            <br />
            <Text>{data?.inbound?.notes || "N/A"}</Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Created At:</Text>
            <br />
            <Text>{data?.inbound?.created_at || "N/A"}</Text>
          </Col>
        </Row>
      </Card>
      <Table
        columns={columns}
        dataSource={data?.items}
        loading={loading}
        rowKey="stock_id"
        pagination={false}
      />
      {data?.inbound?.status !== "COMPLETED" ? (
        <Row justify="space-between" style={{ marginTop: 16 }}>
          <Col>
            <Button
              variant="outlined"
              onClick={() => setIsAddItemModalVisible(true)}
            >
              Add New Item
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ marginLeft: 8 }}
              disabled={!data?.items?.length || isSubmitting}
            >
              Submit
            </Button>
          </Col>
          <Col>
            <Button
              type="default"
              danger
              onClick={handleCancelInbound}
              loading={isCancelling}
            >
              Cancel Inbound
            </Button>
          </Col>
        </Row>
      ) : (
        <Button
          type="default"
          onClick={() => navigate("/inbound-list/")}
          style={{ marginTop: 16 }}
        >
          Go Back
        </Button>
      )}
      <AddNewItemModal
        visible={isAddItemModalVisible}
        onCancel={() => setIsAddItemModalVisible(false)}
        onSubmit={handleAddItem}
      />
    </>
  );
};

export default InboundDetail;
