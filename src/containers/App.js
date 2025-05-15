import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { path } from "../utils/constant";
import Login from "./Auth/Login";
import Home from "../containers/Homepage/Home";
import Order from "./Homepage/orderPage/Orders";
import Revenue from "./System/Revenue";
import System from "../routes/System";
import Product from "./System/Product";
import HomeOrder from "./Homepage/orderPage/HomeOrder";
import Employee from "./System/Employee";
import PaymentPage from "./Homepage/orderPage/PaymentPage";
import EmployeeDiscount from "./System/EmployeeDiscount";
import ManageOrder from "./System/ManageOrder";
import RestrictedAccess from "../containers/RestrictedAccess ";
import CustomerPage from "./Homepage/orderPage/CustomerPage";
import Customer from "./System/Customer";
import Voucher from "./System/Voucher";
class App extends Component {
  render() {
    const { systemMenuPath, isLoggedIn, userInfo } = this.props;
    const roleId = userInfo?.data?.roleId; // Lấy roleId từ Redux

    return (
      <Fragment>
        <BrowserRouter>
          <div className="main-container">
            <span className="content-container">
              <Routes>
                <Route path={path.LOGIN} element={<Login />} />

                {isLoggedIn && (
                  <>
                    <Route path={path.HOMEPAGE} element={<Home />} />
                    <Route path={path.ORDER} element={<Order />} />
                    <Route path="/home-order" element={<HomeOrder />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/customer-page" element={<CustomerPage />} />

                    {/* Kiểm tra quyền truy cập vào System */}
                    {roleId === "R1" ? (
                      <Route path="/system/*" element={<System />}>
                        <Route
                          path="employee-discount"
                          element={<EmployeeDiscount />}
                        />
                        <Route path="revenue" element={<Revenue />} />
                        <Route path="manage-product" element={<Product />} />
                        <Route path="manage-employee" element={<Employee />} />
                        <Route path="manage-order" element={<ManageOrder />} />
                        <Route path="manage-customer" element={<Customer />} />
                        <Route path="manage-voucher" element={<Voucher />} />
                        <Route
                          path="*"
                          element={<Navigate to="/system/revenue" />}
                        />
                      </Route>
                    ) : (
                      <Route path="/system/*" element={<RestrictedAccess />} />
                    )}
                  </>
                )}

                {/* Điều hướng nếu chưa đăng nhập */}
                <Route
                  path="*"
                  element={
                    <Navigate to={isLoggedIn ? systemMenuPath : path.LOGIN} />
                  }
                />
              </Routes>
            </span>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo, // Lấy userInfo từ Redux
  };
};

export default connect(mapStateToProps)(App);
