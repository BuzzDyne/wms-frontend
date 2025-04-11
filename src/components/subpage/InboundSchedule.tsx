import { useState } from "react";
import { Button, Calendar, Col, Row, Switch, Typography, message } from "antd";
import CardContent from "../common/CardContent";
import ScheduleCreationModal from "../modal/ScheduleCreationModal";
import { Dayjs } from "dayjs";
import { useRequest } from "ahooks";
import {
  getInboundStatus,
  toggleInboundStatus,
} from "../../services/inboundService";

const { Title, Text } = Typography;

const InboundSchedule = () => {
  const [isScheduleCreateModalOpen, setIsScheduleCreateModalOpen] =
    useState<boolean>(false);

  // Dummy data for disabled dates in YYYYMMDD format
  const disabledDates = ["20250101", "20250105", "20250110"];

  const events = [
    { date: "20250101" },
    { date: "20250105" },
    { date: "20250110" },
  ];

  const {
    data: inboundActive,
    loading: statusLoading,
    refresh,
  } = useRequest(getInboundStatus);

  const { run: toggleStatus, loading: toggleLoading } = useRequest(
    async (newStatus: "on" | "off") => {
      await toggleInboundStatus(newStatus);
      message.success(`Inbound status updated to ${newStatus}.`);
      refresh();
    },
    { manual: true }
  );

  const handleRuleSwitchClick = async () => {
    const newStatus = inboundActive ? "off" : "on";
    await toggleStatus(newStatus);
  };

  const showModal = () => {
    setIsScheduleCreateModalOpen(true);
  };

  const handleCancel = () => {
    setIsScheduleCreateModalOpen(false);
  };

  const disableDate = (current: Dayjs) => {
    return disabledDates.includes(current.format("YYYYMMDD"));
  };

  const dateCellRender = (current: Dayjs) => {
    const event = events.find((e) => e.date === current.format("YYYYMMDD"));
    return event ? (
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        <Text>Scheduled Inbound</Text>
      </div>
    ) : null;
  };

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        Inbound Schedule
      </Title>
      <CardContent>
        <Row justify={"space-between"} align={"middle"}>
          <Col>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Rule:</span>
              <Switch
                checked={inboundActive}
                onChange={handleRuleSwitchClick}
                loading={statusLoading || toggleLoading}
              />
              <span>{inboundActive ? "On" : "Off"}</span>
            </div>
          </Col>
          <Col>
            <Button
              disabled={!inboundActive || statusLoading || toggleLoading}
              className="solid-blue"
              onClick={showModal}
            >
              Create
            </Button>
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        {inboundActive ? (
          <Calendar disabledDate={disableDate} cellRender={dateCellRender} />
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Text strong style={{ fontSize: "16px" }}>
              Inbound Schedule Rule is currently turned off.
            </Text>
          </div>
        )}
      </CardContent>

      <ScheduleCreationModal
        isOpen={isScheduleCreateModalOpen}
        onClose={handleCancel}
        disabledDates={disabledDates} // Pass the disabled dates
      />
    </>
  );
};

export default InboundSchedule;
