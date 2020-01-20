import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App
      isLogin={JSON.parse(localStorage.getItem("isLogin"))}
      userInfo={JSON.parse(localStorage.getItem("userInfo"))}
    />
  </BrowserRouter>,
  document.getElementById("root"),
);
