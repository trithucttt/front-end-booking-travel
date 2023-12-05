import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated:
      JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      } else {
        console.log("Không có thông tin user khi login");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { loginSuccess } = userSlice.actions;
export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
