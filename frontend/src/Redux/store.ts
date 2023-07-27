import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userInfoSlicer from "./user/userInfoSlicer";
import adminTokenSlice from "./admin/adminTokenSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  userInfo: userInfoSlicer,
  adminToken:adminTokenSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;

export type StoreType = typeof store;
