import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Api } from "./helper/api";

const api = new Api({
  baseURL: "https://niort-tpcloud.herokuapp.com/api",
});
export const ApiContext = React.createContext(api);

ReactDOM.render(
  <React.StrictMode>
    <ApiContext.Provider value={api}>
      <App />
    </ApiContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
