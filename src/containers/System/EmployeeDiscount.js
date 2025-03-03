import React, { useState, useEffect } from "react";
import "./EmployeeDiscount.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import {
  createEmployeeDiscountService,
  editEmployeeDiscountService,
  deleteEmployeeDiscountService,
} from "../../services/adminServices";
import { CRUD_ACTION } from "../../utils/constant";
import { toast } from "react-toastify";

function EmployeeDiscount() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    discountValue: "",
    isActive: false,
  });
  const [arrDiscount, setArrDiscount] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const arrDiscountRedux = useSelector((state) => state.admin.discount);
  const totalPage = useSelector((state) => state.admin.totalPage);
  const [editDiscountId, setEditDiscountId] = useState("");
  const [action, setAction] = useState("");
  const [formDataSort, setFormDataSort] = useState({
    sort: "id",
    direction: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
    dispatch(
      actions.fetchDiscount(
        1,
        5,
        formDataSort.sort,
        formDataSort.direction,
        searchQuery
      )
    );
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
    dispatch(
      actions.fetchDiscount(
        page,
        5,
        formDataSort.sort,
        formDataSort.direction,
        searchQuery
      )
    );
  }, [dispatch, page]);

  useEffect(() => {
    if (arrDiscountRedux && arrDiscountRedux.length > 0) {
      setArrDiscount(arrDiscountRedux);
      setTotalPages(totalPage);
    }
    setAction(CRUD_ACTION.CREATE);
  }, [arrDiscountRedux, totalPage]);

  const handleSave = async () => {
    if (!formData.name || !formData.discountValue) {
      alert("Input are required");
      return;
    }
    if (action === CRUD_ACTION.CREATE) {
      const res = await createEmployeeDiscountService({
        name: formData.name,
        discountValue: formData.discountValue,
      });
      if (res && res.errCode === 0) {
        toast.success("Create success");
      } else {
        toast.error(res.errMessage);
      }
    } else {
      const res = await editEmployeeDiscountService({
        id: editDiscountId,
        name: formData.name,
        discountValue: formData.discountValue,
        active: formData.isActive,
      });
      if (res && res.errCode === 0) {
        toast.success("Update success");
      } else {
        toast.error(res.errMessage);
      }
    }

    setFormData({
      name: "",
      discountValue: "",
      isActive: false,
    });
    dispatch(
      actions.fetchDiscount(
        page,
        5,
        formDataSort.sort,
        formDataSort.direction,
        searchQuery
      )
    );
  };
  const handlePageClick = (event) => {
    const currentPage = event.selected + 1;
    setPage(currentPage);
  };

  const handleEdit = (discount) => {
    setFormData({
      name: discount.name,
      discountValue: discount.discountValue * 100,
      isActive: discount.active,
    });
    setEditDiscountId(discount.id);
    setAction(CRUD_ACTION.EDIT);
  };
  const handleDelete = async (discount) => {
    const confirmed = window.confirm("Do you want to delete?");
    if (!confirmed) {
      return;
    }
    const res = await deleteEmployeeDiscountService(discount.id);
    if (res && res.errCode === 0) {
      dispatch(
        actions.fetchDiscount(
          page,
          5,
          formDataSort.sort,
          formDataSort.direction,
          searchQuery
        )
      );
      toast.success("Delete success");
    } else {
      toast.error(res.errMessage);
    }
  };

  const handleCancelState = () => {
    setFormData({
      name: "",
      discountValue: "",
      isActive: false,
    });
    setEditDiscountId("");
    setAction(CRUD_ACTION.CREATE);
  };

  const handleSort = () => {
    // Tính toán giá trị mới của direction
    const newDirection = formDataSort.direction === "desc" ? "asc" : "desc";

    // Cập nhật state với giá trị mới
    setFormDataSort((prevData) => ({
      ...prevData,
      direction: newDirection,
    }));

    // Reset page về 1
    setPage(1);

    // Gọi dispatch với giá trị mới, sử dụng 1 thay cho page vì đã reset
    dispatch(
      actions.fetchDiscount(1, 5, formDataSort.sort, newDirection, searchQuery)
    );
  };

  console.log("sádsds",formData.isActive);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center content-top">
        <div className="d-flex align-items-center">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchChange}
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
            data-bs-target="#EmployeeModal"
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-end align-items-center">
          <div className="col-2">
            <select
              className="form-select"
              name="sort"
              value={formDataSort.sort}
              onChange={handleOnChange}
            >
              <option value="id">id</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="col-auto d-flex gap-2">
            <i class="fa-solid fa-sort btn-sort" onClick={handleSort}></i>
          </div>
        </div>
      </div>

      {/* Modal Bootstrap */}
      <div className="modal fade mt-5" id="EmployeeModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {action === "CREATE" ? (
                <h5 className="modal-title">ADD NEW DISCOUNT</h5>
              ) : (
                <h5 className="modal-title">UPDATE DISCOUNT</h5>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2 form-group">
                <label>Employee full name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Employee name"
                  value={formData.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Discount value (%)</label>
                <input
                  type="number"
                  name="discountValue"
                  className="form-control"
                  placeholder="Discount"
                  value={formData.discountValue}
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

      {/* Bảng danh sách sản phẩm */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Employee code</th>
            <th>Discount value</th>
            <th>Status</th>
            <th className="text-end">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {arrDiscount &&
            arrDiscount.length > 0 &&
            arrDiscount.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.employeeCode}</td>
                  <td>{item.discountValue * 100}%</td>
                  {item.active === true ? (
                    <td className="status-activated">Activated</td>
                  ) : (
                    <td className="status-not-activated">Not activated</td>
                  )}
                  <td className="text-end">
                    <button
                      className="btn btn-info me-2"
                      onClick={() => {
                        handleEdit(item);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#EmployeeModal"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(item);
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

      {/* Phân trang */}
      <div className="paginate-custom">
        <ReactPaginate
          nextLabel=" >"
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          previousLabel="< "
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default EmployeeDiscount;
