import React, { Fragment, useEffect } from "react";
import Header from "../../header/Header";
import { useState } from "react";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./Orders.scss";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId } = location.state || {};
  const dispatch = useDispatch();
  //product
  const arrProduct = useSelector((state) => state.user.products);
  const [listProduct, setListProduct] = useState([]);
  //category
  const arrCategory = useSelector((state) => state.admin.categoryId);
  const [category, setCategory] = useState([]);
  // order
  const currentOrder = useSelector((state) => state.user.order);
  const [detailOrder, setDetailOrder] = useState([]);
  const [formData, setFormData] = useState({
    discount: "",
    voucherCode: "",
  });

  useEffect(() => {
    dispatch(actions.fetchAllProduct(""));
    dispatch(actions.fetchOneOrder(orderId));
    dispatch(actions.fetchCategoryId());
  }, [dispatch]);
  useEffect(() => {
    setListProduct(arrProduct || []);
    setCategory(arrCategory || []);
    setDetailOrder(currentOrder.listOrder || []);
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
  const handleLinkToPayment = () => {
    navigate("/payment", {
      state: {
        order: currentOrder,
      },
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = () => {
    dispatch(actions.discountEmployee(formData.discount, currentOrder.id));
  };
  const handleSaveVoucher = () => {
    dispatch(actions.discountVoucher(formData.voucherCode, currentOrder.id));
  };

  const handleRemoveProductFromOrder = (productId) => {
    dispatch(
      actions.removeProductFromOrder({ orderId: orderId, productId: productId })
    );
  };
  const handleNavigateToCustomerPage = () => {
    navigate("/customer-page", {
      state: {
        order: currentOrder,
      },
    });
  };
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
                            <span>
                              <i
                                class="fa-solid fa-trash text-danger ms-1"
                                onClick={() => {
                                  handleRemoveProductFromOrder(item.product.id);
                                }}
                              ></i>
                            </span>
                          </div>
                        </div>
                        <p className="note"></p>
                      </div>
                    );
                  })}
                {currentOrder.discount !== 0 ? (
                  <div className="detail-product">
                    <div className="product-info">
                      {" "}
                      <div>{currentOrder.description}</div>
                      <div></div>
                      <div>
                        {" "}
                        -
                        {Number(currentOrder.discount).toLocaleString("vi-VN") +
                          "đ"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span></span>
                )}
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
                <div
                  className="col-6"
                  data-bs-toggle="modal"
                  data-bs-target="#OrderModal"
                >
                  <button className="btn btn-secondary  btn-square">
                    <i className="fa-solid fa-qrcode"></i>
                    Enter code
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-secondary  btn-square">
                    <i className="fa-solid fa-star"></i> Reward
                  </button>
                </div>
                <div
                  className="col-6"
                  data-bs-toggle="modal"
                  data-bs-target="#VoucherModal"
                >
                  <button className="btn btn-secondary  btn-square">
                    <i className="fa-solid fa-gift"></i> Gift card
                  </button>
                </div>
                {/* Button cuối cùng: to nhất, chiếm 2 cột */}
                <div className="col-12">
                  <button
                    className={
                      currentOrder.customerName === ""
                        ? "btn btn-secondary  btn-square"
                        : "btn btn-success  btn-square"
                    }
                    onClick={() => {
                      handleNavigateToCustomerPage();
                    }}
                  >
                    <i className="fa-solid fa-user"></i>{" "}
                    {currentOrder.customerName === "" ? (
                      <span>Customer</span>
                    ) : (
                      <span>{currentOrder.customerName}</span>
                    )}
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
          <div className="modal fade mt-5" id="OrderModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">ENTER DISCOUNT CODE</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2 form-group">
                    <input
                      type="text"
                      name="discount"
                      className="form-control"
                      placeholder="Discount code..."
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    // onClick={handleCancelState}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={handleSave}
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade mt-5" id="VoucherModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">ENTER GIFT CARD</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2 form-group">
                    <input
                      type="text"
                      name="voucherCode"
                      className="form-control"
                      placeholder="Voucher code..."
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={handleSaveVoucher}
                    data-bs-dismiss="modal"
                  >
                    Save
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
