import React, { useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HealthPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Mock function to simulate checking backend status
  const checkServiceStatus = async () => {
    setLoading(true);
    setStatus(null);

    try {
      // Simulate a delay to mimic a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate a successful response (could be replaced with a real API call)
      const isServiceUp = true; // Change this to simulate different responses

      if (isServiceUp) {
        setStatus("Service is operational.");
        message.success("Service is up and running!");
      } else {
        setStatus("Service is down.");
        message.error("Service is currently unavailable.");
      }
    } catch (error) {
      setStatus("Error checking service.");
      message.error("Failed to check service status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", textAlign: "center" }}>
      <Title level={2}>Health Check</Title>
      <Paragraph>
        Check the availability of our backend and other services.
      </Paragraph>

      <Form layout="vertical" style={{ marginTop: 20 }}>
        <Form.Item>
          <Button type="primary" onClick={checkServiceStatus} loading={loading}>
            Check Service Status
          </Button>
        </Form.Item>
      </Form>

      {status && (
        <Paragraph
          style={{ color: status.includes("operational") ? "green" : "red" }}
        >
          {status}
        </Paragraph>
      )}

      <Button type="link" onClick={() => navigate("/")}>
        Go back to Dashboard
      </Button>
    </div>
  );
};

export default HealthPage;
