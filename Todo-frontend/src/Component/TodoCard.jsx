import React from "react";
import "./TodoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners"; // ✅ Don't forget this!

function TodoCard({ todos, deleteTodo, isLoading }) {
  const navigate = useNavigate();

  return (
    <div className="todo-container">
      <h1 className="todo-heading">Your Todos</h1>
      <div className="todo-list">
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
            <div key={todo._id} className="todo-card">
              <h2
                className="todo-title"
                style={{
                  textDecoration: todo.status ? "line-through" : "none",
                  color: todo.status ? "rgb(99, 89, 128)" : "",
                }}
              >
                {todo.title}
              </h2>
              <p
                className="todo-desc"
                style={{
                  textDecoration: todo.status ? "line-through" : "none",
                  color: todo.status ? "rgb(99, 89, 128)" : "",
                }}
              >
                <b>{todo.description}</b>
              </p>
              <button
                className="delete-button"
                onClick={() => navigate(`/${todo._id}`)}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="delete-icon" />
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo._id)}
              >
                <FontAwesomeIcon icon={faTrash} className="delete-icon" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoCard;
