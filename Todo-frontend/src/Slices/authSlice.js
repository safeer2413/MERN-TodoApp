import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // ✅ Login or register success
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },

        // ✅ Proper logout
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo"); // only remove auth info
            sessionStorage.clear(); // optional: clear session-based data
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
