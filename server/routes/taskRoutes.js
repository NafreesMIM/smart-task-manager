import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { title, userId } = req.body;

    const task = new Task({
      title,
      user: userId,
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create task",
    });

  }

});

router.get("/:userId", async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.params.userId
    });

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });

  }
});

//delete task
router.delete("/:taskId", async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.taskId);

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

//TOGGLE COMPLETE TASK
router.put("/:taskId", async (req, res) => {

  try {

    const task = await Task.findById(req.params.taskId);
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

export default router;