import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
