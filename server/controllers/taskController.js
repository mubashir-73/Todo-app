const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const getTasks = asyncHandler(async (req, res) => {
  const list = await Task.find();
  res.status(200).json(list);
});

const createTask = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { task } = req.body;
  if (!task) {
    res.status(400);
    throw new Error("All fields are mandatory! ");
  }
  const list = await Task.create({
    //had to change task to Task because i have already declared it in const{task}=req.body
    task,
  });
  res.status(201).json(list);
});

const updateTask = asyncHandler(async (req, res) => {
  const list = await Task.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error("Task was not found");
  }
  const updatedList = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedList);
});

const getTask = asyncHandler(async (req, res) => {
  const list = await Task.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error("Task was not found");
  }
  res.status(200).json(list);
  res.json({ message: `Display only the task with id ${req.params.id}` });
});

const deleteTask = asyncHandler(async (req, res) => {
  const list = await Task.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error("Task was not found");
  }
  await Task.deleteOne({ _id: req.params.id });
  res.status(200).json(list);
});

module.exports = { getTasks, createTask, updateTask, getTask, deleteTask };
