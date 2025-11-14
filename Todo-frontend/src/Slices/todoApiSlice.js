import { apiSlice } from "./apiSlices";

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // 🟢 Get all todos for a user
    getTodos: build.query({
      query: ({ userId }) => ({
        url: `/api/todo/getTodos`,
        method: "GET",
        params: { userId },
        credentials: "include",
      }),
      providesTags: ["Todo"],
    }),

    // 🟢 Get one todo by ID
    getTodo: build.query({
      query: (id) => ({
        url: `/api/todo/getTodoById`,
        method: "GET",
        params: { id },
        credentials: "include",
      }),
      providesTags: ["Todo"],
    }),

    // 🟢 Create new todo
    addTodo: build.mutation({
      query: (data) => ({
        url: `/api/todo/createTodo`,
        method: "POST",
        body: data,
        credentials: "include", // ✅ send cookies/JWT
      }),
      invalidatesTags: ["Todo"],
    }),

    // 🟡 Update a todo
    updateTodo: build.mutation({
      query: (data) => ({
        url: `/api/todo/updateTodo`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Todo"],
    }),

    // 🔴 Delete a todo
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/api/todo/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useGetTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
