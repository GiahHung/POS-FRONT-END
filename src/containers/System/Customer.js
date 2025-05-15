import React, { useState, useEffect } from "react";
import "./Customer.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import {
  handleDeleteCustomerService,
  handleUpdateCustomerService,
} from "../../services/adminServices";
import { toast } from "react-toastify";
function Customer() {
  const dispatch = useDispatch();
  const arrCustomerRedux = useSelector((state) => state.user.customers);
  const [arrCustomer, setArrCustomer] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
  });
  useEffect(() => {
    dispatch(actions.fetchAllCustomer("", "id", "asc"));
  }, [dispatch]);
  useEffect(() => {
    if (arrCustomerRedux && arrCustomerRedux.length > 0) {
      setArrCustomer(arrCustomerRedux);
    }
  }, [arrCustomerRedux]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      const res = await handleUpdateCustomerService({
        id: formData.id,
        name: formData.name,
        phoneNumber: formData.phone,
      });
      if (res && res.errCode === 0) {
        toast.success("Update success");
        dispatch(actions.fetchAllCustomer("", "id", "asc"));
        setFormData({
          id: "",
          name: "",
          phone: "",
        });
      } else {
        toast.error(res.errMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleEdit = (customer) => {
    setFormData({
      id: customer.id,
      name: customer.name,
      phone: customer.phoneNumber,
    });
  };
  const handleDeleteCustomer = async(id)=>{
    try {
      const res = await handleDeleteCustomerService(id);
      if (res && res.errCode === 0) {
        toast.success("Delete success");
        dispatch(actions.fetchAllCustomer("", "id", "asc"));
      } else {
        toast.error(res.errMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className="container mt-5">
      {/* Modal Bootstrap */}
      <div className="modal fade mt-5" id="CustomerModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Customer</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2 form-group">
                <label>Customer name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Customer name..."
                  value={formData.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Phone number</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  placeholder="Phone number..."
                  value={formData.phone}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={"btn btn-info"}
                onClick={handleSave}
                data-bs-dismiss="modal"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng danh sách sản phẩm */}
      <div style={{ maxHeight: "650px", overflowY: "auto" }}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th className="sticky-header">#</th>
              <th className="sticky-header">Name</th>
              <th className="sticky-header">Phone number</th>
              <th className="sticky-header">point</th>
              <th className="sticky-header text-end">action</th>
            </tr>
          </thead>
          <tbody>
            {arrCustomer &&
              arrCustomer.length > 0 &&
              arrCustomer.map((item, index) => {
                return (
                  <tr
                    key={index}
                    class={
                      formData.name !== "" &&
                      formData.phone !== "" &&
                      formData.name === item.name &&
                      formData.phone === item.phoneNumber
                        ? "table-active"
                        : ""
                    }
                  >
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.loyaltyPoint}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-info me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#CustomerModal"
                        onClick={() => handleEdit(item)}
                      >
                        Detail
                      </button>
                      <button className="btn btn-danger" onClick={()=>{handleDeleteCustomer(item.id)}}>Delete</button>
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

export default Customer;
