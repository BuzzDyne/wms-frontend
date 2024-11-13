import React, { useState } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { TOAST_DURATION } from "../utils/constant";
import "./LoginPage.css";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation(); // Destructure i18n for language change
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    // Mock authentication
    if (values.username === "user" && values.password === "user") {
      login("mock-token");
      message.success(t("login.popup.success"), TOAST_DURATION);
      navigate("/");
    } else {
      message.error(t("login.popup.failed"), TOAST_DURATION);
    }
    setLoading(false);
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "en" ? "id" : "en"; // Toggle between 'en' and 'id'
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="login-container">
      <div className="illustration-section"></div>
      <div className="login-card-section">
        <Card
          style={{
            maxWidth: 350,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            {t("login.title")}
          </Title>
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center", marginBottom: 24 }}
          >
            {t("login.description")}
          </Text>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label={t("login.username")}
              name="username"
              rules={[{ required: true, message: t("login.usernameRequired") }]}
            >
              <Input
                placeholder={t("login.username")}
                autoComplete="username"
              />
            </Form.Item>
            <Form.Item
              label={t("login.password")}
              name="password"
              rules={[{ required: true, message: t("login.passwordRequired") }]}
            >
              <Input.Password
                placeholder={t("login.password")}
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                {t("login.loginButton")}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button block type="link" onClick={() => navigate("/health")}>
                {t("login.healthPageLink")}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="link"
                onClick={toggleLanguage}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <GlobalOutlined style={{ marginRight: 4 }} />
                {i18n.language === "en" ? "ID" : "EN"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
