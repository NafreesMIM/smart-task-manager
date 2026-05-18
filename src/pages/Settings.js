import { useNavigate } from "react-router-dom";

function Settings() {
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
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">Settings</h1>
          <p className="text-slate-600 leading-relaxed">
            This is a settings placeholder page. Add profile settings, security options, and preferences here.
          </p>
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <p className="text-slate-700">Suggested settings modules:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              <li>Account details</li>
              <li>Notification preferences</li>
              <li>Theme and display options</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
