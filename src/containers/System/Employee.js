import React, { useState, useEffect } from "react";
import "./Employee.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import {
  createEmployeeService,
  editEmployeeService,
  deleteEmployeeService,
} from "../../services/adminServices";
import { CRUD_ACTION } from "../../utils/constant";
import { toast } from "react-toastify";

function Employee() {
  const [role, setRole] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    EmployeeName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    roleId: "",
  });
  const [arrEmployee, setArrEmployee] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const arrRole = useSelector((state) => state.admin.roleId);
  const arrEmployeeRedux = useSelector((state) => state.admin.employees);
  const totalPage = useSelector((state) => state.admin.totalPage);
  const [editEmployeeId, setEditEmployeeId] = useState("");
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
      actions.fetchEmployee(
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
    }));
    setFormDataSort((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(actions.fetchRoleId());
  }, [dispatch]); // Fetch categories only once

  useEffect(() => {
    dispatch(
      actions.fetchEmployee(
        page,
        5,
        formDataSort.sort,
        formDataSort.direction,
        searchQuery
      )
    );
  }, [dispatch, page]);

  useEffect(() => {
    if (arrRole && arrRole.length > 0) {
      setRole(arrRole);
    }
  }, [arrRole]);
  useEffect(() => {
    if (arrEmployeeRedux && arrEmployeeRedux.length > 0) {
      setArrEmployee(arrEmployeeRedux);
      setTotalPages(totalPage);
      // Chỉ setAction khi không ở chế độ edit
    }
    setAction(CRUD_ACTION.CREATE);
  }, [arrEmployeeRedux, totalPage]);

  const handleSave = async () => {
    if (
      !formData.EmployeeName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.username ||
      !formData.roleId
    ) {
      alert("Input are required");
      return;
    }
    if (action === CRUD_ACTION.CREATE) {
      const res = await createEmployeeService({
        name: formData.EmployeeName,
        email: formData.email,
        roleId: formData.roleId,
        userName: formData.username,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });
      if (res && res.errCode === 0) {
        toast.success("Create success");
      } else {
        toast.error(res.errMessage);
      }
    } else {
      const res = await editEmployeeService({
        id: editEmployeeId,
        name: formData.EmployeeName,
        email: formData.email,
        roleId: formData.roleId,
        userName: formData.username,
        phoneNumber: formData.phoneNumber,
      });
      if (res && res.errCode === 0) {
        toast.success("Update success");
      } else {
        toast.error(res.errMessage);
      }
    }

    setFormData({
      EmployeeName: "",
      email: "",
      roleId: "",
      username: "",
      password: "",
      phoneNumber: "",
    });
    dispatch(
      actions.fetchEmployee(
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

  const handleEdit = (Employee) => {
    setFormData({
      EmployeeName: Employee.name,
      email: Employee.email,
      roleId: Employee.roleId,
      username: Employee.userName,
      password: "aaaaaaaaaaaaaaaaa",
      phoneNumber: Employee.phoneNumber,
    });
    setEditEmployeeId(Employee.id);
    setAction(CRUD_ACTION.EDIT);
  };
  const handleDelete = async (Employee) => {
    // Hiển thị hộp thoại xác nhận
    const confirmed = window.confirm("Do you want to delete?");
    if (!confirmed) {
      // Nếu người dùng không đồng ý, dừng xử lý
      return;
    }

    // Nếu đồng ý, thực hiện xóa sản phẩm
    const res = await deleteEmployeeService(Employee.id);
    if (res && res.errCode === 0) {
      dispatch(
        actions.fetchEmployee(
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
      EmployeeName: "",
      email: "",
      roleId: "",
      username: "",
      password: "",
      phoneNumber: "",
    });
    setEditEmployeeId("");
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
      actions.fetchEmployee(1, 5, formDataSort.sort, newDirection, searchQuery)
    );
  };

  console.log("sádsds", formData);

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
                <h5 className="modal-title">ADD NEW EMPLOYEE</h5>
              ) : (
                <h5 className="modal-title">UPDATE EMPLOYEE</h5>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2 form-group">
                <label>Employee name</label>
                <input
                  type="text"
                  name="EmployeeName"
                  className="form-control"
                  placeholder="Employee name"
                  value={formData.EmployeeName}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Phone number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  className="form-control"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>User name</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="User name"
                  value={formData.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Password</label>
                {action === CRUD_ACTION.CREATE ? (
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleOnChange}
                  />
                ) : (
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    disabled
                  />
                )}
              </div>
              <div className="mb-2 form-group">
                <label>Role</label>
                <select
                  className="form-control"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleOnChange}
                >
                  <option>Select role......</option>
                  {role &&
                    role.length > 0 &&
                    role.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>User name</th>
            <th className="text-end">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {arrEmployee &&
            arrEmployee.length > 0 &&
            arrEmployee.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.userName}</td>
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

export default Employee;
