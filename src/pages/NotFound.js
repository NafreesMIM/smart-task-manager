import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl rounded-[32px] bg-slate-900/95 p-10 text-center shadow-2xl shadow-slate-900/20">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">404 Not Found</p>
        <h1 className="mt-6 text-5xl font-semibold text-white">Page does not exist</h1>
        <p className="mt-4 text-slate-400">
          The page you are looking for couldn’t be found. Use the button below to return to the dashboard.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 inline-flex rounded-3xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default NotFound;
