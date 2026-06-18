import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

function TodoCard({ todos, deleteTodo, isLoading }) {
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-black text-white mb-10 tracking-tight">Your Tasks</h1>
      <div className="relative flex flex-col gap-6 p-4">
        {(!todos || todos.length === 0) ? (
          isLoading ? (
            <div className="loader">
              <ScaleLoader color="rgb(29, 12, 91)" />
            </div>
          ) : (
            <p className="empty-message">No todos yet! Add some tasks.</p>
          )
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-card group flex items-center justify-between
            bg-[rgba(118,97,184,1)]/80 backdrop-blur-md p-5 rounded-[2rem] border border-white/20
            shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-[rgb(222,216,239)]">
              <div className="flex-1 pr-4">
                <h2
                  className="text-xl font-black mb-1 transition-all duration-300"
                  style={{
                    textDecoration: todo.status ? "line-through" : "none",
                    opacity: todo.status ? 0.4 : 1,
                    color: todo.status ? "#635980" : "#1e1b4b",
                  }}
                >
                  {todo.title}
                </h2>
                <p
                  className="text-sm font-medium transition-all duration-300"
                  style={{
                    textDecoration: todo.status ? "line-through" : "none",
                    opacity: todo.status ? 0.6 : 0.8,
                    color: todo.status ? "#786e96" : "#4b5563",
                  }}
                >
                  {todo.description}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  className="w-11 h-11 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-[0_8px_20px_rgba(79,70,229,0.3)] transition-all duration-300 transform active:scale-90"
                  onClick={() => navigate(`/${todo._id}`)}
                  title="Edit Task"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                </button>
                <button
                  className="w-11 h-11 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)] transition-all duration-300 transform active:scale-90"
                  onClick={() => deleteTodo(todo._id)}
                  title="Delete Task"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-lg" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoCard;
