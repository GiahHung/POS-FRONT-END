import React, { useState, useEffect } from "react";
import "./Product.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import {
  createProductService,
  editProductService,
  deleteProductService,
} from "../../services/adminServices";
import { CRUD_ACTION } from "../../utils/constant";
import { toast } from "react-toastify";

function Product() {
  const [preview, setPreview] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    categoryId: "",
  });
  const [arrProduct, setArrProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const arrCategory = useSelector((state) => state.admin.categoryId);
  const arrProductRedux = useSelector((state) => state.admin.product);
  const totalPage = useSelector((state) => state.admin.totalPage);
  const [editProductId, setEditProductId] = useState("");
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
      actions.fetchProduct(
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
    dispatch(actions.fetchCategoryId());
  }, [dispatch]); // Fetch categories only once

  useEffect(() => {
    dispatch(
      actions.fetchProduct(
        page,
        5,
        formDataSort.sort,
        formDataSort.direction,
        searchQuery
      )
    );
  }, [dispatch, page]);

  useEffect(() => {
    if (arrCategory && arrCategory.length > 0) {
      setCategory(arrCategory);
    }
  }, [arrCategory]);
  useEffect(() => {
    if (arrProductRedux && arrProductRedux.length > 0) {
      setArrProduct(arrProductRedux);
      setTotalPages(totalPage);
      // Chỉ setAction khi không ở chế độ edit
      if (action !== CRUD_ACTION.EDIT) {
        setAction(CRUD_ACTION.CREATE);
      }
    }
  }, [arrProductRedux, totalPage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result chứa chuỗi Base64 (bao gồm prefix data:...)
        setBase64String(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.productName || !formData.price || !formData.categoryId) {
      alert("Product name or price are required");
      return;
    }
    if (action === CRUD_ACTION.CREATE) {
      const res = await createProductService({
        name: formData.productName,
        price: formData.price,
        categoryId: formData.categoryId,
        image: base64String,
      });
      if (res && res.errCode === 0) {
        toast.success(res.errMessage);
      } else {
        toast.error(res.errMessage);
      }
    } else {
      const res = await editProductService({
        id: editProductId,
        name: formData.productName,
        price: formData.price,
        categoryId: formData.categoryId,
        image: base64String,
      });
      if (res && res.errCode === 0) {
        toast.success(res.errMessage);
      } else {
        toast.error(res.errMessage);
      }
    }

    setFormData({
      productName: "",
      price: "",
      categoryId: "",
    });
    setPreview(null);
    setBase64String("");
    dispatch(
      actions.fetchProduct(
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

  const handleEdit = (product) => {
    setFormData({
      productName: product.name,
      price: product.price,
      categoryId: product.categoryId,
    });
    setEditProductId(product.id);
    setPreview(product.image);
    setAction(CRUD_ACTION.EDIT);
  };
  const handleDelete = async (product) => {
    // Hiển thị hộp thoại xác nhận
    const confirmed = window.confirm("Do you want to delete?");
    if (!confirmed) {
      // Nếu người dùng không đồng ý, dừng xử lý
      return;
    }

    // Nếu đồng ý, thực hiện xóa sản phẩm
    await deleteProductService(product.id);
    dispatch(
      actions.fetchProduct(
        page,
        5,
        formDataSort.sort,
        formDataSort.direction,
        searchQuery
      )
    );
  };

  const handleCancelState = () => {
    setFormData({
      productName: "",
      price: "",
      categoryId: "",
    });
    setPreview(null);
    setBase64String("");
    setEditProductId("");
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
      actions.fetchProduct(1, 5, formDataSort.sort, newDirection, searchQuery)
    );
  };

  console.log("sádsds", formDataSort);

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
            data-bs-target="#productModal"
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
              <option value="price">Price</option>
            </select>
          </div>
          <div className="col-auto d-flex gap-2">
            <i class="fa-solid fa-sort btn-sort" onClick={handleSort}></i>
          </div>
        </div>
      </div>

      {/* Modal Bootstrap */}
      <div className="modal fade mt-5" id="productModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {action === "CREATE" ? (
                <h5 className="modal-title">ADD NEW PRODUCT</h5>
              ) : (
                <h5 className="modal-title">UPDATE PRODUCT</h5>
              )}

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2 form-group">
                <label>Product name</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                  placeholder="Product name"
                  value={formData.productName}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2 form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleOnChange}
                >
                  <option>Select category......</option>
                  {category &&
                    category.length > 0 &&
                    category.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-2 form-group">
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="fileInput"
                    className="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="fileInput" className="file-label">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="preview-image"
                        onChange={handleFileChange}
                      />
                    ) : (
                      <span className="plus-icon">+</span>
                    )}
                  </label>
                </div>
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
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th className="text-end">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {arrProduct &&
            arrProduct.length > 0 &&
            arrProduct.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td> {Number(item.price).toLocaleString("vi-VN") + "đ"}</td>
                  <td>{item.categoryName}</td>
                  <td>
                    <img
                      src={
                        item.image && item.image.startsWith("data:")
                          ? item.image
                          : "placeholder.jpg"
                      }
                      alt="product"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-info me-2"
                      onClick={() => {
                        handleEdit(item);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
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

export default Product;
