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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faListCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Confirmation from "../Component/Confirmation";

function Homepage() {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Local state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // API hooks
    const [addTodo, { isLoading: addingTodo }] = useAddTodoMutation();
    const [deleteTodo, { isLoading: deletingTodo }] = useDeleteTodoMutation();
    const [userLogout] = useUserLogoutMutation();

    // Protect route — redirect if not logged in
    useEffect(() => {
        if (!userInfo) navigate("/login");
    }, [userInfo, navigate]);

    //  Fetch todos only if logged in
    const {
        data: todos,
        refetch,
        isLoading: fetchingTodos,
    } = useGetTodosQuery(
        { userId: userInfo?._id },
        { skip: !userInfo } // prevents unauthorized calls
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

    // Delete Todo
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
            navigate("/login", { replace: true });
            window.location.reload(); // ensures fresh login screen
            toast.success("Logout Successfully");
        } catch (error) {
            toast.error("Logout Failed");
            console.error(error);
        }
    };

    const isAnyLoading = fetchingTodos || addingTodo || deletingTodo;

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 relative">
            {/* Left Panel (Main Form on Mobile) */}
            <div className="flex-1 flex flex-col gap-10 p-6 md:p-12 overflow-y-auto bg-white/10 backdrop-blur-xl md:border-r border-white/10 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">Todo App</h1>
                        <p className="text-indigo-100/60 mt-2 text-sm font-medium">Simplify your daily goals.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Mobile Toggle Button */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 text-white shadow-xl backdrop-blur-lg active:scale-90 transition-transform"
                            title="View Tasks"
                        >
                            <FontAwesomeIcon icon={faListCheck} className="text-xl" />
                        </button>

                        <button 
                            onClick={() => setShowConfirmation(true)} 
                            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/40"
                            title="Logout"
                        >
                            <FontAwesomeIcon icon={faPowerOff} className="text-xl" />
                        </button>
                    </div>
                </div>

                {showConfirmation && (
                    <Confirmation
                        onConfirm={logoutHandler}
                        onCancel={() => setShowConfirmation(false)}
                    />
                )}

                <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
                    <form onSubmit={addTodoHandler} className="flex flex-col gap-6 animate-fadeIn">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-premium py-5 text-lg border-white/10 text-white placeholder-white/30 bg-white/5 focus:bg-white/10"
                            required
                        />
                        <textarea
                            placeholder="Any details you'd like to add?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input-premium py-5 min-h-[180px] resize-none border-white/10 text-white placeholder-white/30 bg-white/5 focus:bg-white/10"
                            required
                        ></textarea>

                        <button type="submit" className="btn-premium w-full py-5 text-xl font-black !from-indigo-600 !to-indigo-800 shadow-2xl" disabled={addingTodo}>
                            {addingTodo ? "Syncing..." : "Add to List"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Panel (Sidebar/Drawer on Mobile) */}
            <div className={`
                fixed inset-0 z-50 transition-all duration-500 ease-in-out md:relative md:inset-auto md:flex-1 md:translate-x-0 md:bg-white/5 md:backdrop-blur-sm
                ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                bg-indigo-950/95 backdrop-blur-3xl flex flex-col
            `}>
                {/* Mobile Close Button */}
                <div className="md:hidden flex justify-end p-6 border-b border-white/10">
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white active:scale-95 transition-transform"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                    </button>
                </div>

                <div className="flex-1 text-center p-6 md:p-10 overflow-y-auto custom-scrollbar">
                    {isAnyLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <ScaleLoader color="white" />
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

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default Homepage;
