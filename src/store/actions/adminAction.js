import actionTypes from "./actionTypes";
import {
  handleGetAllCodeService,
  handleGetAllProductService,
  handleGetEmployeeService,
  handleGetEmployeeDiscountService,
  handleGetAllOrderService,
  handleGetRevenueService,
  handleGetAllRevenueService,
  handleGetVoucherService,
} from "../../services/adminServices";

export const fetchCategoryId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("CATEGORY");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CATEGORY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_CATEGORY_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_CATEGORY_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_CATEGORY_FAIL,
      });
    }
  };
};

export const fetchPaymentId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("PAYMENT");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PAYMENT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PAYMENT_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_PAYMENT_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_PAYMENT_FAIL,
      });
    }
  };
};

export const fetchRoleId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ROLE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ROLE_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ROLE_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ROLE_FAIL,
      });
    }
  };
};

export const fetchProduct = (page, size, sort, direction, search) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllProductService(
        page,
        size,
        sort,
        direction,
        search
      );
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PRODUCT_SUCCESS,
          data: res.data.content,
          totalPage: res.data.totalPages,
        });
        // console.log(res.data);
      } else {
        dispatch({
          type: actionTypes.FETCH_PRODUCT_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_PRODUCT_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_PRODUCT_FAIL,
      });
    }
  };
};

export const fetchEmployee = (page, size, sort, direction, search) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetEmployeeService(
        page,
        size,
        sort,
        direction,
        search
      );
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_EMPLOYEE_SUCCESS,
          data: res.data.content,
          totalPage: res.data.totalPages,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_EMPLOYEE_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_EMPLOYEE_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_EMPLOYEE_FAIL,
      });
    }
  };
};

export const fetchDiscount = (page, size, sort, direction, search) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetEmployeeDiscountService(
        page,
        size,
        sort,
        direction,
        search
      );
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_EMPLOYEE_DISCOUNT_SUCCESS,
          data: res.data.content,
          totalPage: res.data.totalPages,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_EMPLOYEE_DISCOUNT_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_EMPLOYEE_DISCOUNT_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_EMPLOYEE_DISCOUNT_FAIL,
      });
    }
  };
};

export const fetchAllOrder = (date) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllOrderService(date);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_ORDER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_ORDER_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_ORDER_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_ORDER_FAIL,
      });
    }
  };
};

export const fetchRevenue = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetRevenueService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_REVENUE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REVENUE_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_REVENUE_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_REVENUE_FAIL,
      });
    }
  };
};

export const fetchAllRevenue = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllRevenueService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_REVENUE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_REVENUE_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_REVENUE_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_REVENUE_FAIL,
      });
    }
  };
};

export const fetchVoucher = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetVoucherService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_VOUCHER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_VOUCHER_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_VOUCHER_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_VOUCHER_FAIL,
      });
    }
  };
};
