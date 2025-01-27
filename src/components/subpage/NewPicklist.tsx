import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Typography,
  Upload,
  Modal,
  App as AntdApp,
  Spin,
  Tag,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CardContent from "../common/CardContent";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  CreatePicklistResponse,
  GetListPicklistResponse,
  PicklistDashboardResponse,
} from "../../models/api";
import {
  MAX_FILE_SIZE_MB,
  PICKLIST_STATUS_MAPPING,
  XLS_FILE_FORMAT,
} from "../../utils/constant";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  EcomUploadFileIsLoading,
  PicklistItemDisplayTableData,
  UnmappedItemTableData,
} from "../../models/types";
import { TableProps } from "antd/lib";
import PicklistItemDefineMappingModal from "../modal/PicklistItemDefineMappingModal";

const { Title } = Typography;

const NewPicklist: React.FC = () => {
  const { message } = AntdApp.useApp();
  const [isDefineModalOpen, setIsDefineModalOpen] = useState<boolean>(false);
  const [defineItem, setDefineItem] = useState<UnmappedItemTableData>();

  const handleOpenDefinemodal = (item: UnmappedItemTableData) => {
    setDefineItem(item);
    setIsDefineModalOpen(true);
  };

  const handleDefineModalClose = () => {
    setIsDefineModalOpen(false);
    fetchPicklistDashboardData(picklistId);
  };

  const [isCheckingInit, setIsCheckingInit] = useState<boolean>(true);
  const [picklistId, setPicklistId] = useState<number>(0);
  const [btnsIsLoading, setBtnsIsLoading] = useState<EcomUploadFileIsLoading>({
    TIK: false,
    TOK: false,
    SHO: false,
    LAZ: false,
  });
  const [dashboardData, setDashboardData] =
    useState<PicklistDashboardResponse | null>(null);

  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const createDraftPicklist = async () => {
    try {
      const res = await axiosPrivate.post<CreatePicklistResponse>("/picklist");
      setPicklistId(res.data.data.id);
    } catch (error: unknown) {
      message.error("Failed to create draft picklist");
      navigate("/");
    }
  };

  const checkLatestDraftPicklist = async () => {
    setIsCheckingInit(true);
    try {
      const response = await axiosPrivate.get<GetListPicklistResponse>(
        "/picklist/list_picklists",
        {
          params: {
            page: 1,
            size: 1,
            picklist_status: PICKLIST_STATUS_MAPPING.ON_DRAFT.value,
          },
        }
      );
      if (response.data.data.length === 0) {
        createDraftPicklist();
      } else {
        message.warning("Continue from previous draft", 3);
        setPicklistId(response.data.data[0].id);
      }
    } catch (error: unknown) {
      message.error("Failed to fetch picklists");
    }
  };

  const fetchPicklistDashboardData = async (id: number) => {
    try {
      const response = await axiosPrivate.get<PicklistDashboardResponse>(
        `/picklist/${id}/dashboard`
      );
      setDashboardData(response.data);
    } catch (error: unknown) {
      message.error("Failed to fetch table data");
    } finally {
      setIsCheckingInit(false);
    }
  };

  useEffect(() => {
    checkLatestDraftPicklist();
  }, []);

  useEffect(() => {
    if (picklistId) {
      fetchPicklistDashboardData(picklistId);
    }
  }, [picklistId]);

  const handleUpload = async (
    file: File,
    ecomCode: string,
    fieldKey: keyof PicklistDashboardResponse
  ) => {
    setBtnsIsLoading((prevState) => ({ ...prevState, [ecomCode]: true }));

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      message.error("File must be smaller than 10MB!");
      return;
    }

    if (file.type !== XLS_FILE_FORMAT) {
      message.error("Invalid file type. Only XLSX files are allowed!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(Array.from(formData.entries()));

      const response = await axiosPrivate.post(
        `/picklist/${picklistId}/upload/${ecomCode}`,
        formData
      );

      message.success("File uploaded successfully");
      fetchPicklistDashboardData(picklistId);
    } catch (error: any) {
      if (error.response?.data?.detail) {
        message.error(error.response.data.detail[0]?.msg || "Upload failed");
      } else {
        message.error("Failed to upload file");
      }
    } finally {
      // Set the loading state to false after the upload is done or if an error occurs
      setBtnsIsLoading((prevState) => ({ ...prevState, [ecomCode]: false }));
    }
  };

  const handleDelete = async (
    ecomCode: string,
    fieldKey: keyof PicklistDashboardResponse
  ) => {
    Modal.confirm({
      title: "Are you sure you want to delete this file?",
      onOk: async () => {
        try {
          setIsCheckingInit(true);
          await axiosPrivate.delete(
            `/picklist/${picklistId}/file/ecom_code/${ecomCode}`
          );
          message.success("File deleted successfully");
          fetchPicklistDashboardData(picklistId);
        } catch (error: unknown) {
          message.error("Failed to delete file");
          setIsCheckingInit(false);
        }
      },
    });
  };

  const handleClear = async () => {
    Modal.confirm({
      title: "Are you sure you want to reset this draft?",
      onOk: async () => {
        try {
          setIsCheckingInit(true);
          await axiosPrivate.delete(`/picklist/${picklistId}/file`);
          message.success("Picklist reset successfully");
          fetchPicklistDashboardData(picklistId);
        } catch (error: unknown) {
          message.error("Failed to reset picklist");
          setIsCheckingInit(false);
        }
      },
    });
  };

  const handleItemExclude = async (item_id: number) => {
    Modal.confirm({
      title: "Are you sure you want to exclude this item?",
      onOk: async () => {
        try {
          await axiosPrivate.put(
            `/picklist/${picklistId}/picklistitem/${item_id}/exclude`
          );
          message.success("Item excluded successfully");
          fetchPicklistDashboardData(picklistId);
        } catch (error: unknown) {
          message.error("Failed to exclude item");
        }
      },
    });
  };

  const handleItemInclude = async (item_id: number) => {
    Modal.confirm({
      title: "Are you sure you want to include this item?",
      onOk: async () => {
        try {
          await axiosPrivate.put(
            `/picklist/${picklistId}/picklistitem/${item_id}/include`
          );
          await axiosPrivate.post(
            `/picklist/${picklistId}/repeat-item-mapping`,
            {}
          );
          message.success("Item included successfully");
          fetchPicklistDashboardData(picklistId);
        } catch (error: unknown) {
          message.error("Failed to include item");
        }
      },
    });
  };

  const renderUploadSection = (
    fieldKey: keyof PicklistDashboardResponse,
    ecomCode: keyof EcomUploadFileIsLoading,
    label: string
  ) => {
    const isFileUploaded = dashboardData && dashboardData[fieldKey] !== null;
    const isLoading = btnsIsLoading[ecomCode];
    return (
      <Row gutter={[16, 16]} align="middle">
        <Col span={4}>
          <Typography.Text>{label}</Typography.Text>
        </Col>
        <Col>
          {isFileUploaded ? (
            <Space>
              <span>File uploaded</span>
              <Button
                type="link"
                style={{ color: "red" }}
                onClick={() => handleDelete(ecomCode, fieldKey)}
              >
                Delete
              </Button>
            </Space>
          ) : (
            <Upload
              beforeUpload={(fileWrapper) => {
                // Extract the actual file
                console.log(`insideBeforeUpload, fileWrapper:`, fileWrapper);
                const file = fileWrapper as File;
                handleUpload(file, ecomCode, fieldKey);
                return false;
              }}
              maxCount={1}
              accept=".xlsx"
            >
              <Button
                loading={isLoading}
                disabled={isLoading}
                icon={<UploadOutlined />}
              >
                Upload File
              </Button>
            </Upload>
          )}
        </Col>
      </Row>
    );
  };

  const unmappedTableColumns: TableProps<UnmappedItemTableData>["columns"] = [
    {
      title: "ID",
      dataIndex: "item_id",
      key: "item_id",
    },
    {
      title: "Platform",
      key: "ecom_code",
      dataIndex: "ecom_code",
      render: (_, { ecom_code }) => <>{<Tag>{ecom_code}</Tag>}</>,
    },
    {
      title: "Name",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "Exclude?",
      dataIndex: "is_excluded",
      key: "is_excluded",
      render: (_, { is_excluded }) => (
        <>
          {is_excluded ? (
            <span style={{ color: "red" }}>Yes</span>
          ) : (
            <span>No</span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" key={record.item_id}>
          {record.is_excluded ? (
            // <a onClick={() => handleItemInclude(record.item_id)}>Include</a>
            <Button
              size="small"
              className="solid-blue"
              onClick={() => handleItemInclude(record.item_id)}
            >
              Include
            </Button>
          ) : (
            <>
              <Button
                size="small"
                className="solid-red"
                onClick={() => handleItemExclude(record.item_id)}
              >
                Exclude
              </Button>
              <a onClick={() => handleOpenDefinemodal(record)}>
                Define Mapping
              </a>
            </>
          )}
        </Space>
      ),
    },
  ];

  const picklistItemDisplayTableColumns: TableProps<PicklistItemDisplayTableData>["columns"] =
    [
      Table.EXPAND_COLUMN,
      {
        title: "Type",
        dataIndex: "product_type",
        key: "product_type",
      },
      {
        title: "Color",
        key: "product_color",
        dataIndex: "product_color",
      },
      {
        title: "Size",
        dataIndex: "product_size",
        key: "product_size",
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count",
      },
      // {
      //   title: "Action",
      //   key: "action",
      //   render: (_, record) => (
      //     <Space size="middle">
      //       <a onClick={() => alert()}>Include</a>
      //     </Space>
      //   ),
      // },
    ];

  return (
    <>
      {isCheckingInit ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      ) : (
        <>
          <Title level={2} style={{ marginTop: "0" }}>
            Picklist Tool
          </Title>
          <CardContent>
            {renderUploadSection("tik_file_id", "TIK", "Tiktok")}
            {renderUploadSection("tok_file_id", "TOK", "Tokopedia")}
            {renderUploadSection("sho_file_id", "SHO", "Shopee")}
            {renderUploadSection("laz_file_id", "LAZ", "Lazada")}
            <br />
            <Button danger onClick={handleClear}>
              Clear
            </Button>
          </CardContent>
          <Title level={3}>Unmapped Items</Title>
          <CardContent>
            <Table
              columns={unmappedTableColumns}
              dataSource={dashboardData?.unmapped_items}
            />
          </CardContent>
          <Title level={3}>Mapped Items</Title>
          <CardContent>
            <Table
              rowKey={(record) => record.stock_id}
              expandable={{
                expandedRowRender: (record) => (
                  <>
                    {Object.keys(record.items).map((key) => (
                      <div key={key} style={{ marginBottom: "16px" }}>
                        <h4>
                          {key === "TIK" && "TIKTOK"}
                          {key === "TOK" && "TOKOPEDIA"}
                          {key === "SHO" && "SHOPEE"}
                          {key === "LAZ" && "LAZADA"}
                        </h4>
                        <Table
                          columns={[
                            {
                              title: "ID",
                              dataIndex: "item_id",
                              key: "item_id",
                              render: (text) => <>{text}</>,
                            },
                            {
                              title: "Ecom Order ID",
                              dataIndex: "ecom_order_id",
                              key: "ecom_order_id",
                            },
                            {
                              title: "Name",
                              dataIndex: "item_name",
                              key: "item_name",
                              render: (text) => <>{text}</>,
                            },
                            // {
                            //   title: "Excluded",
                            //   dataIndex: "is_excluded",
                            //   key: "is_excluded",
                            //   render: (text) => <>{text ? "Yes" : "No"}</>,
                            // },
                          ]}
                          dataSource={record.items[key]}
                          pagination={false}
                          rowKey="item_id"
                        />
                      </div>
                    ))}
                  </>
                ),
              }}
              columns={picklistItemDisplayTableColumns}
              dataSource={dashboardData?.stocks}
            />
          </CardContent>
        </>
      )}

      <PicklistItemDefineMappingModal
        isOpen={isDefineModalOpen}
        onClose={handleDefineModalClose}
        item={defineItem!}
        picklist_id={picklistId}
      />
    </>
  );
};

export default NewPicklist;
