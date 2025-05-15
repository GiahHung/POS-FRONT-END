import actionTypes from "../actions/actionTypes";

const initialState = {
  categoryId: "",
  paymentId: "",
  roleId: "",
  product: "",
  totalPage: "",
  employees: "",
  discount: "",
  orders: "",
  revenue: "",
  arrRevenue: [],
  arrVoucher: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryId: action.data,
      };
    case actionTypes.FETCH_CATEGORY_FAIL:
      return {
        ...state,
        categoryId: [],
      };
    case actionTypes.FETCH_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentId: action.data,
      };
    case actionTypes.FETCH_PAYMENT_FAIL:
      return {
        ...state,
        paymentId: [],
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roleId: action.data,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      return {
        ...state,
        roleId: [],
      };
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.data,
        totalPage: action.totalPage,
      };
    case actionTypes.FETCH_PRODUCT_FAIL:
      return {
        ...state,
        product: [],
        totalPage: 0,
      };
    case actionTypes.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.data,
        totalPage: action.totalPage,
      };
    case actionTypes.FETCH_EMPLOYEE_FAIL:
      return {
        ...state,
        employees: [],
        totalPage: 0,
      };
    case actionTypes.FETCH_EMPLOYEE_DISCOUNT_SUCCESS:
      return {
        ...state,
        discount: action.data,
        totalPage: action.totalPage,
      };
    case actionTypes.FETCH_EMPLOYEE_DISCOUNT_FAIL:
      return {
        ...state,
        orders: [],
      };
    case actionTypes.FETCH_ALL_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.data,
      };
    case actionTypes.FETCH_ALL_ORDER_FAIL:
      return {
        ...state,
        orders: [],
      };
    case actionTypes.FETCH_REVENUE_SUCCESS:
      return {
        ...state,
        revenue: action.data,
      };
    case actionTypes.FETCH_REVENUE_FAIL:
      return {
        ...state,
        revenue: "",
      };
    case actionTypes.FETCH_ALL_REVENUE_SUCCESS:
      return {
        ...state,
        arrRevenue: action.data,
      };
    case actionTypes.FETCH_ALL_REVENUE_FAIL:
      return {
        ...state,
        arrRevenue: "",
      };
    case actionTypes.FETCH_VOUCHER_SUCCESS:
      return {
        ...state,
        arrVoucher: action.data,
      };
    case actionTypes.FETCH_VOUCHER_FAIL:
      return {
        ...state,
        arrVoucher: "",
      };
    default:
      return state;
  }
};

export default adminReducer;
