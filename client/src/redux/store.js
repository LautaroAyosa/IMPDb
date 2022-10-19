import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./reducers/moviesReducer";
import personsReducer from "./reducers/personsReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    persons: personsReducer,
    notification: notificationReducer,
  }
});

export default store;