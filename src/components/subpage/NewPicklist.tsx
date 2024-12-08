import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Typography,
  Upload,
  UploadProps,
  message,
  Select,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CardContent from "../common/CardContent";

const { Title } = Typography;
const { Option } = Select;

interface DataType {
  key: string;
  no: string;
  productType: string;
  color: string;
  size: string;
  count: number;
}

const dataSource: DataType[] = [
  {
    key: "1",
    no: "1",
    productType: "Hoodie Jumper",
    color: "Black",
    size: "M",
    count: 2,
  },
  {
    key: "2",
    no: "2",
    productType: "Hoodie Zipper",
    color: "White",
    size: "XL",
    count: 3,
  },
  {
    key: "3",
    no: "3",
    productType: "Rugby Sweater",
    color: "Blue",
    size: "M",
    count: 10,
  },
];

const NewPicklist: React.FC = () => {
  const [tokopediaFile, setTokopediaFile] = useState<any[]>([]);
  const [shopeeFile, setShopeeFile] = useState<any[]>([]);
  const [tiktokFile, setTiktokFile] = useState<any[]>([]);
  const [lazadaFile, setLazadaFile] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  useEffect(() => {
    alert("welcome to upload");
  }, []);

  const handleBeforeUpload = (
    file: any,
    setFile: React.Dispatch<React.SetStateAction<any[]>>
  ): boolean => {
    const isJSON = file.type === "application/json";
    if (!isJSON) {
      message.error("You can only upload JSON files!");
      return false;
    }
    const isLt5M = file.size / 1024 < 1;
    if (!isLt5M) {
      message.error("File must be smaller than 1kB!");
      return false;
    }
    setFile([file]);
    return false;
  };

  const uploadProps = (
    fileList: any[],
    setFile: React.Dispatch<React.SetStateAction<any[]>>
  ): UploadProps => ({
    onRemove: () => {
      setFile([]);
    },
    beforeUpload: (file) => handleBeforeUpload(file, setFile),
    fileList,
    accept: ".json",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  const filteredDataSource = dataSource.filter((item) =>
    item.productType.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedDataSource = [...filteredDataSource].sort((a, b) => {
    if (selectedSort === "asc") {
      return a.productType.localeCompare(b.productType);
    } else if (selectedSort === "desc") {
      return b.productType.localeCompare(a.productType);
    }
    return 0;
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <a href="#">edit</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        New Picklist
      </Title>
      <CardContent>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6} lg={4} xl={4}>
            <Upload
              {...uploadProps(tokopediaFile, setTokopediaFile)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Tokopedia</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4} xl={4}>
            <Upload {...uploadProps(shopeeFile, setShopeeFile)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Shopee</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4} xl={4}>
            <Upload {...uploadProps(tiktokFile, setTiktokFile)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Tiktok</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4} xl={4}>
            <Upload {...uploadProps(lazadaFile, setLazadaFile)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Lazada</Button>
            </Upload>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            style={{ textAlign: "center" }}
          >
            <Button type="primary">Submit</Button>
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by Product Type"
              value={searchText}
              onChange={handleSearch}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Sort by Product Type"
              style={{ width: "100%" }}
              onChange={handleSortChange}
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        <Table dataSource={sortedDataSource} columns={columns} />
      </CardContent>
    </>
  );
};

export default NewPicklist;
