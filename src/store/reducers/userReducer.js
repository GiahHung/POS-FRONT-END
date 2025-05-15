import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  order: "",
  products: [],
  productCategory: [],
  orderCreate: "",
  customers: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      //   console.log("check action:::::::::", action);
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.data,
      };
    case actionTypes.FETCH_ALL_PRODUCT_FAIL:
      return {
        ...state,
        products: [],
      };
    case actionTypes.FETCH_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.data,
      };
    case actionTypes.FETCH_PRODUCT_CATEGORY_FAIL:
      return {
        ...state,
        products: [],
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      console.log("order reducer", action.data);
      return {
        ...state,
        orderCreate: action.data,
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        orderCreate: "",
      };
    case actionTypes.FETCH_ONE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.data,
      };
    case actionTypes.FETCH_ONE_ORDER_FAIL:
      return {
        ...state,
        order: "",
      };
    case actionTypes.ADD_PRODUCT_TO_ORDER_SUCCESS:
      return {
        ...state,
        order: action.data,
      };
    case actionTypes.ADD_PRODUCT_TO_ORDER_FAIL:
      return {
        ...state,
        order: [],
      };
    case actionTypes.ADD_DISCOUNT_CODE_SUCCESS:
      return {
        ...state,
        order: action.data,
      };
    // case actionTypes.ADD_DISCOUNT_CODE_FAIL:
    //   return {
    //     ...state,
    //     order: [],
    //   };
    case actionTypes.ADD_VOUCHER_CODE_SUCCESS:
      return {
        ...state,
        order: action.data,
      };
    // case actionTypes.ADD_VOUCHER_CODE_FAIL:
    //   return {
    //     ...state,
    //     order: [],
    //   };
    case actionTypes.REMOVE_PRODUCT_FROM_ORDER_SUCCESS:
      return {
        ...state,
        order: action.data,
      };
    case actionTypes.REMOVE_PRODUCT_FROM_ORDER_FAIL:
      return {
        ...state,
        order: [],
      };
    case actionTypes.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: action.data,
      };
    case actionTypes.FETCH_CUSTOMER_FAIL:
      return {
        ...state,
        customers: [],
      };
    case actionTypes.DESELECT_CUSTOMER_SUCCESS:
      return {
        ...state,
        order: action.data,
      };
    case actionTypes.DESELECT_CUSTOMER_FAIL:
      return {
        ...state,
        order: [],
      };
    default:
      return state;
  }
};

export default userReducer;
