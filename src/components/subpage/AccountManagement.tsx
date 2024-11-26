import { Button, Col, Input, Row, Space, Table, Typography } from "antd";
import CardContent from "../common/CardContent";
import { DeleteFilled, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import UserCreationModal from "../modal/UserCreationModal";
import ConfirmModal from "../modal/ConfirmModal";

const { Title } = Typography;

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const AccountManagement = () => {
  const [isUserCreationOpen, setIsUserCreationOpen] = useState<boolean>(false);
  const [isUserDeletionOpen, setIsUserDeletionOpen] = useState<boolean>(false);

  const showUserCreationModal = () => {
    setIsUserCreationOpen(true);
  };

  const handleUserCreationModalCancel = () => {
    setIsUserCreationOpen(false);
  };

  const showUserDeletionModal = () => {
    setIsUserDeletionOpen(true);
  };

  const handleUserDeletionModalCancel = () => {
    setIsUserDeletionOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button className="outlined-blue">Reset Password</Button>
          <Button
            className="solid-red"
            icon={<DeleteOutlined />}
            onClick={showUserDeletionModal}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        Account Management
      </Title>
      <CardContent>
        <Row justify={"space-between"} align={"middle"}>
          <Col>
            <Input placeholder="Search user" />
          </Col>
          <Col>
            <Button
              className="solid-blue"
              icon={<PlusOutlined />}
              onClick={showUserCreationModal}
            />
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        <Table dataSource={dataSource} columns={columns} />;
      </CardContent>

      <UserCreationModal
        isOpen={isUserCreationOpen}
        onClose={handleUserCreationModalCancel}
      />

      <ConfirmModal
        isOpen={isUserDeletionOpen}
        bodyText="Are you sure to pay 100 million USD to Ricky?"
        titleText="Are you nuts?"
        onClose={handleUserDeletionModalCancel}
        okText="CRAZY!"
        cancelText="Cancel"
        onSubmit={() => {}}
      />
    </>
  );
};

export default AccountManagement;
