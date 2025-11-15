import { apiSlice } from "./apiSlices"

const USERS_URL = import.meta.env.VITE_API_URL + "/api/users";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        userLogin: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials: "include",
            }),
        }),

        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
                credentials: "include",
            }),
        }),
        userLogout: builder.mutation({
            query: () => ({
                url: "/api/users/logout",
                method: "POST",
                credentials: "include", // ✅
            }),
        })
    })
})

export const {
    useUserLoginMutation,
    useRegisterUserMutation,
    useUserLogoutMutation
} = userApiSlice

export default userApiSlice;
