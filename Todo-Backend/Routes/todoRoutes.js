import express from "express";
import { createTodoHandler, deleteTodo,  getTodoHandler,  getTodosHandler, updateTodoHandler, } from "../controller/todoController.js";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router()


router.get('/getTodos', protect, getTodosHandler)

router.get('/getTodoById', protect, getTodoHandler)

router.post('/createTodo', protect, createTodoHandler)

router.patch('/updateTodo', protect, updateTodoHandler)

router.delete('/:id', protect, deleteTodo)

export default router;