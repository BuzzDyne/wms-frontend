import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, Spin, App as AntdApp } from "antd";
import { AuthProvider } from "./context/AuthProvider";
import { createStyles } from "antd-style";

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
