import { useState } from "react";
import {
  Button,
  Calendar,
  Col,
  Row,
  Switch,
  Typography,
  message,
  Spin,
} from "antd";
import CardContent from "../common/CardContent";
import ScheduleCreationModal from "../modal/ScheduleCreationModal";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import dayjs, { Dayjs } from "dayjs";
import { useRequest } from "ahooks";
import {
  getInboundStatus,
  toggleInboundStatus,
  getInboundSchedules,
  deleteInboundSchedule,
} from "../../services/inboundService";

const { Title, Text } = Typography;

const InboundSchedule = () => {
  const [isScheduleCreateModalOpen, setIsScheduleCreateModalOpen] =
    useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    notes: string;
    schedule_date: string;
  } | null>(null);

  const currentYear = dayjs().year();

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
      refreshSchedules();
    },
    { manual: true }
  );

  const { data: schedules, refresh: refreshSchedules } = useRequest(() =>
    getInboundSchedules(currentYear)
  );

  const { run: deleteSchedule, loading: deleteLoading } = useRequest(
    async (id: number) => {
      await deleteInboundSchedule(id);
      message.success("Schedule deleted successfully.");
      refreshSchedules();
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
    refreshSchedules();
  };

  const handleEventClick = (event: {
    id: number;
    notes: string;
    schedule_date: string;
  }) => {
    setSelectedEvent(event);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEvent) {
      await deleteSchedule(selectedEvent.id);
      setSelectedEvent(null);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedEvent(null);
  };

  const dateCellRender = (current: Dayjs) => {
    const events = schedules?.filter(
      (schedule) => schedule.schedule_date === current.format("YYYYMMDD")
    );
    return events && events.length > 0 ? (
      <div>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              backgroundColor: "#0086ff",
              padding: "5px",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "5px",
              textAlign: "center", // Center-align text
              color: "white", // Set text color to white
            }}
            onClick={() => handleEventClick(event)}
          >
            <Text>{event.notes}</Text>
          </div>
        ))}
      </div>
    ) : null;
  };

  const isDateDisabled = (current: Dayjs | null): boolean => {
    return current ? current.isBefore(dayjs(), "day") : false;
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
        {statusLoading || toggleLoading ? ( // Show spinner while status is loading
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" />
          </div>
        ) : inboundActive ? (
          <Calendar mode="month" cellRender={dateCellRender} />
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
        disabledDate={isDateDisabled} // Pass the function to disable past dates
      />

      <DeleteConfirmationModal
        visible={!!selectedEvent}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmLoading={deleteLoading}
        itemName={selectedEvent?.notes || ""}
        scheduleDate={selectedEvent?.schedule_date || ""}
      />
    </>
  );
};

export default InboundSchedule;
