import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/indexReducers";

const store = configureStore({
  reducer: rootReducer
});

export default store;