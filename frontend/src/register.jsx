import React, { useState, useEffect } from "react";
import { Wallet, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedAlert from "./Alertanimated";
import CustomDropdown from "./customdropdown";

export default function RegisterPage() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



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
      role: "",
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

        setSuccessAlert(true);

        setTimeout(() => {
          navigate("/verify-email");
        }, 1500);
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

      <div className="w-full max-w-md py-8 sm:py-10">
        <div className="mb-5 flex justify-center">
          <img src="logo (2).png" alt="Logo" className="w-20 h-20 object-contain" />
        </div>

        <h1 className="text-3xl font-bold mb-3 text-center glow">Join MINTIOLAB</h1>
        <p className="text-gray-500 mb-6 text-center text-md">
          Create your creator account today
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-black rounded-2xl p-6 px-8 py-7 border border-[#18181B] shadow-[0_0_20px_rgba(36,203,245,0.3)]"
        >
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-1.5">Full Name <span className="text-cyan-500">*</span> </label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-md border border-[#18181B] 
              text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
              focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-1.5">Email <span className="text-cyan-500">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md border border-[#18181B] 
              text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
              focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm text-white mb-1.5">Password <span className="text-cyan-500">*</span></label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 pr-10 rounded-md border border-[#18181B]
    text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
    focus:ring-1 focus:ring-cyan-500"
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-13 transform -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>


          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label className="block text-sm text-white mb-1.5">Confirm Password <span className="text-cyan-500">*</span></label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full p-3 pr-10 rounded-md border border-[#18181B]
    text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500
    focus:ring-1 focus:ring-cyan-500"
            />

            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-13 transform -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>


          <div className="mb-6">
            <label className="block text-sm text-white mb-1.5">Role <span className="text-cyan-500">*</span></label>

            <CustomDropdown
              value={form.role}
              onChange={(selected) => setForm({ ...form, role: selected })}
              options={["creator", "user"]}
              placeholder="Select your role"
              className="w-full"   // ← makes it FULL WIDTH here only
            />
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
            <div className="flex-grow h-px bg-gray-800"></div>
            <span className="text-gray-400 text-xs mx-2">OPTIONAL</span>
            <div className="flex-grow h-px bg-gray-800"></div>
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

          {successAlert && (
            <AnimatedAlert
              message="Account created! Please verify your email to continue."
              onClose={() => {
                setSuccessAlert(false);
                navigate("/verify-email");
              }}
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
