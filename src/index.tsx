import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/custom.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
// eslint-disable-next-line
import "./i18next";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
