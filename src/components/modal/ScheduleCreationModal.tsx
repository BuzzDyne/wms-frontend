import { Input, DatePicker, Form, App as AntdApp, Modal } from "antd";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { TOAST_DURATION } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import { BasicModalProps } from "../../models/types";
import { createInboundSchedule } from "../../services/inboundService";

interface ScheduleCreationModalProps extends BasicModalProps {
  disabledDate: (current: Dayjs | null) => boolean; // Function to disable dates
}

const ScheduleCreationModal: React.FC<ScheduleCreationModalProps> = ({
  isOpen,
  onClose,
  disabledDate,
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

  const handleSubmit = async () => {
    if (!selectedDate || !notes.trim()) {
      message.error(
        "Please select a date and provide notes before submitting.",
        TOAST_DURATION
      );
      return;
    }

    setIsLoading(true);
    try {
      await createInboundSchedule({
        schedule_date: selectedDate.format("YYYYMMDD"),
        notes: notes.trim(),
      });
      message.success("Schedule created successfully.", TOAST_DURATION);
      closeSelf();
    } catch (error) {
      message.error(
        "Failed to create schedule. Please try again.",
        TOAST_DURATION
      );
    } finally {
      setIsLoading(false);
    }
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
            disabledDate={disabledDate} // Use the passed function to disable dates
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
