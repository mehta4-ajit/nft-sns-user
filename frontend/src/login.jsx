import React from "react";
import { Wallet, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-white relative">
      {/* 🔙 Back Arrow */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Back</span>
      </Link>

      {/* Logo */}
      <div className="mb-6">
        <img
          src="logo (2).png"
          alt="Logo"
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Headings */}
      <h1 className="text-3xl font-bold mb-2 text-center glow">Welcome Back</h1>
      <p className="text-gray-400 mb-8 text-center text-sm sm:text-base">
        Login to your <span className="text-gray-400">MINTIOLAB</span> account
      </p>

      {/* Login Form */}
      <form className="w-full max-w-md bg-black rounded-2xl p-6 sm:p-8 border border-[#18181B] shadow-[0_0_20px_rgba(36,203,245,0.3)] transition-all duration-300">
        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <button
            type="button"
            className="text-cyan-400 text-sm hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md font-semibold text-black text-base bg-gradient-to-r from-[#24CBF5] to-[#9952E0] hover:opacity-90 transition-opacity"
        >
          Login
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="text-gray-400 text-xs mx-3">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Connect Wallet Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-md border border-cyan-400 text-white hover:bg-cyan-400/10 transition-colors"
        >
          <Wallet className="w-5 h-5 text-cyan-400" />
          <span>
            <Link to="/wallets">Connect Wallet</Link>
          </span>
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
