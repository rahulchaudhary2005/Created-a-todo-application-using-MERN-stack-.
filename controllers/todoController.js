import Todo from "../models/todoModel.js";

// Get todos for logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add todo for logged-in user
export const addTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      completed: false,
      userId: req.user.id,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
