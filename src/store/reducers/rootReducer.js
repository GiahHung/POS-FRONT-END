import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import appReducer from "./appReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storageSession,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};

export default (history) =>
  combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    app: appReducer,
    admin: adminReducer,
  });
