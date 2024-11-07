import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loginReducer from "./loginSlice";
import movieReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    movies: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
