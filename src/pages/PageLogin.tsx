import React, { useState } from "react";
import { Button, Card, Form, Input, Typography, App as AntdApp } from "antd";
import { useNavigate } from "react-router-dom";
import { TOAST_DURATION } from "../utils/constant";
import "./PageLogin.css";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";
import { axiosInstance } from "../api/axios";
import axios from "axios";
import { AUTH_ENDPOINTS } from "../utils/endpoints";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { JwtDecoded, LoginRequest, LoginResponse } from "../models/api";

const { Title, Text } = Typography;

interface LoginValues {
  username: string;
  password: string;
}

const PageLogin: React.FC = () => {
  const { setAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<LoginValues>();
  const { message } = AntdApp.useApp();

  const onFinish = async (values: LoginRequest): Promise<void> => {
    setLoading(true);

    try {
      const response = await axiosInstance.post<LoginResponse>(
        AUTH_ENDPOINTS.LOGIN,
        JSON.stringify({
          username: values.username,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { access_token, refresh_token } = response.data;

      const {
        sub: token_username,
        role_id: token_role_id,
        user_id: token_user_id,
      } = jwtDecode<JwtDecoded>(access_token);

      setAuth({
        token_user_id,
        token_username,
        token_role_id,
        access_token,
        refresh_token,
      });

      message.success(t("login.popup.success"), TOAST_DURATION);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      console.error(err);
      let errMsg: string;

      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data;
        if (!responseData) {
          errMsg = "No Server Response";
        } else if (responseData.detail && "errorCode" in responseData.detail) {
          errMsg = t(`login.submit.error.${responseData.detail.errorCode}`);
        } else {
          errMsg = responseData?.detail || t("generalError");
        }
        message.error(errMsg, TOAST_DURATION);
      } else {
        message.error(t("unknownError"), TOAST_DURATION);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = (): void => {
    const currentLang = i18n.language;
    const newLang = currentLang === "en" ? "id" : "en";
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
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label={t("login.field.username.label")}
              name="username"
              rules={[
                {
                  required: true,
                  message: t("login.field.username.error.required"),
                },
                { min: 3, message: t("login.field.username.error.minlength") },
                {
                  pattern: /^[a-zA-Z][a-zA-Z0-9.]*$/,
                  message: t("login.field.username.error.format"),
                },
              ]}
            >
              <Input
                disabled={loading}
                placeholder={t("login.field.username.placeholder")}
                autoComplete="username"
              />
            </Form.Item>
            <Form.Item
              label={t("login.field.password.label")}
              name="password"
              rules={[
                {
                  required: true,
                  message: t("login.field.password.error.required"),
                },
                { min: 4, message: t("login.field.password.error.minlength") },
              ]}
            >
              <Input.Password
                disabled={loading}
                placeholder={t("login.field.password.placeholder")}
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                {t("login.submit.buttonLabel")}
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

export default PageLogin;
