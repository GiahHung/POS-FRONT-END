import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SystemHeader from "../containers/header/SystemHeader";
import { useSelector } from "react-redux";
function System() {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <Fragment>
      <SystemHeader />
      <Outlet />
    </Fragment>

  );
}

export default System;
