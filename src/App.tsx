import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, Spin, App as AntdApp } from "antd";
import { AuthProvider } from "./context/AuthProvider";
import { createStyles } from "antd-style";
import "@fontsource/inter";

const loadingSpinner = (
  <Spin
    size="large"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  />
);

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }

    /* Solid Red Button */
    &.${prefixCls}-btn.solid-red:not([disabled]) {
      background-color: #ff4d4f; /* Solid Green */
      border-color: #ff4d4f;
      color: #fff;

      &:hover {
        background-color: #d9363e; /* Darker Green */
        border-color: #d9363e;
      }
    }

    /* Solid Green Button */
    &.${prefixCls}-btn.solid-green:not([disabled]) {
      background-color: #52c41a; /* Solid Green */
      border-color: #52c41a;
      color: #fff;

      &:hover {
        background-color: #41a317; /* Darker Green */
        border-color: #41a317;
      }
    }

    /* Solid Yellow Button */
    &.${prefixCls}-btn.solid-yellow:not([disabled]) {
      background-color: #fadb14; /* Solid Yellow */
      border-color: #fadb14;
      color: #000;

      &:hover {
        background-color: #d4b106; /* Darker Yellow */
        border-color: #d4b106;
      }
    }

    /* Solid Blue (same as gradient blue) */
    &.${prefixCls}-btn.solid-blue:not([disabled]) {
      background-color: #0086ff; /* Vibrant Dark Blue */
      border-color: #0086ff;
      color: #fff;

      &:hover {
        background-color: #006bb3; /* Darker and richer blue for hover */
        border-color: #006bb3;
      }
    }

    /* Solid Red - Outlined Version */
    &.${prefixCls}-btn.outlined-red:not([disabled]) {
      background-color: #fff; /* White Background */
      border-color: #d9d9d9; /* Light Gray Border */
      color: #000; /* Black Text */

      &:hover {
        background-color: #fff; /* Stay White */
        border-color: #ff4d4f; /* Red Border */
        color: #ff4d4f; /* Red Text */
      }
    }

    /* Solid Green - Outlined Version */
    &.${prefixCls}-btn.outlined-green:not([disabled]) {
      background-color: #fff; /* White Background */
      border-color: #d9d9d9; /* Light Gray Border */
      color: #000; /* Black Text */

      &:hover {
        background-color: #fff; /* Stay White */
        border-color: #52c41a; /* Green Border */
        color: #52c41a; /* Green Text */
      }
    }

    /* Solid Yellow - Outlined Version */
    &.${prefixCls}-btn.outlined-yellow:not([disabled]) {
      background-color: #fff; /* White Background */
      border-color: #d9d9d9; /* Light Gray Border */
      color: #000; /* Black Text */

      &:hover {
        background-color: #fff; /* Stay White */
        border-color: #fadb14; /* Yellow Border */
        color: #000; /* Yellow Text */
      }
    }

    /* Solid Blue - Outlined Version */
    &.${prefixCls}-btn.outlined-blue:not([disabled]) {
      background-color: #fff; /* White Background */
      border-color: #d9d9d9; /* Light Gray Border */
      color: #000; /* Black Text */

      &:hover {
        background-color: #fff; /* Stay White */
        border-color: #0086ff; /* Blue Border */
        color: #0086ff; /* Blue Text */
      }
    }
  `,
}));

// Layout
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const PageNotFound = React.lazy(() => import("./pages/Page404"));
const PageLogin = React.lazy(() => import("./pages/PageLogin"));

const App: React.FC = () => {
  const { styles } = useStyle();
  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
      theme={{
        token: {
          colorIcon: "#A9A9A9",
        },
        components: {
          Typography: {
            titleMarginTop: 0,
            fontFamily: "'Inter', sans-serif",
          },
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={loadingSpinner}>
              <Routes>
                <Route path="/login" element={<PageLogin />} />
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<DefaultLayout />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
