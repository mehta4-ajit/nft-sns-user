import React, { useState } from "react";
import { Wallet, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedAlert from "./Alertanimated";

export default function LoginPage() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAlert(null);

    if (!form.email || !form.password) {
      setAlert({ type: "error", message: "Email and password are required" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("wallet_connected", data.wallet_connected);
        localStorage.setItem("wallet_address", data.active_wallet?.address || "");

        // Show success alert
        setAlert({ type: "success", message: "Login successful!" });

        // Redirect after short delay
        setTimeout(() => {
          navigate("/profile");
        }, 1200);
      } else {
        setAlert({ type: "error", message: data.message || "Login failed" });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Something went wrong. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-white relative">

      {alert && (
        <AnimatedAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Logo */}
      <div className="mb-6">
        <img src="logo (2).png" alt="Logo" className="w-20 h-20 object-contain" />
      </div>

      {/* Headings */}
      <h1 className="text-3xl font-bold mb-2 text-center glow">Welcome Back</h1>
      <p className="text-gray-400 mb-8 text-center text-sm sm:text-base">
        Login to your <span className="text-gray-400">MINTIOLAB</span> account
      </p>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black rounded-2xl p-6 sm:p-8 border border-[#18181B] shadow-[0_0_20px_rgba(36,203,245,0.3)] transition-all duration-300"
      >
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <button type="button" className="text-cyan-400 text-sm hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md font-semibold text-black text-base bg-gradient-to-r from-[#24CBF5] to-[#9952E0] hover:opacity-90 transition-opacity"
        >
          {loading ? "Logging in..." : "Login"}
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="text-gray-400 text-xs mx-3">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Connect Wallet Button (blocked until login) */}
        <button
          type="button"
          onClick={() => setAlert({
            type: "info",
            message: "Please login first before connecting a wallet."
          })}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-md border border-cyan-400 text-white hover:bg-cyan-400/10 transition-colors"
        >
          <Wallet className="w-5 h-5 text-cyan-400" />
          Connect Wallet
        </button>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
