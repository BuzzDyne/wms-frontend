import React, { useState } from "react";
import { Button, Calendar, Col, Modal, Row, Switch, Typography } from "antd";
import CardContent from "./common/CardContent";
import ScheduleCreationModal from "./modal/ScheduleCreationModal";

const { Title, Text } = Typography;

const InboundSchedule = () => {
  const [scheduleRule, setScheduleRule] = useState<boolean>(false);
  const [isScheduleCreateModalOpen, setIsScheduleCreateModalOpen] =
    useState<boolean>(false);

  const handleRuleSwitchClick = () => {
    setScheduleRule(!scheduleRule);
  };

  const showModal = () => {
    setIsScheduleCreateModalOpen(true);
  };

  const handleOk = () => {
    setIsScheduleCreateModalOpen(false);
  };

  const handleCancel = () => {
    setIsScheduleCreateModalOpen(false);
  };

  return (
    <>
      <Title level={2} style={{ marginTop: "0" }}>
        Inbound Schedule Contact
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
          <Calendar />
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
      />
    </>
  );
};

export default InboundSchedule;
