import { useState } from "react";
import { Button, Calendar, Col, Row, Switch, Typography } from "antd";
import CardContent from "../common/CardContent";
import ScheduleCreationModal from "../modal/ScheduleCreationModal";
import { Dayjs } from "dayjs";

const { Title, Text } = Typography;

const InboundSchedule = () => {
  const [scheduleRule, setScheduleRule] = useState<boolean>(false);
  const [isScheduleCreateModalOpen, setIsScheduleCreateModalOpen] =
    useState<boolean>(false);

  // Dummy data for disabled dates in YYYYMMDD format
  const disabledDates = ["20250101", "20250105", "20250110"];

  const events = [
    { date: "20250101" },
    { date: "20250105" },
    { date: "20250110" },
  ];

  const handleRuleSwitchClick = () => {
    setScheduleRule(!scheduleRule);
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
              <Switch checked={scheduleRule} onChange={handleRuleSwitchClick} />
              <span>{scheduleRule ? "On" : "Off"}</span>
            </div>
          </Col>
          <Col>
            <Button
              disabled={!scheduleRule}
              className="solid-blue"
              onClick={showModal}
            >
              Create
            </Button>
          </Col>
        </Row>
      </CardContent>
      <CardContent>
        {scheduleRule ? (
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
