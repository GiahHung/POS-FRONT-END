import React, { Fragment, useEffect, useState } from "react";
import Header from "../../header/Header";
import "./HomeOrder.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { createOrderService } from "../../../services/userServices";

function HomeOrder() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const employeeId = userInfo.data.id;
  const handleNavigateToOrder = async () => {
    try {
      const res = await createOrderService({ employeeId: employeeId });
      if (res && res.errCode === 0) {
        navigate("/order", { state: { orderId: res.data.id } });
      }else{
        console.log(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary mt-3"
            onClick={handleNavigateToOrder}
          >
            New order
          </button>
        </div>
        <div className=" d-flex justify-content-center">
          <div className="receipt mt-5">sssss</div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomeOrder;
