import Aos from "aos";
import "aos/dist/aos.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { Config } from "./Config.jsx";
import "./index.css";
import { store } from "./store/Store.jsx";
Aos.init({
  once: true,
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Config />
    <App />
  </Provider>
);
