import { useState, useEffect } from "react";
import TodoCard from "../Component/TodoCard";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
} from "../Slices/todoApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";
import "./Login.css";

function Homepage() {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 🧾 Local state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // 🧠 API hooks
    const [addTodo, { isLoading: addingTodo }] = useAddTodoMutation();
    const [deleteTodo, { isLoading: deletingTodo }] = useDeleteTodoMutation();
    const [userLogout] = useUserLogoutMutation();

    // 🚫 Protect route — redirect if not logged in
    useEffect(() => {
        if (!userInfo) navigate("/login");
    }, [userInfo, navigate]);

    // 📦 Fetch todos only if logged in
    const {
        data: todos,
        refetch,
        isLoading: fetchingTodos,
    } = useGetTodosQuery(
        { userId: userInfo?._id },
        { skip: !userInfo } // ⛔ prevents unauthorized calls
    );

    // ➕ Add Todo
    const addTodoHandler = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        try {
            await addTodo({ title, description, userId: userInfo._id }).unwrap();
            toast.success("Todo Added Successfully");
            refetch();
            setTitle("");
            setDescription("");
        } catch (error) {
            toast.error(error?.data?.message || "Error adding todo");
            console.error(error);
        }
    };

    // ❌ Delete Todo
    const deleteTodoHandler = async (id) => {
        try {
            await deleteTodo(id).unwrap();
            refetch();
            toast.success("Todo Deleted Successfully");
        } catch (error) {
            toast.error("Error deleting todo");
            console.error(error);
        }
    };

    // 🚪 Logout (with full cleanup)
    const logoutHandler = async () => {
        try {
            await userLogout().unwrap(); // clear cookie (backend)
            dispatch(logout()); // clear redux
            localStorage.clear();
            sessionStorage.clear();
            navigate("/login", { replace: true });
            window.location.reload(); // ensures fresh login screen
        } catch (error) {
            toast.error("Logout Failed");
            console.error(error);
        }
    };

    const isAnyLoading = fetchingTodos || addingTodo || deletingTodo;

    return (
        <div className="screen-container">
            {/* 🧭 Left Panel */}
            <div className="todo-wrapper left-panel">
                <button onClick={logoutHandler} className="logout-btn">
                    Log Out
                </button>

                <h1 className="app-title">Todo App</h1>

                <form onSubmit={addTodoHandler} className="todo-form">
                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="todo-input"
                        required
                    />
                    <textarea
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="todo-textarea"
                        required
                    ></textarea>

                    <button type="submit" className="todo-button" disabled={addingTodo}>
                        {addingTodo ? "Adding..." : "Add Todo"}
                    </button>
                </form>
            </div>

            {/* 🧭 Right Panel */}
            <div className="right-panel">
                {isAnyLoading ? (
                    <div className="loader-container">
                        <ScaleLoader color="rgb(29, 12, 91)" />
                    </div>
                ) : (
                    <TodoCard
                        todos={todos}
                        isLoading={fetchingTodos}
                        deleteTodo={deleteTodoHandler}
                    />
                )}
            </div>
        </div>
    );
}

export default Homepage;
