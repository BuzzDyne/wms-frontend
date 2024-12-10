import { Input, Form, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DefineItemModalProps } from "../../models/types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PicklistItemDefineMappingModal: React.FC<DefineItemModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
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

  const { t } = useTranslation();

  const closeSelf = () => {
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

  return (
    <Modal
      title={t("account-management.modal-create.title")}
      open={isOpen}
      onOk={closeSelf}
      onCancel={closeSelf}
      confirmLoading={isLoading}
    >
      <Form layout="vertical" initialValues={{ remember: false }}>
        {/* Readonly Item Name */}
        <Form.Item
          label={t("account-management.modal-create.field.username.label")}
        >
          <Input.TextArea
            placeholder={t(
              "account-management.modal-create.field.username.placeholder"
            )}
            value={item?.item_name}
            readOnly
            disabled
            autoSize
          />
        </Form.Item>

        {/* Readonly Ecom Code */}
        <Form.Item
          label={t("account-management.modal-create.field.ecom_code.label")}
        >
          <Input
            placeholder={t(
              "account-management.modal-create.field.ecom_code.placeholder"
            )}
            value={item?.ecom_code}
            readOnly
            disabled
          />
        </Form.Item>

        {/* Type Dropdown */}
        <Form.Item
          label={t("account-management.modal-create.field.type.label")}
          required
        >
          <Select
            options={typeOptions}
            placeholder={t(
              "account-management.modal-create.field.type.placeholder"
            )}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        {/* Size Dropdown */}
        <Form.Item
          label={t("account-management.modal-create.field.size.label")}
          required
        >
          <Select
            options={sizeOptions}
            placeholder={t(
              "account-management.modal-create.field.size.placeholder"
            )}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        {/* Color Dropdown */}
        <Form.Item
          label={t("account-management.modal-create.field.color.label")}
          required
        >
          <Select
            options={colorOptions}
            placeholder={t(
              "account-management.modal-create.field.color.placeholder"
            )}
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
