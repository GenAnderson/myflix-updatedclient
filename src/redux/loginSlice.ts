import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState } from "../interfaces";

export const initialState: LoginState = {
  username: "",
  password: "",
  isLoading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    clearLoginState(state) {
      state.username = "";
      state.password = "";
      state.isLoading = false;
    },
  },
});

export const { setUsername, setPassword, setLoading, clearLoginState } =
  loginSlice.actions;
export default loginSlice.reducer;
