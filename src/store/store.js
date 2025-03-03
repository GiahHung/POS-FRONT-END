import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers/rootReducer"; // rootReducer là object, không phải function
import { thunk } from "redux-thunk";
import storageSession from "redux-persist/lib/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // Optional state reconciler

// Cấu hình Redux Persist với sessionStorage
const persistConfig = {
  key: "root", // Key của Redux Persist
  storage: storageSession, // Dùng sessionStorage thay vì localStorage
  stateReconciler: autoMergeLevel2, // Tùy chọn: merge lại state khi rehydrate
};

// Bọc rootReducer với persistReducer để lưu state vào sessionStorage
const persistedReducer = persistReducer(persistConfig, rootReducer());

// Tạo Redux Store với persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Bỏ qua check serialize cho Redux Persist
      },
    }).concat(thunk), // Thêm middleware như redux-thunk
  devTools: process.env.NODE_ENV !== "production", // Bật Redux DevTools khi ở chế độ dev
});

// Tạo persistor để quản lý việc lưu trữ Redux state
export const persistor = persistStore(store);

export default store;
