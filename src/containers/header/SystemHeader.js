import React, { Fragment } from "react";
import "./SystemHeader.scss";
import { useDispatch,useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";

function SystemHeader() {
  const userInfo = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(actions.processLogout());
    };
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            POS
          </a>

          {/* Toggle button cho mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu chính */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/system/revenue">
                  Revenue
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/system/manage-order">
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/system/manage-product">
                  Product
                </Link>
              </li>
              <li class="dropdown nav-item">
                <div
                  class="dropdown-toggle nav-link"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Manage user
                </div>
                <ul
                  class="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <Link class="dropdown-item " to="/system/manage-employee">
                      Manage employee
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item " to="/system/employee-discount">
                      Discount code
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item " to="/system/pc">
                      Customer
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item " to="/system/pc">
                      Voucher
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Menu phải (Đăng nhập, Đăng ký) */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link">
                  <i class="fa-solid fa-user"></i> {userInfo.data.name}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
                  <i class="fa-solid fa-right-from-bracket"></i> Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SystemHeader;
