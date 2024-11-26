import { Input, DatePicker, Form, App as AntdApp, Modal } from "antd";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { TOAST_DURATION } from "../../utils/constant";
import { useTranslation } from "react-i18next";

interface ScheduleCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleCreationModal: React.FC<ScheduleCreationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState<string>("");
  const { message } = AntdApp.useApp();
  const { t } = useTranslation();

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedDate || !notes.trim()) {
      message.error(
        "Please select a date and provide notes before submitting.",
        TOAST_DURATION
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      console.log("Date:", selectedDate.format("YYYY-MM-DD"));
      console.log("Notes:", notes); // TODO BE
      setIsLoading(false);
      closeSelf();
    }, 1000);
  };

  const closeSelf = () => {
    onClose();
    setIsLoading(false);
    setSelectedDate(null);
    setNotes("");
  };

  return (
    <Modal
      title={t("inbound-schedule.modal.title")}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={closeSelf}
      confirmLoading={isLoading}
    >
      <Form layout="vertical">
        <Form.Item
          label={t("inbound-schedule.modal.field.date.label")}
          required
        >
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder={t("inbound-schedule.modal.field.date.placeholder")}
          />
        </Form.Item>
        <Form.Item
          label={t("inbound-schedule.modal.field.note.label")}
          required
        >
          <Input.TextArea
            value={notes}
            onChange={handleNotesChange}
            placeholder={t("inbound-schedule.modal.field.note.placeholder")}
            rows={3}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ScheduleCreationModal;
