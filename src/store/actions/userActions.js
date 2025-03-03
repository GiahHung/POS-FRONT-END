import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  createOrderService,
  handleGetAllProductService,
  handleGetProductCategoryService,
  handleGetOneOrderService,
  addProductToOrderService,
  handleLogout,
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
          refreshToken:refreshToken
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      sessionStorage.removeItem("refreshToken"); // Ensure cleanup
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
