import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const userId = "69fe21db18810452c853b6fe"; // Replace with actual user ID

  //fetch tasks for the user

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/tasks/${userId}`
      );
      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };


  //logout
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };



  //create task
  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          userId,
        }
      );

      setTitle("");
      fetchTasks(); // Refresh tasks after adding a new one

    } catch (error) {
      console.log(error);

    }
  };

  //Delete task
  const deleteTask = async (taskId) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${taskId}`
      );

      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.log(error);
    }
  };

  //toggle task
  const toggleTask = async (taskId) => {

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
      );

      fetchTasks(); // Refresh tasks after toggling
    } catch (error) {
      console.log(error);
    }


  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }

    fetchTasks();

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <button onClick={logout}>
        Logout
      </button>

      <h1>Task Dashboard</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <hr />

      {
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}>


            <h3
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {task.title}
            </h3>

            <button onClick={() => toggleTask(task._id)}>
              {task.completed ? "Undo" : "Completed"}
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;