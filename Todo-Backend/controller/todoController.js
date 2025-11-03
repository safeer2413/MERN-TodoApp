import asyncHandler from "../middlewares/asyncHandler.js";
import Todo from "../Model/todoModel.js";

// Create new todo
const createTodoHandler = asyncHandler(async (req, res) => {

    const { title, description, userId } = req.body

    if (!title || !description || !userId) {
        return res.status(400).json({ message: 'Please provide all fields' });
    };

    const todo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
    })
    return res.status(201).json(todo);
});

// Get all todos
const getTodosHandler = asyncHandler(async (req, res) => {
    const getTodo = await Todo.find({ userId: req.query.userId })

    return res.json(getTodo);
});


const updateTodoHandler = asyncHandler(async (req, res) => {
    const { title, description, status, id } = req.body;

    if (!title) {

        return res.status(400).json({ message: 'unknown title' })
    }
    if (!description) {
        return res.status(400).json({ message: 'unknown description' })
    }

    const findTodo = await Todo.findOne({ _id: id })

    if (findTodo) {
        let updateTodo = await Todo.findByIdAndUpdate(
            findTodo._id, { title, description, status })
        return res.json(updateTodo)
    }
    else {
        return res.status(400).json({ message: 'Todo not found' })
    }

});

// Get one todo by ID
const getTodoHandler = asyncHandler(async (req, res) => {

    const { id } = req.query;

    const todo = await Todo.findById(id)

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    return res.json(todo);

});


// Delete todo
const deleteTodo = asyncHandler(async (req, res) => {


    const id = await Todo.findByIdAndDelete(req.params.id);

    if (!id) {
        return res.status(404).json({ message: 'Todo not found' })
    };

    res.status(200).json({ message: "Successfully Deleted" });

});

export {
    createTodoHandler,
    updateTodoHandler,
    getTodosHandler,
    getTodoHandler,
    deleteTodo
};