import React, { useState,useEffect } from "react";
import { Wallet, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedAlert from "./Alertanimated";

export default function RegisterPage() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

   useEffect(() => {
  setForm({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
}, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email || !form.password || !form.confirmPassword || !form.role) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("temp_user_id", data.user_id);
        navigate("/profile");
      } else {
        setError(data.message || "Registration failed");
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 relative">

      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Back</span>
      </Link>

      <div className="w-full max-w-md py-8 sm:py-10">
        <div className="mb-4 flex justify-center">
          <img src="logo (2).png" alt="Logo" className="w-20 h-20 object-contain" />
        </div>

        <h1 className="text-3xl font-bold mb-1 text-center glow">Join MINTIOLAB</h1>
        <p className="text-gray-400 mb-6 text-center text-sm">
          Join <span className="text-gray-400">MINTIOLAB</span> and get started
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-black rounded-2xl p-6 border border-[#18181B] shadow-[0_0_20px_rgba(36,203,245,0.3)]"
        >
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-1.5">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
              text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
              focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
              text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
              focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B]
              text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
              focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-1.5">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B]
              text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
              focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <label className="block text-sm text-white mb-1.5">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
              text-white focus:outline-none focus:border-cyan-500 focus:ring-1
              focus:ring-cyan-500"
            >
              <option value="">Select your role</option>
              <option value="creator">Creator</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md 
            font-semibold text-black bg-gradient-to-r from-[#24CBF5] to-[#9952E0] 
            hover:opacity-90 transition-opacity"
          >
            {loading ? "Creating Account..." : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="text-gray-400 text-sm mx-2">OPTIONAL</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          {/* CONNECT WALLET BUTTON */}
          <button
            type="button"
            onClick={() => setShowAlert(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md 
      border border-cyan-400 text-white hover:bg-cyan-400/10 transition-colors"
          >
            <Wallet className="w-4 h-4 text-cyan-400" />
            Connect Wallet
          </button>

          {showAlert && (
            <AnimatedAlert
              message="Please create an account first before connecting a wallet."
              onClose={() => setShowAlert(false)}
            />
          )}

          <div className="text-center mt-5 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </div>


        </form>
      </div>
    </div>
  );
}
