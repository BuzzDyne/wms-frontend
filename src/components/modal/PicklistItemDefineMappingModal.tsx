import { Input, Form, Modal, Select, Button, App as AntdApp } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { DefineItemModalProps } from "../../models/types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PicklistItemDefineMappingModal: React.FC<DefineItemModalProps> = ({
  isOpen,
  onClose,
  item,
  picklist_id,
}) => {
  const { message } = AntdApp.useApp();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeOptions, setTypeOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [sizeOptions, setSizeOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [colorOptions, setColorOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const formRef = useRef<any>(null);

  const { t } = useTranslation();

  const closeSelf = () => {
    formRef.current?.resetFields(); // Reset form fields
    onClose();
    setIsLoading(false);
  };

  const fetchOptions = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get("/stock/variant-options");
      const data = response.data?.data || {};

      // Map size, type, and color options into Select format
      setTypeOptions(
        data.type?.map((type: { type_value: string; type_name: string }) => ({
          value: type.type_value,
          label: type.type_name,
        })) || []
      );

      setSizeOptions(
        data.size?.map((size: { size_value: string; size_name: string }) => ({
          value: size.size_value,
          label: size.size_name,
        })) || []
      );

      setColorOptions(
        data.color?.map((color: { color_name: string }) => ({
          value: color.color_name,
          label: color.color_name,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching variant options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchOptions();
  }, [isOpen]);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      // Mock API call
      await axiosPrivate.post(`/picklist/item/${item.item_id}/set-mapping`, {
        stock_size_value: values.size,
        stock_type_value: values.type,
        stock_color_name: values.color,
      });

      await axiosPrivate.post(
        `/picklist/${picklist_id}/repeat-item-mapping`,
        {}
      );
      message.success("Submitted");
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Error submitting data");
    } finally {
      setIsLoading(false);
      closeSelf();
    }
  };

  return (
    <Modal
      title={t("new-picklist.modal-define.title")}
      open={isOpen}
      onOk={closeSelf}
      onCancel={closeSelf}
      footer={[
        <Button key="cancel" onClick={closeSelf}>
          {t("cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          form="picklistForm"
          htmlType="submit"
        >
          {t("submit")}
        </Button>,
      ]}
    >
      <Form
        ref={formRef}
        layout="vertical"
        initialValues={{ remember: false }}
        onFinish={handleSubmit}
        id="picklistForm"
      >
        {/* Readonly Item Name */}
        <Form.Item label={t("new-picklist.modal-define.field.username.label")}>
          <Input.TextArea
            placeholder={t(
              "new-picklist.modal-define.field.username.placeholder"
            )}
            value={item?.item_name}
            readOnly
            disabled
            autoSize
          />
        </Form.Item>

        {/* Readonly Ecom Code */}
        <Form.Item label={t("new-picklist.modal-define.field.ecom_code.label")}>
          <Input
            placeholder={t(
              "new-picklist.modal-define.field.ecom_code.placeholder"
            )}
            value={item?.ecom_code}
            readOnly
            disabled
          />
        </Form.Item>

        {/* Type Dropdown */}
        <Form.Item
          label={t("new-picklist.modal-define.field.type.label")}
          name="type"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select
            options={typeOptions}
            placeholder={t("new-picklist.modal-define.field.type.placeholder")}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        {/* Size Dropdown */}
        <Form.Item
          label={t("new-picklist.modal-define.field.size.label")}
          name="size"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select
            options={sizeOptions}
            placeholder={t("new-picklist.modal-define.field.size.placeholder")}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        {/* Color Dropdown */}
        <Form.Item
          label={t("new-picklist.modal-define.field.color.label")}
          name="color"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select
            options={colorOptions}
            placeholder={t("new-picklist.modal-define.field.color.placeholder")}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PicklistItemDefineMappingModal;
