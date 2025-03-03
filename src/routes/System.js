import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SystemHeader from "../containers/header/SystemHeader";
function System() {
  return (
    <Fragment>
      <SystemHeader />

      <Outlet />
    </Fragment>
  );
}

export default System;
