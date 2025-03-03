import React, { Fragment, useEffect, useState } from "react";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Revenue.scss";

function Revenue() {
  const dispatch = useDispatch();
  const revenueRedux = useSelector((state) => state.admin.revenue);
  const [revenue, setRevenue] = useState("");
  useEffect(() => {
    dispatch(actions.fetchRevenue());
  }, [dispatch]);
  useEffect(() => {
    if (revenueRedux) {
      setRevenue(revenueRedux);
    }
  });
  console.log("revenue", revenue);
  return (
    <Fragment>
      <div className="revenue-container">
        <div className="container">
          <div className="row revenue-row">
            <div className="content-top col-12">
              <div className="row">
                <div className="col-3">
                  <div className="fs-2 fw-bold mt-4 ms-2 text-success">
                    REVENUE REPORT
                  </div>
                  <div className="total-order">
                    <div className="total-order-detail">
                      <span>Total order:</span>
                      {revenue === "" ? (
                        <span>0</span>
                      ) : (
                        <span>{revenue.totalOrder}</span>
                      )}
                    </div>
                    {revenue.detailRevenues &&
                      revenue.detailRevenues.length > 0 &&
                      revenue.detailRevenues.map((item, index) => {
                        return (
                          <div className="total-order-detail">
                            {" "}
                            <span>{item.paymentId}:</span>
                            <span>{item.totalOrder}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="col-0"></div>
              </div>
            </div>
            <div className="content-down col-12">
              <div className="row detail-revenue ">
                <div className="col-12 date d-flex justify-content-end">
                  Report date: 12-2-2020
                </div>
                <div className="col-12  total-revenue">
                  <span>- Revenue</span>
                  {revenue === "" ? (
                    <span>0</span>
                  ) : (
                    <span>
                      {Number(revenue.totalRevenue).toLocaleString("vi-VN") +
                        "đ"}
                    </span>
                  )}
                </div>
                <div className="col-12 fw-bold">- Payment:</div>
                {revenue.detailRevenues &&
                  revenue.detailRevenues.length > 0 &&
                  revenue.detailRevenues.map((item, index) => {
                    return (
                      <div className="col-12 detail">
                        <span>{item.paymentId}</span>
                        <span>
                          {" "}
                          {Number(item.totalSale).toLocaleString("vi-VN") + "đ"}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Revenue;
