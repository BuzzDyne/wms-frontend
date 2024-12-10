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
  message,
  Select,
  Input,
  Spin,
  Card,
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
import { EcomUploadFileIsLoading } from "../../models/types";

const { Title } = Typography;
const { Option } = Select;

const NewPicklist: React.FC = () => {
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
        message.warning(t("picklist.message.picklist_exist_warning"), 5);
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

  return (
    <>
      {isCheckingInit && (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      )}

      <Title level={2} style={{ marginTop: "0" }}>
        New Picklist
      </Title>
      <CardContent>
        {renderUploadSection("tik_file_id", "TIK", "Tiktok File")}
        {renderUploadSection("tok_file_id", "TOK", "Tokopedia File")}
        {renderUploadSection("sho_file_id", "SHO", "Shopee File")}
        {renderUploadSection("laz_file_id", "LAZ", "Lazada File")}
      </CardContent>
      <Title level={3}>Unmapped Items</Title>
      <CardContent>
        <Table />
      </CardContent>
      <Title level={3}>Mapped Items</Title>
      <CardContent>
        <Table />
      </CardContent>
    </>
  );
};

export default NewPicklist;
