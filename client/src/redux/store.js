import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "./reducers/blogsReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    filter: filterReducer,
    notification: notificationReducer,
  }
});

export default store;