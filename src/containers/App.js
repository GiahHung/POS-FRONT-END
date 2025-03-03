import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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

class App extends Component {
  state = {};
  render() {
    const { systemMenuPath } = this.props;
    const { isLoggedIn } = this.props;
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
                    <Route path="/system/*" element={<System />}>
                      <Route
                        path="employee-discount"
                        element={<EmployeeDiscount />}
                      />
                      <Route path="revenue" element={<Revenue />} />
                      <Route path="manage-product" element={<Product />} />
                      <Route path="manage-employee" element={<Employee />} />
                      <Route path="manage-order" element={<ManageOrder />} />
                      <Route
                        path="*"
                        element={<Navigate to="/system/revenue" />}
                      />
                    </Route>
                  </>
                )}

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
