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

const handleGetOneOrderService = (id)=>{
  return axios.get(`/api/get-orders?id=${id}`);
}

const addProductToOrderService = (dataInput) => {
  return axios.post("/api/add-product-to-order", dataInput);
};

const handleLogout = (refreshToken) => {
  return axios.post("/api/employee/logout", refreshToken);
};

const handlePayment = (order) => {
  return axios.put("/api/complete-order", order);
};
export {
  handleLoginService,
  createOrderService,
  handleGetAllProductService,
  handleGetProductCategoryService,
  handleGetOneOrderService,
  addProductToOrderService,
  handleLogout,
  handlePayment
};
