//Dashboard.js

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  ToastContainer,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (e) {
    user = null;
  }

  const userId = user?.id || user?._id;

  const API_BASE = process.env.REACT_APP_API_URL || "https://smart-task-manager-5lyy.onrender.com";
  const navigate = useNavigate();

  // FETCH TASKS
  const fetchTasks = async () => {

    if (!userId) {
      toast.error("User not authenticated. Please login.");
      window.location.href = "/login";
      return;
    }

    try {

      setLoading(true);

      const res = await axios.get(`${API_BASE}/api/tasks/${userId}`);

      setTasks(res.data);

    } catch (error) {

      toast.error("Failed to fetch tasks");

    } finally {

      setLoading(false);

    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ADD TASK
  const addTask = async () => {

    if (!title) return;

    try {

      await axios.post(`${API_BASE}/api/tasks`, {
        title,
        userId,
        priority,
        dueDate,
      });

      setTitle("");
      setPriority("Medium");
      setDueDate("");

      fetchTasks();

      toast.success("Task added successfully");

    } catch (error) {

      toast.error("Failed to add task");

    }
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {

    try {

      await axios.delete(`${API_BASE}/api/tasks/${taskId}`);

      fetchTasks();

      toast.success("Task deleted");

    } catch (error) {

      toast.error("Failed to delete task");

    }
  };

  // OPEN EDIT
  const openEdit = (task) => {

    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || "");
  };

  // UPDATE TASK
  const updateTask = async () => {

    try {

      if (!editTitle) {
        toast.error("Task title is required");
        return;
      }

      await axios.put(
        `${API_BASE}/api/tasks/edit/${editingTask}`,
        {
          title: editTitle,
          priority: editPriority,
          dueDate: editDueDate,
        }
      );

      toast.success("Task updated");

      setEditingTask(null);

      fetchTasks();

    } catch (error) {

      toast.error("Failed to update task");

    }
  };

  // TOGGLE TASK
  const toggleTask = async (task) => {

    try {

      await axios.put(`${API_BASE}/api/tasks/toggle/${task._id}`);

      fetchTasks();

      toast.success("Task updated");

    } catch (error) {

      toast.error("Something went wrong");

    }
  };

  // USE EFFECT
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      window.location.href = "/login";
    }

    fetchTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title.toLowerCase().includes(
        search.toLowerCase()
      );

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Completed"
          ? task.completed
          : !task.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {
        sidebarOpen && (

          <div className="fixed inset-0 z-50 flex">

            {/* OVERLAY */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* MOBILE SIDEBAR */}
            <div className="relative w-64 bg-white h-full shadow-lg p-6 z-50">

              <div className="flex justify-between items-center mb-10">

                <h1 className="text-3xl font-bold text-blue-600">
                  Smart Task
                </h1>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-2xl text-gray-600"
                >
                  <FaTimes />
                </button>

              </div>

              <div className="space-y-4">

                <div className="bg-blue-100 text-blue-700 p-3 rounded-xl font-medium cursor-pointer" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </div>

                <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition duration-300" onClick={() => navigate("/tasks")}>
                  Tasks
                </div>

                <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition duration-300" onClick={() => navigate("/analytics")}>
                  Analytics
                </div>

                <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition duration-300" onClick={() => navigate("/settings")}>
                  Settings
                </div>

              </div>

            </div>

          </div>
        )
      }

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6 hidden md:block">

        <h1 className="text-3xl font-bold text-blue-600 mb-10">
          Smart Task
        </h1>

        <div className="space-y-4">

          <div className="bg-blue-100 text-blue-700 p-3 rounded-xl font-medium cursor-pointer" onClick={() => navigate("/dashboard")}>
            Dashboard
          </div>

          <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition duration-300" onClick={() => navigate("/tasks")}>
            Tasks
          </div>

          <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition duration-300" onClick={() => navigate("/analytics")}>
            Analytics
          </div>

          <div className="text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition duration-300" onClick={() => navigate("/settings")}>
            Settings
          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* NAVBAR */}
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow mb-8">

          <div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-2xl text-gray-700"
            >
              <FaBars />
            </button>

            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-gray-500">
              Organize your tasks and boost productivity.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
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

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-5 rounded-2xl shadow">

            <div className="flex justify-between items-center">

              <div>

                <p>Total Tasks</p>

                <h2 className="text-3xl font-bold">
                  {tasks.length}
                </h2>

              </div>

              <FaTasks className="text-4xl text-blue-500" />

            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">

            <div className="flex justify-between items-center">

              <div>

                <p>Completed</p>

                <h2 className="text-3xl font-bold">
                  {
                    tasks.filter((task) => task.completed).length
                  }
                </h2>

              </div>

              <FaCheckCircle className="text-4xl text-green-500" />

            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">

            <div className="flex justify-between items-center">

              <div>

                <p>Pending</p>

                <h2 className="text-3xl font-bold">
                  {
                    tasks.filter((task) => !task.completed).length
                  }
                </h2>

              </div>

              <FaClock className="text-4xl text-yellow-500" />

            </div>
          </div>
        </div>

        {/* ADD TASK */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Add New Task
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border rounded-xl px-4 py-3"
            />

            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl"
            >
              Add Task
            </button>

          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>

          </div>
        </div>

        {/* EDIT TASK */}
        {
          editingTask && (

            <div className="bg-white p-6 rounded-2xl shadow mb-8">

              <h2 className="text-2xl font-semibold mb-4">
                Edit Task
              </h2>

              <div className="flex flex-col md:flex-row gap-4">

                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 border rounded-xl px-4 py-3"
                />

                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="border rounded-xl px-4 py-3"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="border rounded-xl px-4 py-3"
                />

                <button
                  onClick={updateTask}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600"
                >
                  Cancel
                </button>

              </div>
            </div>
          )
        }

        {/* LOADING */}
        {
          loading && (
            <div className="text-center mb-4">
              Loading tasks...
            </div>
          )
        }

        {/* TASK LIST */}
        <div className="space-y-4">

          {
            filteredTasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-5 rounded-2xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >

                <div>

                  <h3 className="text-xl font-semibold">
                    {task.title}
                  </h3>

                  <div className="flex gap-3 mt-2">

                    <span
                      className={`text-white text-sm px-3 py-1 rounded-full ${task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        }`}
                    >
                      {task.priority}
                    </span>

                    {
                      task.dueDate && (
                        <span className="text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )
                    }

                  </div>
                </div>

                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={() => toggleTask(task)}
                    className={`px-4 py-2 rounded-xl text-white ${task.completed
                      ? "bg-yellow-500"
                      : "bg-green-500"
                      }`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    onClick={() => openEdit(task)}
                    className="px-4 py-2 rounded-xl bg-blue-500 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          }
        </div>

        <ToastContainer />

      </div>
    </div>
  );
}

export default Dashboard;