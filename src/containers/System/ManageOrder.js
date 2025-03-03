import React, { useState, useEffect } from "react";
import "./ManageOrder.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import {
  createEmployeeDiscountService,
  editEmployeeDiscountService,
  deleteEmployeeDiscountService,
} from "../../services/adminServices";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function ManageOrder() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    createdAt: "",
    employee: "",
    customer: "",
    payment: "",
    totalPrice: "",
    detailOrder: [],
  });
  const [arrOrder, setArrOrder] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const arrOderRedux = useSelector((state) => state.admin.orders);
  const [viewOrderId, setViewOrderId] = useState("");
  const [formDataSort, setFormDataSort] = useState({
    sort: "id",
    direction: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // dispatch(
    //   actions.fetchDiscount(
    //     1,
    //     5,
    //     formDataSort.sort,
    //     formDataSort.direction,
    //     searchQuery
    //   )
    // );
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [e.target.name]: e.target.checked,
    }));
    setFormDataSort((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(actions.fetchAllOrder(""));
  }, [dispatch]);

  useEffect(() => {
    if (arrOderRedux && arrOderRedux.length > 0) {
      setArrOrder(arrOderRedux);
    }
  }, [arrOderRedux]);

  const handleEdit = (order) => {
    setFormData({
      createdAt: order.createdAt,
      employee: order.employeeId,
      customer: order.customerId,
      payment: order.payment.value,
      totalPrice: order.totalAmount,
      detailOrder: order.orderDetails,
    });
    setViewOrderId(order.id);
  };
  // const handleDelete = async (discount) => {
  //   const confirmed = window.confirm("Do you want to delete?");
  //   if (!confirmed) {
  //     return;
  //   }
  //   const res = await deleteEmployeeDiscountService(discount.id);
  //   if (res && res.errCode === 0) {
  //     dispatch(
  //       actions.fetchDiscount(
  //         page,
  //         5,
  //         formDataSort.sort,
  //         formDataSort.direction,
  //         searchQuery
  //       )
  //     );
  //     toast.success("Delete success");
  //   } else {
  //     toast.error(res.errMessage);
  //   }
  // };

  const handleSort = () => {
    // Tính toán giá trị mới của direction
    const newDirection = formDataSort.direction === "desc" ? "asc" : "desc";

    // Cập nhật state với giá trị mới
    setFormDataSort((prevData) => ({
      ...prevData,
      direction: newDirection,
    }));

    dispatch(actions.fetchAllOrder());
  };
  console.log(arrOderRedux);
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center p-3 content-top">
        <div className="datetimepicker-container">
          <DatePicker className="form-control datetime-input" />
          <i class="fa-solid fa-calendar calendar-icon"></i>
        </div>

        {/* Sort Block */}
        <div className="d-flex align-items-center">
          <select className="form-select me-2" style={{ minWidth: "150px" }}>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
          <button type="button" className="btn btn-outline-primary">
            <i className="fa-solid fa-sort"></i>
          </button>
        </div>
      </div>

      {/* Modal Bootstrap */}
      <div className="modal fade mt-5" id="EmployeeModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detail order</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body modal-detail-order">
              <div>{formData.createdAt}</div>
              <div>- Cashier: {formData.employee}</div>
              <div>- Customer: {formData.customer}</div>
              <div>- Payment: {formData.payment}</div>
              <table className="table mt-2">
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.detailOrder &&
                    formData.detailOrder.length > 0 &&
                    formData.detailOrder.map((item, index) => {
                      return (
                        <tr>
                          <th>{item.product.name}</th>
                          <th>x{item.quantity}</th>
                          <th>
                            {" "}
                            {Number(item.totalPrice).toLocaleString("vi-VN") +
                              "đ"}
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="total-amount">
                <span>Total:</span>
                <span className="total-number">
                  {Number(formData.totalPrice).toLocaleString("vi-VN") + "đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng danh sách sản phẩm */}
      <div style={{ maxHeight: "450px", overflowY: "auto" }}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th className="sticky-header">#</th>
              <th className="sticky-header">Date</th>
              <th className="sticky-header">Payment</th>
              <th className="sticky-header">Total</th>
              <th className="sticky-header text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {arrOrder &&
              arrOrder.length > 0 &&
              arrOrder.map((item, index) => {
                return (
                  <tr>
                    <th>{item.id}</th>
                    <td>{item.createdAt}</td>
                    <td>{item.payment.value}</td>
                    <td>
                      {" "}
                      {Number(item.totalAmount).toLocaleString("vi-VN") + "đ"}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-info me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#EmployeeModal"
                        onClick={() => handleEdit(item)}
                      >
                        Detail
                      </button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOrder;
