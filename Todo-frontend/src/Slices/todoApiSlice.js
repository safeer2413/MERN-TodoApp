import { apiSlice } from "./apiSlices";

export const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query({
            query: ({ userId }) => ({
                url: `/api/todo/getTodos`,
                params: { userId }
            })
        }),
        getTodo: build.query({
            query: (id) => ({
                url: '/api/todo/getTodoById',
                method: 'GET',
                params: { id }
            })
        }),
        addTodo: build.mutation({
            query: (data) => ({
                url: `/api/todo/createTodo`,
                method: 'POST',
                body: data
            })
        }),
        updateTodo: build.mutation({
            query: (data) => ({
                url: '/api/todo/updateTodo',
                method: 'PATCH',
                body: data
            })
        }),
        deleteTodo: build.mutation({
            query: (id) => ({
                url: `/api/todo/${id}`,  // Expecting just the ID
                method: 'DELETE',
            }),
        })
    })
})

export const {
    useAddTodoMutation,
    useGetTodosQuery,
    useGetTodoQuery,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todoApiSlice