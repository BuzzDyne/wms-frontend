import {
  Button,
  Col,
  Input,
  Row,
  Space,
  Table,
  Typography,
  Modal,
  message,
  Select,
} from "antd";
import CardContent from "../common/CardContent";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import UserCreationModal from "../modals/UserCreationModal";
import { fetchUsers, deleteUser } from "../../services/userServices";
import { useRequest } from "ahooks";
import UserResetPasswordModal from "../modals/UserResetPasswordModal";
import { AxiosError } from "axios";

const { Title } = Typography;

const roleMapping: { [key: number]: string } = {
  1: "Owner",
  2: "Warehouse",
  3: "Ecommerce",
  4: "Packer",
};

const AccountManagement = () => {
  const [isUserCreationOpen, setIsUserCreationOpen] = useState<boolean>(false);
  const [isUserResetPwdOpen, setIsUserResetPwdOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const { data: users, refresh, loading } = useRequest(fetchUsers);

  const filteredUsers = users?.filter((user: any) => {
    const matchesUsername = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? user.role_id === selectedRole : true;
    return matchesUsername && matchesRole;
  });

  const handleDeleteUser = (userId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteUser(userId);
          message.success("User deleted successfully.");
          refresh();
        } catch (error) {
          if (
            error instanceof AxiosError &&
            error.response?.data?.detail &&
            typeof error.response.data.detail === "string" &&
            error.response.data.detail.endsWith("last active owner.")
          ) {
            message.error(error.response.data.detail);
          } else {
            message.error("Failed to delete user.");
          }
        }
      },
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedRole(null);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      render: (roleId: number) => roleMapping[roleId] || "Unknown",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            className="outlined-blue"
            onClick={() => {
              setSelectedUserId(record.id);
              setIsUserResetPwdOpen(true);
            }}
          >
            Reset Password
          </Button>
          <Button
            className="solid-red"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
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
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col>
            <Space size="middle">
              <Input
                placeholder="Search user"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select
                placeholder="Filter by role"
                value={selectedRole}
                onChange={(value) => setSelectedRole(value)}
                style={{ width: 150 }}
                allowClear
              >
                {Object.entries(roleMapping).map(([id, name]) => (
                  <Select.Option key={id} value={Number(id)}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
              <Button onClick={handleResetFilters}>Reset Filter</Button>
            </Space>
          </Col>
          <Col>
            <Button
              className="solid-blue"
              icon={<PlusOutlined />}
              onClick={() => setIsUserCreationOpen(true)}
            />
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        <Table
          dataSource={filteredUsers}
          columns={columns}
          loading={loading}
          rowKey="id"
        />
      </CardContent>

      <UserCreationModal
        isOpen={isUserCreationOpen}
        onClose={() => {
          setIsUserCreationOpen(false);
          refresh();
        }}
      />

      <UserResetPasswordModal
        isOpen={isUserResetPwdOpen}
        onClose={() => setIsUserResetPwdOpen(false)}
        userId={selectedUserId!}
      />
    </>
  );
};

export default AccountManagement;
