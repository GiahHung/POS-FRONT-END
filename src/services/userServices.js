import axios from "../axios";

const handleLoginService = (data) => {
  return axios.post("/api/employee/login", data);
};

const createOrderService = (data) => {
  return axios.post("/api/create-order", data);
};
const handleGetProductCategoryService = (type) => {
  return axios.get(`/api/product/get-Product-category?category=${type}`);
};

const handleGetAllProductService = (search) => {
  return axios.get(`/api/product/getAllProduct?search=${search}`);
};

const handleGetOneOrderService = (id) => {
  return axios.get(`/api/get-orders?id=${id}`);
};

const addProductToOrderService = (dataInput) => {
  return axios.post("/api/add-product-to-order", dataInput);
};

const handleLogout = (refreshToken) => {
  return axios.post("/api/employee/logout", refreshToken);
};

const handlePayment = (order) => {
  return axios.put("/api/complete-order", order);
};

const handleGetLastOrder = () => {
  return axios.get("/api/get-last-orders");
};

const handleDiscountEmployee = (discountCode, orderId) => {
  return axios.put(
    `/api/set-discount?employeeCode=${discountCode}&orderId=${orderId}`
  );
};
const handleDiscountVoucher = (discountCode, orderId) => {
  return axios.put(
    `/api/set-voucher?voucherCode=${discountCode}&orderId=${orderId}`
  );
};
const handleRemoveProductFromOrder = (data) => {
  return axios.put("/api/remove-product-from-order", data);
};

const handleCreateCustomer = (data) => {
  return axios.post("/api/customer/createCustomer", data);
};

const handleGetCustomer = (search, sort, direction) => {
  return axios.get(
    `/api/customer/get-customer?search=${search}&sortBy=${sort}&direction=${direction}`
  );
};
const handleSelectCustomerService = (customerId, orderId) => {
  return axios.put(`api/select-customer?customerId=${customerId}&orderId=${orderId}`);
};

const handleDeselectCustomerService = (orderId) => {
  return axios.put(
    `api/delete-customer?orderId=${orderId}`
  );
};

export {
  handleLoginService,
  createOrderService,
  handleGetAllProductService,
  handleGetProductCategoryService,
  handleGetOneOrderService,
  addProductToOrderService,
  handleLogout,
  handlePayment,
  handleGetLastOrder,
  handleDiscountEmployee,
  handleRemoveProductFromOrder,
  handleCreateCustomer,
  handleGetCustomer,
  handleSelectCustomerService,
  handleDeselectCustomerService,
  handleDiscountVoucher,
};
