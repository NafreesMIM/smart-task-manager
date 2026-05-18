import { FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Back to Dashboard
        </button>

        <div className="rounded-[30px] bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
              <p className="mt-2 text-slate-600">
                Access your task workflow, update priorities, and view actionable status cards.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3 text-white shadow-lg">
              <FaClipboardList className="text-xl text-cyan-300" />
              <span className="font-medium">Task Overview</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Task Planning</h2>
              <p className="mt-3 text-slate-600">
                Plan tasks with deadlines, assign priorities, and keep your workload balanced.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Progress Tracking</h2>
              <p className="mt-3 text-slate-600">
                Track completion metrics, view pending items, and make smarter daily decisions.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <div className="flex items-center gap-3 text-slate-700">
              <FaCheckCircle className="text-cyan-500" />
              <span className="font-medium">Next steps:</span>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
              <li>Integrate task detail cards</li>
              <li>Enable filtering by due date and priority</li>
              <li>Add quick action buttons for bulk updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
