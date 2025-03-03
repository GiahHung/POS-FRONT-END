import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import * as actions from "../../store/actions";
import Header from "../header/Header";
function Home() {
  const navigate = useNavigate();
  const handleNavigateToOrder = () => {
    navigate("/home-order");
  };
  const handleNavigateToSystem = () => {
    navigate("/system");
  };
  return (
    <Fragment>
      <div className=" home-container">
        <Header />
        <div className="container">
          <div className="row mt-5">
            <div className="col-2 ">
              <div className="shape" onClick={handleNavigateToSystem}>
                <i class="fa-solid fa-gear"></i>
              </div>
              <div className="title">Mange</div>
            </div>
            <div className="col-2">
              <div className="shape" onClick={handleNavigateToOrder}>
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
              <div className="title">Point Of Sale</div>
            </div>
            <div className="col-2">
              <div className="shape">
                <i class="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
