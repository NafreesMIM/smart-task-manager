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

export default router;