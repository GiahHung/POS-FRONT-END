import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  createOrderService,
  handleGetAllProductService,
  handleGetProductCategoryService,
  handleGetOneOrderService,
  addProductToOrderService,
  handleLogout,
  handleDiscountEmployee,
  handleDiscountVoucher,
  handleRemoveProductFromOrder,
  handleGetCustomer,
  handleDeselectCustomerService,
} from "../../services/userServices";

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.LOGIN_FAIL,
});

export const processLogout = () => {
  return async (dispatch) => {
    try {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (refreshToken) {
        await handleLogout({
          refreshToken: refreshToken,
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      dispatch({ type: actionTypes.PROCESS_LOGOUT });
    }
  };
};

export const createOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createOrderService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.CREATE_ORDER_SUCCESS,
          data: res.data,
        });
        console.log("create order", res.data);
      } else {
        dispatch({
          type: actionTypes.CREATE_ORDER_FAIL,
        });
      }
    } catch (error) {
      console.log("", error);
      dispatch({
        type: actionTypes.CREATE_ORDER_FAIL,
      });
    }
  };
};

export const fetchAllProduct = (search) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetAllProductService(search);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_FAIL,
        });
      }
    } catch (error) {
      console.log("FETCH_ALL_PRODUCT_FAIL", error);
      dispatch({
        type: actionTypes.FETCH_ALL_PRODUCT_FAIL,
      });
    }
  };
};

export const fetchProductCategory = (type) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetProductCategoryService(type);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PRODUCT_CATEGORY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PRODUCT_CATEGORY_FAIL,
        });
      }
    } catch (error) {
      console.log("FETCH_PRODUCT_CATEGORY_FAIL", error);
      dispatch({
        type: actionTypes.FETCH_PRODUCT_CATEGORY_FAIL,
      });
    }
  };
};

export const fetchOneOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetOneOrderService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ONE_ORDER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ONE_ORDER_FAIL,
        });
      }
    } catch (error) {
      console.log("FETCH_ONE_ORDER_FAIL", error);
      dispatch({
        type: actionTypes.FETCH_ONE_ORDER_FAIL,
      });
    }
  };
};

export const addProductToOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await addProductToOrderService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.ADD_PRODUCT_TO_ORDER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.ADD_PRODUCT_TO_ORDER_FAIL,
        });
      }
    } catch (error) {
      console.log("ADD_PRODUCT_TO_ORDER_FAIL", error);
      dispatch({
        type: actionTypes.ADD_PRODUCT_TO_ORDER_FAIL,
      });
    }
  };
};

export const discountEmployee = (employeeCode, orderId) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleDiscountEmployee(employeeCode, orderId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.ADD_DISCOUNT_CODE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.ADD_DISCOUNT_CODE_FAIL,
        });
        toast.error(res.errMessage);
      }
    } catch (error) {
      console.log("ADD_DISCOUNT_CODE_FAIL", error);
      dispatch({
        type: actionTypes.ADD_DISCOUNT_CODE_FAIL,
      });
    }
  };
};
export const discountVoucher = (voucherCode, orderId) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleDiscountVoucher(voucherCode, orderId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.ADD_VOUCHER_CODE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.ADD_VOUCHER_CODE_FAIL,
        });
        toast.error(res.errMessage);
      }
    } catch (error) {
      console.log("ADD_VOUCHER_CODE_FAIL", error);
      dispatch({
        type: actionTypes.ADD_VOUCHER_CODE_FAIL,
      });
    }
  };
};

export const removeProductFromOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleRemoveProductFromOrder(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.REMOVE_PRODUCT_FROM_ORDER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.REMOVE_PRODUCT_FROM_ORDER_FAIL,
        });
      }
    } catch (error) {
      console.log("REMOVE_PRODUCT_FROM_ORDER_FAIL", error);
      dispatch({
        type: actionTypes.REMOVE_PRODUCT_FROM_ORDER_FAIL,
      });
    }
  };
};

export const removeCustomerOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleDeselectCustomerService(orderId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DESELECT_CUSTOMER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.DESELECT_CUSTOMER_FAIL,
        });
      }
    } catch (error) {
      console.log("DESELECT_CUSTOMER_FAIL", error);
      dispatch({
        type: actionTypes.DESELECT_CUSTOMER_FAIL,
      });
    }
  };
};
export const fetchAllCustomer = (search, sort, direction) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetCustomer(search, sort, direction);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CUSTOMER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_CUSTOMER_FAIL,
        });
      }
    } catch (error) {
      console.log("FETCH_CUSTOMER_FAIL", error);
      dispatch({
        type: actionTypes.FETCH_CUSTOMER_FAIL,
      });
    }
  };
};
