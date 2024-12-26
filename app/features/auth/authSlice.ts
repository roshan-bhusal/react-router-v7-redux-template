import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  role: string;
  permissions: string[];
}

interface AuthState {
  user: User | null;
}
const initialState: AuthState = {
  user: {
    id: "0",
    role: "guest",
    permissions: [],
  }, // Dummy data for initial state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
