import React from "react";
import { ArrowRight, Wallet, UserPlus2 } from "lucide-react";

export default function Signup() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10 text-white">
      {/* Icon instead of Logo */}
      <div className="mb-6">
        <div className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400">
          <UserPlus2 className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Headings */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
        Join MintioLab
      </h1>
      <p className="text-gray-400 mb-8 text-center text-sm sm:text-base">
        Create your creator account today
      </p>

      {/* Form */}
      <form
        className="w-full max-w-lg bg-black rounded-2xl p-6 sm:p-8 shadow-[3px_3px_10px_rgba(59,130,246,0.4),-3px_3px_10px_rgba(59,130,246,0.4)]"
      >
        {/* Full Name */}
        <div className="mb-3">
          <label className="block text-sm mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full p-2.5 rounded-lg bg-black border border-gray-700 focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2.5 rounded-lg bg-black border border-gray-700 focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2.5 rounded-lg bg-black border border-gray-700 focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="block text-sm mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full p-2.5 rounded-lg bg-black border border-gray-700 focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
          />
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="block text-sm mb-2">Role</label>
          <select
            className="w-full p-2.5 rounded-lg bg-black border border-gray-700 focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
          >
            <option value="">Select Role</option>
            <option value="Creator">Creator</option>
            <option value="User">User</option>
          </select>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 hover:opacity-90 transition-opacity text-white py-2.5 rounded-lg font-semibold mb-5 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          Create your account <ArrowRight className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center mb-5">
          <span className="flex-1 h-px bg-gray-700"></span>
          <span className="px-2 text-gray-500 text-xs sm:text-sm">
            optional
          </span>
          <span className="flex-1 h-px bg-gray-700"></span>
        </div>

        {/* Connect Wallet */}
        <button
          type="button"
          className="w-full border border-indigo-600 text-indigo-400 hover:bg-indigo-600/10 transition-colors py-2.5 rounded-lg font-semibold mb-4 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Wallet className="w-4 h-4" /> Connect your wallet
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs sm:text-sm">
          Already have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
