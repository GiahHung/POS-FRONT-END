import React, { Fragment, useState } from "react";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";

function Header() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actions.processLogout());
  };
  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(actions.fetchAllProduct(query));
  };
    const handleNavigateToHome = () => {
      navigate("/home");
    };
  return (
    <Fragment>
      <div className="header-container ">
        <div className="header-content">
          <div className="logo" onClick={handleNavigateToHome}>
            <i class="fa-solid fa-home"></i>
            <span>POS</span>
          </div>
          <div className="d-flex align-items-center search-input">
            <input
              type="search"
              className="form-control rounded "
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchChange}
            />
            <button className="btn-clear">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="content-right d-flex justify-content-end">
            <div className="mr-auto p-2">{userInfo.data.name}</div>
            <div className="p-2 item">
              <i class="fa-solid fa-desktop"></i>
            </div>
            <div className="p-2 item">
              <i
                class="fa-solid fa-right-from-bracket"
                onClick={handleLogout}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
