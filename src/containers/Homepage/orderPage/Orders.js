import React, { Fragment, useEffect } from "react";
import Header from "../../header/Header";
import { useState } from "react";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./Orders.scss";
import tra from "../../../assets/traBerry.jpg";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  // Nếu state không có, đảm bảo cung cấp giá trị mặc định
  const { orderId } = location.state || {};
  const dispatch = useDispatch();
  //product
  const arrProduct = useSelector((state) => state.user.products);
  const [listProduct, setListProduct] = useState([]);
  //category
  const arrProductCategory = useSelector((state) => state.user.productCategory);
  const arrCategory = useSelector((state) => state.admin.categoryId);
  const [category, setCategory] = useState([]);
  // order
  const currentOrder = useSelector((state) => state.user.order);
  const [detailOrder, setDetailOrder] = useState([]);

  useEffect(() => {
    dispatch(actions.fetchAllProduct(""));
    dispatch(actions.fetchOneOrder(orderId));
    dispatch(actions.fetchCategoryId());
  }, [dispatch]);
  useEffect(() => {
    setListProduct(arrProduct || []);
    setCategory(arrCategory || []);
    setDetailOrder(currentOrder.orderDetails || []);
  }, [arrProduct, arrCategory, currentOrder]);

  const handleGetProductCategory = (type) => {
    dispatch(actions.fetchProductCategory(type));
  };
  const handleGetAllProduct = () => {
    dispatch(actions.fetchAllProduct(""));
  };

  const handleAddProduct = (product) => {
    dispatch(
      actions.addProductToOrder({
        orderId: orderId,
        productId: product.id,
      })
    );
  };
  const handleLinkToPayment = () =>{
    navigate("/payment", {
      state: {
        order: currentOrder,

      },
    });
  }
  console.log("orderid", orderId);
  return (
    <Fragment>
      <Header />
      <div className="order-container">
        <div className="main-order">
          <div className="content-left  ">
            <div className="screen-product">
              <div className="order-product">
                {detailOrder &&
                  detailOrder.length > 0 &&
                  detailOrder.map((item, index) => {
                    return (
                      <div className="detail-product">
                        <div className="product-info">
                          {" "}
                          <div>{item.product.name}</div>
                          <div>x{item.quantity}</div>
                          <div>
                            {" "}
                            {Number(item.totalPrice).toLocaleString("vi-VN") +
                              "đ"}
                          </div>
                        </div>
                        <p className="note"> - aaaaaaaa aaaaaa</p>
                      </div>
                    );
                  })}
              </div>
              <div className="total">
                {Number(currentOrder.totalAmount).toLocaleString("vi-VN") + "đ"}
              </div>
            </div>
            <div className="container my-3">
              <div className="row g-2">
                {/* Các button đầu tiên: hiển thị dưới dạng khối vuông */}
                <div className="col-6">
                  <button className="btn btn-secondary btn-square">
                    <i className="fa-solid fa-note-sticky"></i> Customer note
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-secondary  btn-square">
                    <i className="fa-solid fa-qrcode"></i> Enter code
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-secondary  btn-square">
                    <i className="fa-solid fa-star"></i> Reward
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-secondary  btn-square">
                    <i className="fa-solid fa-gift"></i> Gift card
                  </button>
                </div>
                {/* Button cuối cùng: to nhất, chiếm 2 cột */}
                <div className="col-12">
                  <button className="btn btn-secondary  btn-square">
                    <i className="fa-solid fa-user"></i> Khách lẻ
                  </button>
                </div>
                <div className="col-12" onClick={handleLinkToPayment}>
                  <button className="btn btn-secondary  btn-square btn-pay">
                    <i class="fa-solid fa-money-check-dollar"></i>Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="content-right ">
            <div className="category">
              <div className="btn-home" onClick={handleGetAllProduct}>
                <i class="fa-solid fa-house"></i>
              </div>
              {category &&
                category.length > 0 &&
                category.map((item, index) => {
                  return (
                    <div
                      className="btn-category"
                      key={item.id || index}
                      onClick={() => handleGetProductCategory(item.keyMap)}
                    >
                      {item.value}
                    </div>
                  );
                })}
            </div>
            <div className="container product-container">
              <div className=" list-product">
                {listProduct &&
                  listProduct.length > 0 &&
                  listProduct.map((item, index) => {
                    return (
                      <div
                        className="product"
                        onClick={() => handleAddProduct(item)}
                      >
                        {" "}
                        <img src={item.image} alt="Product" />
                        <span className="price">
                          {" "}
                          {Number(item.price).toLocaleString("vi-VN") + "đ"}
                        </span>
                        <div className="product-name">{item.name}</div>
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

export default Order;
