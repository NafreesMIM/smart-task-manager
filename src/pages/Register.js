import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://smart-task-manager-5lyy.onrender.com";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/api/auth/register`, formData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl md:max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-white">Create Your Account</h1>
            <p className="mt-3 text-sm text-slate-300">Register to start organizing your tasks and boosting productivity.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
            <p>Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-white hover:text-cyan-300"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;