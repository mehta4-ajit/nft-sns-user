import React, { useState } from "react";
import { X, Save } from "lucide-react";
import Navbar from "./navbar.jsx";

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    setAlert("profileSaved");
    setIsEditing(false);
  };
  const handleDisconnectWallet = () => setAlert("walletDisconnected");

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      <div className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Profile Settings
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage your creator profile and settings
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md border border-[#18181B] bg-[#09090B4D] text-white font-semibold hover:bg-[#1a1a1a] transition-all text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-2 rounded-md bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black font-semibold hover:opacity-90 transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  <Save className="w-5 h-5 flex-none" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="px-3 py-2 rounded-md bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black font-semibold hover:opacity-90 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <img
                  src="Edit.png"
                  alt="Edit"
                  className="w-5 h-5 flex-none object-contain"
                />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Left & Right Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center shadow-md border border-[#18181B]">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#111111] flex items-center justify-center overflow-hidden">
                <img
                  src="avatarusrer 1.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
                Creator Name
              </h2>
              <p className="text-gray-400 text-sm">Creator</p>
            </div>

            {/* Stats */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 space-y-4 shadow-md border border-[#18181B]">
              <h3 className="text-sm font-semibold text-white uppercase flex items-center gap-3">
                <img src="stat.png" alt="Stats" className="w-4 h-4 flex-none object-contain" />
                Stats
              </h3>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <span>Likes Received</span>
                <div className="flex items-center gap-2">
                  <img src="heart.png" alt="Likes" className="w-5 h-5 flex-none object-contain" />
                  <span className="text-white font-semibold">1284</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <span>Ranking</span>
                <div className="flex items-center gap-2">
                  <img src="trophy.png" alt="Rank" className="w-4 h-4 flex-none object-contain" />
                  <span className="text-white font-semibold">#156</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <span>NFTs Created</span>
                <span className="font-semibold text-white">42</span>
              </div>
            </div>

            {/* Wallet */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 space-y-3 shadow-md border border-[#18181B]">
              <h3 className="text-sm font-semibold text-white uppercase flex items-center gap-2">
                <img src="Vector.png" alt="Wallet" className="w-4 h-4 flex-none object-contain" />
                Wallet
              </h3>
              <p className="text-sm text-gray-300">Connected Address</p>
              <div className="text-sm bg-[#09090B4D] px-6 py-2 rounded-md text-gray-400 border border-[#18181B] break-words">
                0xA2f8...9C3
              </div>
              <button
                onClick={handleDisconnectWallet}
                className="w-full text-sm mt-2 py-2 border border-[#18181B] bg-[#09090B4D] rounded-md font-medium hover:bg-[#1a1a1a] transition-all"
              >
                Disconnect Wallet
              </button>
            </div>

            {/* Social Distribution */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 space-y-3 shadow-md border border-[#18181B]">
              <h3 className="text-sm font-semibold text-white uppercase flex items-center gap-2">
                <img src="dist.png" alt="Social" className="w-4 h-4 flex-none object-contain" />
                Social Distribution
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Manage your social media integrations and automated content
                distribution.
              </p>
              <button className="border border-[#18181B] w-full mt-2 py-2 bg-[#09090B4D] hover:bg-[#3a3a3a] rounded-md text-sm text-gray-200 font-medium">
                Manage Connections
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 bg-[#13131680] rounded-xl p-5 sm:p-8 space-y-6 shadow-md border border-[#18181B]">
            <h3 className="text-lg font-semibold text-white">
              Profile Information
            </h3>

            {/* Display Name */}
            <div>
              <label className="block text-sm text-white mb-1">
                Display Name
              </label>
              <input
                type="text"
                placeholder="Creator Name"
                disabled={!isEditing}
                className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 focus:outline-none ${
                  isEditing
                    ? "focus:border-[#9952E0]"
                    : "opacity-60 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm text-white mb-1">Bio / About</label>
              <textarea
                rows="3"
                placeholder="Digital artist and NFT creator passionate about Web3 art"
                disabled={!isEditing}
                className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 focus:outline-none resize-none ${
                  isEditing
                    ? "focus:border-[#9952E0]"
                    : "opacity-60 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm text-white uppercase mb-4 sm:mb-6">
                Social Links
              </h4>

              <div className="space-y-6 sm:space-y-8">
                {/* Twitter */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src="twitter.png" alt="Twitter" className="w-4 h-4 flex-none object-contain" />
                    <label className="text-sm text-white font-medium">Twitter</label>
                  </div>
                  <input
                    type="url"
                    placeholder="https://twitter.com/creator"
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 sm:py-3 text-sm sm:text-base text-gray-300 focus:outline-none ${
                      isEditing
                        ? "focus:border-[#9952E0]"
                        : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                </div>

                {/* Instagram */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src="insta.png" alt="Instagram" className="w-4 h-4 flex-none object-contain" />
                    <label className="text-sm text-white font-medium">Instagram</label>
                  </div>
                  <input
                    type="url"
                    placeholder="https://instagram.com/creator"
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 sm:py-3 text-sm sm:text-base text-gray-300 focus:outline-none ${
                      isEditing
                        ? "focus:border-[#9952E0]"
                        : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                </div>

                {/* Website */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src="web (2).png" alt="Website" className="w-4 h-4 flex-none object-contain" />
                    <label className="text-sm text-white font-medium">Website</label>
                  </div>
                  <input
                    type="url"
                    placeholder="https://creator-portfolio.com"
                    disabled={!isEditing}
                    className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 sm:py-3 text-sm sm:text-base text-gray-300 focus:outline-none ${
                      isEditing
                        ? "focus:border-[#9952E0]"
                        : "opacity-60 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-4 border-t border-[#18181B]">
              <h4 className="text-sm text-red-400 font-semibold mb-2">
                Danger Zone
              </h4>
              <button className="px-3 py-1 sm:px-5 sm:py-3 bg-red-500 hover:bg-red-600 rounded-md text-sm sm:text-base font-large flex items-center gap-2">
                <img src="logout.png" alt="Logout" className="w-4 h-4 flex-none object-contain" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Alert Box */}
      {alert && (
        <div
          className={`fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 bg-[#09090B] border rounded-xl px-5 sm:px-6 py-4 w-80 sm:w-96 shadow-lg transition-all duration-300 z-50 ${
            alert === "profileSaved" ? "border-cyan-500" : "border-red-500"
          }`}
        >
          <button
            onClick={() => setAlert(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-white text-lg font-semibold mb-1">
            {alert === "profileSaved"
              ? "Profile Updated"
              : "Wallet Disconnected"}
          </h2>
          <p className="text-gray-400 text-sm">
            {alert === "profileSaved"
              ? "Your profile changes have been saved successfully."
              : "Your wallet has been disconnected."}
          </p>
        </div>
      )}
    </div>
  );
}
