import { apiSlice } from "./apiSlices";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: `/api/users/login`,
        method: "POST",
        body: data,
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: `/api/users/register`,
        method: "POST",
        body: data,
      }),
    }),

    userLogout: builder.mutation({
      query: () => ({
        url: `/api/users/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useRegisterUserMutation,
  useUserLogoutMutation,
} = userApiSlice;

export default userApiSlice;
