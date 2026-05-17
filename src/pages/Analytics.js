import { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";


const API_BASE = process.env.REACT_APP_API_URL || "https://smart-task-manager-5lyy.onrender.com";

function Analytics() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const userId = user?.id;

    const fetchTasks = async () => {
        try {

            const res = await axios.get(
                `${API_BASE}/api/tasks/${userId}`
            );

            setTasks(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchTasks();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //TASK STATS

    const completedTasks =
        tasks.filter((task) => task.completed).length;

    const pendingTasks =
        tasks.filter((task) => !task.completed).length;

    const completionRate =
        tasks.length > 0
            ? ((completedTasks / tasks.length) * 100).toFixed(0)
            : 0;

    // Prepare data for charts
    const pieData = [
        { name: "Completed", value: completedTasks },
        { name: "Pending", value: pendingTasks },
    ];

    const COLORS = ["#22c55e", "#eab308"];

    const barData = [
        {
            name: "Low",
            tasks: tasks.filter(
                (task) => task.priority === "Low"
            ).length,
        },
        {
            name: "Medium",
            tasks: tasks.filter(
                (task) => task.priority === "Medium"
            ).length,
        },
        {
            name: "High",
            tasks: tasks.filter(
                (task) => task.priority === "High"
            ).length,
        },
    ];

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <button
                onClick={() => navigate("/dashboard")}
                className="mb-6 bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600"
            >
                Back to Dashboard
            </button>

            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Analytics Dashboard
            </h1>

            {/* STAT CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                <div className="bg-white p-6 rounded-2xl shadow">
                    <p className="text-gray-500">
                        Total Tasks
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {tasks.length}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <p className="text-gray-500">
                        Completed
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-green-500">
                        {completedTasks}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <p className="text-gray-500">
                        Pending
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-yellow-500">
                        {pendingTasks}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <p className="text-gray-500">
                        Completion Rate
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-blue-500">
                        {completionRate}%
                    </h2>
                </div>

            </div>

            {/* CHARTS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* PIE CHART */}

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="text-2xl font-semibold mb-6">
                        Task Status
                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label
                                >

                                    {
                                        pieData.map((entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* BAR CHART */}

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="text-2xl font-semibold mb-6">
                        Tasks by Priority
                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart data={barData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="tasks"
                                    fill="#3b82f6"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Analytics;