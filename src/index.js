import React from "react";
import ReactDOM from "react-dom";
import App from "./Client-View/App";
import Controller from "./Controller/Controller";

const startApp = async () => {
  const controller = await Controller.build();
  await controller.initializeData();
  ReactDOM.render(
    <App controller={controller} />,
    document.getElementById("app")
  );
};

startApp();
