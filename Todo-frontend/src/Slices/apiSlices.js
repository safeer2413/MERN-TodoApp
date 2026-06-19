import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", // optional but good
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include", // ✅ include cookies in requests
        prepareHeaders: (headers, { getState }) => {
            headers.set("Content-Type", "application/json");
            
            // Try to get token from state first
            let token = getState().auth?.userInfo?.token;
            
            // Fallback to localStorage if state is not hydrated yet
            if (!token) {
                const userInfoStr = localStorage.getItem("userInfo");
                if (userInfoStr) {
                    try {
                        const userInfo = JSON.parse(userInfoStr);
                        token = userInfo?.token;
                    } catch (e) {
                        console.error("Error parsing userInfo from localStorage:", e);
                    }
                }
            }

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Todos"],
    endpoints: () => ({}),
});
