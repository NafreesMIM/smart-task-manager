import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTasks,
  FaCheckCircle,
  Faclock,
  FaClock,
} from "react-icons/fa";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userId = user?.id;

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
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 hidden md:block">

        <h1 className="text-3xl font-bold text-blue-600 mb-10">
          Smart Task
        </h1>

        <div className="space-y-4">

          <div className="bg-blue-100 text-blue-700 p-3 rounded-xl font-medium">
            Dashboard
          </div>

          <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer">
            Tasks
          </div>

          <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer">
            Analytics
          </div>

          <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer">
            Settings
          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-6">

        {/* Navbar */}

        <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow mb-8">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-gray-500">
              Organize your tasks and boost your productivity with Smart Task.
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl fond-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total Tasks
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {tasks.length}
                </h2>

              </div>

              <FaTasks className="text-4xl text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Completed
                </p>

                <h2>
                  {
                    tasks.filter((task) => task.completed).length
                  }
                </h2>
              </div>

              <FaCheckCircle className="text-4xl text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Pending
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {
                    tasks.filter((task) => !task.completed).length
                  }
                </h2>
              </div>

              <FaClock className="text-4xl text-yellow-500" />

            </div>
          </div>
        </div>

        {/* Add Task */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <h2 className="text-2xt font-semibold mb-4">
            Add New Task
          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter your task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600">
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}

        <div className="space-y-4">
          {
            tasks.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl shadow text-center text-gray-500">
                No tasks found. Add a new task to get started!
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id}
                  className="bg-white p-5 rounded-2xl shadow flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
                 
                  <h3 className="text-xl font-semibold">
                    {task.title}
                  </h3>

                  <h3 className={`text-sm font-medium ${
                    task.completed 
                    ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {task.title}
                  </h3>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleTask(task._id)}
                      className={`px-4 py-2 rounded-xl text-white ${
                        task.completed 
                        ? "bg-yellow-500 hover:bg-yellow-600" 
                        : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {task.completed? "Undo" : "Complete"}
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard;