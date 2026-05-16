// BACKEND - routes/tasks.js

import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE TASK
router.post("/", async (req, res) => {

  try {

    const {
      title,
      userId,
      priority,
      dueDate,
    } = req.body;

    const newTask = new Task({
      title,
      userId,
      priority,
      dueDate,
    });

    await newTask.save();

    res.status(201).json(newTask);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// GET TASKS
router.get("/:userId", async (req, res) => {

  try {

    const tasks = await Task.find({
      userId: req.params.userId,
    });

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// DELETE TASK
router.delete("/:taskId", async (req, res) => {

  try {

    await Task.findByIdAndDelete(
      req.params.taskId
    );

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

// UPDATE TASK DETAILS
router.put("/edit/:taskId", async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to update task",
    });

  }
});


// TOGGLE TASK COMPLETE
router.put("/toggle/:taskId", async (req, res) => {

  try {

    const task = await Task.findById(req.params.taskId);

    task.completed = !task.completed;

    await task.save();

    res.status(200).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to toggle task",
    });

  }
});

export default router;