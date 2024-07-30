import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./Slices/MainSlice";

export const store = configureStore({
  reducer: {
    mainSlice: MainSlice,
  },
});
