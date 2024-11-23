import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import { AuthProvider } from "./context/AuthProvider";

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

// Layout
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const PageNotFound = React.lazy(() => import("./pages/Page404"));
const PageLogin = React.lazy(() => import("./pages/PageLogin"));
const PageHealth = React.lazy(() => import("./pages/PageHealth"));

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorIcon: "#A9A9A9",
      },
    }}
  >
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={loadingSpinner}>
          <Routes>
            <Route path="/health" element={<PageHealth />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </ConfigProvider>
);

export default App;
