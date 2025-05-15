import React, { useState, useEffect } from "react";
import "./Voucher.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { CRUD_ACTION } from "../../utils/constant";
import {
  handleCreateVoucherService,
  handleUpdateVoucherService,
  handleDeleteVoucherService,
} from "../../services/adminServices";
import { toast } from "react-toastify";
function Voucher() {
  const dispatch = useDispatch();
  const arrVoucherRedux = useSelector((state) => state.admin.arrVoucher);
  const [arrVoucher, setArrVoucher] = useState([]);
  const [action, setAction] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    voucherCode: "",
    discount: "",
    isActive: false,
  });
  useEffect(() => {
    dispatch(actions.fetchVoucher());
    setAction(CRUD_ACTION.CREATE);
  }, [dispatch]);
  useEffect(() => {
    if (arrVoucherRedux && arrVoucherRedux.length > 0) {
      setArrVoucher(arrVoucherRedux);
    }
  }, [arrVoucherRedux]);
  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSave = async () => {
    if (!formData.voucherCode || !formData.discount) {
      alert("Product name or price are required");
      return;
    }
    if (action === CRUD_ACTION.CREATE) {
      const res = await handleCreateVoucherService({
        voucherCode: formData.voucherCode,
        discount: formData.discount,
      });
      if (res.errCode === 0) {
        toast.success(res.errMessage);
      } else {
        toast.error(res.errMessage);
      }
    } else {
      const res = await handleUpdateVoucherService({
        id: formData.id,
        voucherCode: formData.voucherCode,
        discount: formData.discount,
        isActive: formData.isActive,
      });
      if (res.errCode === 0) {
        toast.success(res.errMessage);
      } else {
        toast.error(res.errMessage);
      }
    }

    setFormData({
      id: "",
      voucherCode: "",
      discount: "",
      isActive: false,
    });
    setAction(CRUD_ACTION.CREATE);
    dispatch(actions.fetchVoucher());
  };

  const handleEdit = (voucher) => {
    setFormData({
      id: voucher.id,
      voucherCode: voucher.voucherCode,
      discount: voucher.discount,
      isActive: voucher.isActive,
    });
    setAction(CRUD_ACTION.EDIT);
  };
  const handleCancelState = () => {
    setFormData({
      id: "",
      voucherCode: "",
      discount: "",
      isActive: false,
    });
    setAction(CRUD_ACTION.CREATE);
  };
  const handleDelete = async (id) => {
    try {
        const res = await handleDeleteVoucherService(id);
        if (res.errCode === 0) {
            toast.success(res.errMessage);
            dispatch(actions.fetchVoucher());
        } else {
            toast.error(res.errMessage);
        }
    } catch (error) {
        toast.error(error)
    }
  }
  return (
    <div className="container ">
      <div className="d-flex justify-content-between align-items-center content-top">
        <div className="d-flex align-items-center">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
          />
          <button type="button" className="btn btn-outline-primary">
            Search
          </button>
        </div>
        <div className="me-3">
          {/* Nút mở modal */}
          <div
            className="add-new"
            data-bs-toggle="modal"
            data-bs-target="#VoucherModal"
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
      {/* Modal Bootstrap */}
      <div className="modal fade mt-5" id="VoucherModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {action === "CREATE" ? (
                  <h5 className="modal-title">ADD NEW VOUCHER</h5>
                ) : (
                  <h5 className="modal-title">UPDATE VOUCHER</h5>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2 form-group">
                <label>Voucher code</label>
                <input
                  type="text"
                  name="voucherCode"
                  className="form-control"
                  placeholder="Voucher code..."
                  value={formData.voucherCode}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Discount đ</label>
                <input
                  type="number"
                  name="discount"
                  className="form-control"
                  placeholder="Discount..."
                  value={formData.discount}
                  onChange={handleOnChange}
                />
              </div>
              {action === CRUD_ACTION.EDIT ? (
                <div className="mb-2 form-group">
                  <input
                    type="checkbox"
                    name="isActive"
                    className="form-check-input me-1"
                    checked={formData.isActive}
                    onChange={handleOnChange}
                  />
                  <label class="form-check-label">Active</label>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelState}
              >
                Cancel
              </button>
              <button
                type="button"
                className={
                  action === CRUD_ACTION.CREATE
                    ? "btn btn-success"
                    : "btn btn-info"
                }
                onClick={handleSave}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxHeight: "550px", overflowY: "auto" }}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th className="sticky-header">#</th>
              <th className="sticky-header">Voucher code</th>
              <th className="sticky-header">Discount</th>
              <th className="sticky-header">Active</th>
              <th className="sticky-header text-end">action</th>
            </tr>
          </thead>
          <tbody>
            {arrVoucher &&
              arrVoucher.length > 0 &&
              arrVoucher.map((item, index) => {
                return (
                  <tr
                    key={index}
                    class={
                      formData.voucherCode !== "" && formData.discount !== ""
                        ? "table-active"
                        : ""
                    }
                  >
                    <th scope="row">{item.id}</th>
                    <td>{item.voucherCode}</td>
                    <td>
                      {Number(item.discount).toLocaleString("vi-VN") + "đ"}
                    </td>
                    {item.isActive === true ? (
                      <td className="status-activated">Activated</td>
                    ) : (
                      <td className="status-not-activated">Not activated</td>
                    )}
                    <td className="text-end">
                      <button
                        className="btn btn-info me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#VoucherModal"
                        onClick={() => handleEdit(item)}
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </button>
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

export default Voucher;
