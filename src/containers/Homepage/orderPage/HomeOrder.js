import React, { Fragment, useEffect, useState } from "react";
import Header from "../../header/Header";
import "./HomeOrder.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import {
  createOrderService,
  handleGetLastOrder,
} from "../../../services/userServices";

function HomeOrder() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const employeeId = userInfo.data.id;
  const [orders, setOrders] = useState("");
  const handleNavigateToOrder = async () => {
    try {
      const res = await createOrderService({ employeeId: employeeId });
      if (res && res.errCode === 0) {
        navigate("/order", { state: { orderId: res.data.id } });
      } else {
        console.log(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigateToHome = () => {
    navigate("/home");
  };
  useEffect(() => {
    async function fetchLastOrder() {
      try {
        const res = await handleGetLastOrder();
        if (res && res.errCode === 0) {
          setOrders(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchLastOrder();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-secondary mt-3"
              onClick={handleNavigateToHome}
            >
              <i class="fa-solid fa-arrow-left me-1"></i> Back
            </button>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button
              className="btn btn-primary mt-3"
              onClick={handleNavigateToOrder}
            >
              New order
            </button>
          </div>
        </div>

        <div className=" d-flex justify-content-center">
          <div className="receipt mt-5">
            <div className="text-center fs-4 fw-bold mb-4">POS</div>
            <div className="order-detail">Order: {orders.id}</div>
            <div className="order-detail">
              Date: {new Date(orders.date).toLocaleDateString("en-GB")}
            </div>
            <div className="order-detail">Cashier: {orders.employeeName}</div>
            <div className="order-detail">
              Customer:{" "}
              {orders.customerName !== "" ? (
                <span>orders.customerName</span>
              ) : (
                <span>Khách lẻ</span>
              )}
            </div>
            <div className="order-detail">Payment: {orders.payment}</div>
            <table className="table table-order table-bordered">
              <thead>
                <tr className="table-data">
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.listOrder &&
                  orders.listOrder.length > 0 &&
                  orders.listOrder.map((item, index) => {
                    return (
                      <tr className="table-data">
                        <td>{item.product.name}</td>
                        <td>x{item.quantity}</td>
                        <td>
                          {Number(item.totalPrice).toLocaleString("vi-VN") +
                            "đ"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="order-detail fw-bold">
              Total: {Number(orders.totalAmount).toLocaleString("vi-VN") + "đ"}
            </div>
            <div className="note">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel turpis at metus ultrices convallis ut id massa.
              Curabitur euismod, nunc ut tristique tempor, justo tortor feugiat
              felis
            </div>
            <div className="text-center fs-4 fw-bold mb-1">*</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomeOrder;
