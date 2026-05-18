import { FaCog, FaShieldAlt } from "react-icons/fa";
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
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
              <p className="mt-2 text-slate-600">
                Configure account preferences, security settings, and UI behavior from one central place.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3 text-white shadow-lg">
              <FaCog className="text-xl text-cyan-300" />
              <span className="font-medium">Preferences</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3 text-slate-900 font-semibold">
                <FaShieldAlt className="text-cyan-500" />
                Security
              </div>
              <p className="mt-3 text-slate-600">
                Manage password settings, session control, and authentication preferences.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Personalization</h2>
              <p className="mt-3 text-slate-600">
                Customize the app experience with themes, notification settings, and display options.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <p className="text-slate-700 font-medium">Ready to expand?</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
              <li>Profile management</li>
              <li>Notification preferences</li>
              <li>Privacy controls</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
