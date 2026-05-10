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

  
  //create task
  const addTask = async () => {
    if(!title) return;

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

    }catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return(
    <div style={{padding: "20px"}}>
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
          <div key={task._id}>
            <h3>{task.title}</h3>
          </div>
        ))
      }
      
    </div>
  );  
}

export default Dashboard;