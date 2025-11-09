import React from "react";
import { Wallet, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 relative">
      {/* 🔙 Back Arrow */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Back</span>
      </Link>

      <div className="w-full max-w-md py-8 sm:py-10">
        {/* Logo */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <img
            src="logo (2).png"
            alt="Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
          />
        </div>

        {/* Headings */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 text-center glow">
          Join MINTIOLAB
        </h1>
        <p className="text-gray-400 mb-6 text-center text-xs sm:text-sm md:text-base">
          Join <span className="text-gray-400">MINTIOLAB</span> and get started
        </p>

        {/* Register Form */}
        <form className="w-full bg-black rounded-2xl p-4 sm:p-6 border border-[#18181B] shadow-[0_0_20px_rgba(36,203,245,0.3)]">
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm text-white mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
                         text-white placeholder-gray-500 focus:outline-none 
                         focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
                         text-xs sm:text-sm"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm text-white mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
                         text-white placeholder-gray-500 focus:outline-none 
                         focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
                         text-xs sm:text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm text-white mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
                         text-white placeholder-gray-500 focus:outline-none 
                         focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
                         text-xs sm:text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm text-white mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
                         text-white placeholder-gray-500 focus:outline-none 
                         focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
                         text-xs sm:text-sm"
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-5">
            <label className="block text-xs sm:text-sm text-white mb-1.5">
              Role
            </label>
            <select
              className="w-full p-3 rounded-md bg-[#09090B4D] border border-[#18181B] 
                         text-white text-xs sm:text-sm focus:outline-none 
                         focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              <option value="">Select your role</option>
              <option value="creator">Creator</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md 
                       font-semibold text-black text-sm sm:text-base 
                       bg-gradient-to-r from-[#24CBF5] to-[#9952E0] 
                       hover:opacity-90 transition-opacity"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="text-gray-400 text-xs sm:text-sm mx-2">OPTIONAL</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          {/* Connect Wallet Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md 
                       border border-cyan-400 text-white hover:bg-cyan-400/10 
                       transition-colors text-xs sm:text-sm"
          >
            <Wallet className="w-4 h-4 text-cyan-400" />
            <span>
              <Link to="/wallets">Connect Wallet</Link>
            </span>
          </button>

          {/* Footer */}
          <div className="text-center mt-5 text-xs sm:text-sm text-gray-400">
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
