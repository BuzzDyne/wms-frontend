import React, { useState } from "react";
import {
  Tabs,
  Table,
  Button,
  Space,
  Typography,
  message,
  ColorPicker,
} from "antd";
import {
  BgColorsOutlined,
  TagOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  fetchSizeStockItems,
  fetchColorStockItems,
  fetchTypeStockItems,
} from "../../services/inventoryServices";
import InventorySizeCreationModal from "../modals/InventorySizeCreationModal";
import InventorySizeEditModal from "../modals/InventorySizeEditModal";
import InventoryTypeCreationModal from "../modals/InventoryTypeCreationModal";
import InventoryTypeEditModal from "../modals/InventoryTypeEditModal";
import InventoryColorCreationModal from "../modals/InventoryColorCreationModal";
import InventoryColorEditModal from "../modals/InventoryColorEditModal";
import {
  ColorStockItemResponse,
  SizeStockItemResponse,
  TypeStockItemResponse,
} from "../../models/api";

const { Title } = Typography;

type TabKey = "type" | "size" | "color";

const tabMeta = {
  type: { icon: <TagOutlined />, label: "Type" },
  size: { icon: <AppstoreAddOutlined />, label: "Size" },
  color: { icon: <BgColorsOutlined />, label: "Color" },
};

const InventorySetting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("type");
  const [creationModalVisible, setCreationModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  const fetchData = async () => {
    switch (activeTab) {
      case "size":
        return await fetchSizeStockItems();
      case "color":
        return await fetchColorStockItems();
      case "type":
        return await fetchTypeStockItems();
      default:
        return [];
    }
  };

  const {
    data: tableData,
    refresh,
    loading,
  } = useRequest(fetchData, {
    refreshDeps: [activeTab],
  });

  const getTableData = (): any[] => {
    if (activeTab === "size") {
      return (tableData as SizeStockItemResponse[]) || [];
    } else if (activeTab === "color") {
      return (tableData as ColorStockItemResponse[]) || [];
    } else if (activeTab === "type") {
      return (tableData as TypeStockItemResponse[]) || [];
    }
    return [];
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setCreationModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (record: any) => {
    // Replace with actual delete service when available
    message.success(`Deleted ${activeTab} with ID ${record.id}`);
    refresh();
  };

  const getColumns = () => {
    const commonColumns = [
      {
        title: "Name",
        dataIndex:
          activeTab === "size"
            ? "size_name"
            : activeTab === "color"
            ? "color_name"
            : "type_name",
        key: "name",
      },
    ];

    const specificColumns =
      activeTab === "color"
        ? [
            {
              title: "Color Hex",
              dataIndex: "color_hex",
              render: (text: string) => (
                <ColorPicker value={`#${text}`} showText open={false} />
              ),
              key: "hex",
            },
          ]
        : [
            {
              title: "Value",
              dataIndex: activeTab === "size" ? "size_value" : "type_value",
              key: "value",
            },
          ];

    return [
      ...commonColumns,
      ...specificColumns,
      // { TODO: Uncomment when delete service is available
      //   title: "Actions",
      //   key: "actions",
      //   width: 120,
      //   render: (_: any, record: any) =>
      //     !loading && (
      //       <Space>
      //         <Button type="link" onClick={() => handleEdit(record)}>
      //           Edit
      //         </Button>
      //         <Button type="link" danger onClick={() => handleDelete(record)}>
      //           Delete
      //         </Button>
      //       </Space>
      //     ),
      // },
    ];
  };

  return (
    <>
      <Title level={2} style={{ marginTop: 0 }}>
        Inventory Settings
      </Title>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TabKey)}
        tabBarExtraContent={
          <Space>
            <Button type="primary" onClick={handleAddNew}>
              Add New {tabMeta[activeTab].label}
            </Button>
            <Button onClick={refresh}>Refresh Data</Button>
          </Space>
        }
        items={Object.entries(tabMeta).map(([key, meta]) => ({
          key,
          label: (
            <span>
              {meta.icon} {meta.label}
            </span>
          ),
        }))}
      />

      <Table
        columns={getColumns()}
        dataSource={getTableData()}
        rowKey="id"
        pagination={false}
        loading={loading}
        size="small"
      />

      {activeTab === "size" && (
        <>
          <InventorySizeCreationModal
            visible={creationModalVisible}
            onClose={() => setCreationModalVisible(false)}
            refresh={refresh}
          />
          <InventorySizeEditModal
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
            initialValues={editingRecord}
            refresh={refresh}
          />
        </>
      )}

      {activeTab === "type" && (
        <>
          <InventoryTypeCreationModal
            visible={creationModalVisible}
            onClose={() => setCreationModalVisible(false)}
            refresh={refresh}
          />
          <InventoryTypeEditModal
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
            initialValues={editingRecord}
            refresh={refresh}
          />
        </>
      )}

      {activeTab === "color" && (
        <>
          <InventoryColorCreationModal
            visible={creationModalVisible}
            onClose={() => setCreationModalVisible(false)}
            refresh={refresh}
          />
          <InventoryColorEditModal
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
            initialValues={editingRecord}
            refresh={refresh}
          />
        </>
      )}
    </>
  );
};

export default InventorySetting;
