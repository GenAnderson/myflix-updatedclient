import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserState, UserProps } from "../interfaces";

export const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const user = state.user.user;
    const token = state.user.token;

    if (!user) {
      return rejectWithValue("No user found");
    }

    try {
      const response = await fetch(
        `https://movieapi-yazx.onrender.com/users/${user.Username}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      return rejectWithValue(`Something went wrong. Error: ${error}`);
    }
  }
);

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
