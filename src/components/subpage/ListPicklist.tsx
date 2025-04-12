import React, { useState, useEffect } from "react";
import { Col, Row, Table, Typography, Button, Select, message } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import CardContent from "../common/CardContent";
import { GetListPicklistResponse, Picklist } from "../../models/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formatDate, prettyPicklistStatus } from "../../utils/utils";
import { PlusOutlined } from "@ant-design/icons";
import { PICKLIST_STATUS_MAPPING } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const { Option } = Select;

const ListPicklist: React.FC = () => {
  const [data, setData] = useState<Picklist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNew, setLoadingNew] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const axiosPrivate = useAxiosPrivate();

  const fetchPicklists = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get<GetListPicklistResponse>(
        "/picklist/list_picklists",
        {
          params: {
            page,
            size,
            picklist_status: status,
          },
        }
      );
      setData(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      message.error("Failed to fetch picklists");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePicklist = async () => {
    setLoadingNew(true);

    try {
      //   const response = await axiosPrivate.get<GetListPicklistResponse>(
      //     "/picklist/list_picklists",
      //     {
      //       params: {
      //         page: 1,
      //         size: 1,
      //         picklist_status: PICKLIST_STATUS_MAPPING.ON_DRAFT.value,
      //       },
      //     }
      //   );
      navigate("/new-picklist");
      //   if (response.data.data.length === 0) {
      //     navigate("/picklist-creation");
      //   } else {
      //     message.warning(t("picklist.message.picklist_exist_warning"), 5);
      //   }
    } catch (error) {
      message.error("Failed to fetch picklists");
    } finally {
      setLoadingNew(false);
    }
  };

  useEffect(() => {
    fetchPicklists();
  }, [page, size, triggerFetch]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setSize(pagination.pageSize || 100);
  };

  const handleFilterClick = () => {
    setPage(1);
    setTriggerFetch((prev) => !prev);
  };

  const handleResetClick = () => {
    setStatus(undefined);
    setPage(1);
    setSize(100);
    setTriggerFetch((prev) => !prev);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Draft Create Date",
      dataIndex: "draft_create_dt",
      key: "draft_create_dt",
      render: formatDate,
    },
    {
      title: "Draft Cancel Date",
      dataIndex: "draft_cancel_dt",
      key: "draft_cancel_dt",
      render: formatDate,
    },
    {
      title: "Creation Date",
      dataIndex: "creation_dt",
      key: "creation_dt",
      render: formatDate,
    },
    {
      title: "Pick Start Date",
      dataIndex: "pick_start_dt",
      key: "pick_start_dt",
      render: formatDate,
    },
    {
      title: "Completion Date",
      dataIndex: "completion_dt",
      key: "completion_dt",
      render: formatDate,
    },
    {
      title: "Picklist Status",
      dataIndex: "picklist_status",
      key: "picklist_status",
      render: (status: string) => prettyPicklistStatus(status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Picklist) => {
        const { picklist_status } = record;

        return (
          <span>
            <Button size="small">Edit</Button>

            {/* {picklist_status === "ON_DRAFT" && (
              <Button type="link">Draft</Button>
            )}

            {picklist_status === "CANCELLED" && (
              <Button type="link">Cancelled</Button>
            )}

            {picklist_status === "CREATED" && (
              <Button type="link">Created</Button>
            )}

            {picklist_status === "ON_PICKING" && (
              <Button type="link">On Picking</Button>
            )}

            {picklist_status === "COMPLETED" && (
              <Button type="link">Completed</Button>
            )} */}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        Picklist
      </Title>
      <CardContent>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Select
              placeholder="Select Picklist Status"
              style={{ width: "100%" }}
              onChange={handleStatusChange}
              value={status}
            >
              {Object.entries(PICKLIST_STATUS_MAPPING).map(
                ([value, { label }]) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                )
              )}
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
          <Col span={12} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreatePicklist}
              loading={loadingNew}
            >
              Create New Picklist
            </Button>
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: page,
            pageSize: size,
            total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
          rowKey="id"
        />
      </CardContent>
    </>
  );
};

export default ListPicklist;
