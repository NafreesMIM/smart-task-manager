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
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">Tasks</h1>
          <p className="text-slate-600 leading-relaxed">
            This page is a placeholder for your tasks management view.
            You can extend it later with a list, filters, and task controls.
          </p>
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <p className="text-slate-700">Future features:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              <li>Task categorization</li>
              <li>Drag-and-drop ordering</li>
              <li>Priority and due date filtering</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
