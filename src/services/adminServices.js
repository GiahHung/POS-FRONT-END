import axios from "../axios";

const handleGetAllCodeService = (type) => {
  return axios.get(`/api/all_code?type=${type}`);
};
const handleGetAllProductService = (
  pageInput,
  limitInput,
  sort,
  direction,
  search
) => {
  return axios.get(
    `/api/product/get-page-product?page=${pageInput}&size=${limitInput}&sortBy=${sort}&direction=${direction}&search=${search}`
  );
};

const createProductService = (data) => {
  return axios.post("/api/product/create-product", data);
};

const deleteProductService = (productId) => {
  return axios.delete(`/api/product/delete-product?id=${productId}`);
};

const editProductService = (dataInput) => {
  return axios.put("/api/product/update-product", dataInput);
};

const handleGetEmployeeService = (page, size, sort, direction, search) => {
  return axios.get(
    `/api/employee/get-page-employee?page=${page}&size=${size}&sortBy=${sort}&direction=${direction}&search=${search}`
  );
};

const createEmployeeService = (data) => {
  return axios.post("/api/employee/create-employee", data);
};

const editEmployeeService = (dataInput) => {
  return axios.put("/api/employee/update-employee", dataInput);
};

const deleteEmployeeService = (productId) => {
  return axios.delete(`/api/employee/delete-employee?id=${productId}`);
};

const handleGetEmployeeDiscountService = (
  page,
  size,
  sort,
  direction,
  search
) => {
  return axios.get(
    `/api/discount/get-page-discount?page=${page}&size=${size}&sortBy=${sort}&direction=${direction}&search=${search}`
  );
};

const createEmployeeDiscountService = (data) => {
  return axios.post("/api/discount/createDiscount", data);
};

const editEmployeeDiscountService = (dataInput) => {
  return axios.put("/api/discount/updateDiscount", dataInput);
};

const deleteEmployeeDiscountService = (productId) => {
  return axios.delete(`/api/discount/deleteDiscount?id=${productId}`);
};

const handleGetAllOrderService = (date) => {
  return axios.get(`/api/get-all-orders?date=${date}`);
};
const handleGetRevenueService = () => {
  return axios.get("/api/get-revenue");
};

const handleGetAllRevenueService = () => {
  return axios.get("/api/get-all-revenue");
};

const handleDeleteCustomerService = (id) => {
  return axios.delete(`/api/customer/deleteCustomer?id=${id}`);
};
const handleUpdateCustomerService = (data) => {
  return axios.put("/api/customer/updateCustomer", data);
};
const handleDeleteOrderService = (id) => {
  return axios.delete(`/api/delete-order?id=${id}`);
};

const handleGetVoucherService = () => {
  return axios.get("/api/get-voucher");
};
const handleCreateVoucherService = (data) => {
  return axios.post("/api/create-voucher", data);
};
const handleUpdateVoucherService = (data) => {
  return axios.put('/api/update-voucher',data);
};
const handleDeleteVoucherService = (id) => {
  return axios.delete(`/api/delete-voucher?id=${id}`);
};
export {
  handleGetAllCodeService,
  handleGetAllProductService,
  createProductService,
  deleteProductService,
  editProductService,
  handleGetEmployeeService,
  createEmployeeService,
  editEmployeeService,
  deleteEmployeeService,
  handleGetEmployeeDiscountService,
  createEmployeeDiscountService,
  editEmployeeDiscountService,
  deleteEmployeeDiscountService,
  handleGetAllOrderService,
  handleGetRevenueService,
  handleGetAllRevenueService,
  handleUpdateCustomerService,
  handleDeleteCustomerService,
  handleDeleteOrderService,
  handleGetVoucherService,
  handleDeleteVoucherService,
  handleUpdateVoucherService,
  handleCreateVoucherService,
};
