import React, { Fragment, useEffect, useState } from "react";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Revenue.scss";
import { chart as ChartJs } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function Revenue() {
  const dispatch = useDispatch();
  const revenueRedux = useSelector((state) => state.admin.revenue);
  const arrRevenueRedux = useSelector((state) => state.admin.arrRevenue);
  const [revenue, setRevenue] = useState("");
  const [arrRevenue, setArrRevenue] = useState([]);
  useEffect(() => {
    dispatch(actions.fetchRevenue());
    dispatch(actions.fetchAllRevenue());
  }, [dispatch]);
  useEffect(() => {
    if (revenueRedux) {
      setRevenue(revenueRedux);
    }
    if (arrRevenueRedux && arrRevenueRedux.length > 0) {
      setArrRevenue(arrRevenueRedux);
    }
  }, [arrRevenueRedux, revenueRedux]);
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
                            <span>{item.payment.value}:</span>
                            <span>{item.totalOrder}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="col-9 chart">
                  <Line
                    width="440"
                    data={{
                      labels: arrRevenue.map((item) => {
                       return new Date(item.reportDate).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "2-digit" }
                        );
                      }),
                      datasets: [
                        {
                          label: "Revenue",
                          data: arrRevenue.map((item) => item.totalRevenue),
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="content-down col-12">
              <div className="row detail-revenue ">
                <div className="col-12 date d-flex justify-content-end">
                  Report date:{" "}
                  {new Date(revenue.reportDate).toLocaleDateString("en-GB")}
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
                        <span>{item.payment.value}</span>
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
