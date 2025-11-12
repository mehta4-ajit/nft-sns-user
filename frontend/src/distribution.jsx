import React, { useState } from "react";
import { FiTwitter, FiInstagram, FiFacebook, FiLinkedin } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";

export default function SocialIntegration() {
  const [connections, setConnections] = useState({
    Twitter: true,
    Instagram: false,
    LinkedIn: false,
    Facebook: false,
    TikTok: false,
  });

  const [autoPost, setAutoPost] = useState(true);

  const platforms = [
    { name: "Twitter", icon: <FiTwitter /> },
    { name: "Instagram", icon: <FiInstagram /> },
    { name: "LinkedIn", icon: <FiLinkedin /> },
    { name: "Facebook", icon: <FiFacebook /> },
    { name: "TikTok", icon: <SiTiktok /> },
  ];

  const toggleConnection = (platform) => {
    setConnections((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d10] text-white">
      {/* ==== HEADER SECTION ==== */}
      <div className="border-y border-[#18181B] bg-gradient-to-r from-blue-500/25 via-zinc-900/35 to-purple-500/25 py-10 sm:py-14 md:py-20 text-center">
        <div className="flex justify-center">
          <img
            src="CreatorVerse.png"
            alt="Automated Distribution & Social Media Integration"
            className="w-[85%] sm:w-[70%] md:w-[450px] lg:w-[550px] mx-auto"
          />
        </div>

        <p className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-4">
          Automatically distribute top content to your social media channels.
          <br className="hidden sm:block" />
          Powered by smart publishing and deep link tracking.
        </p>

        <div className="flex justify-center space-x-4 sm:space-x-6 mt-5 sm:mt-6 text-xl sm:text-2xl text-cyan-700">
          <FiTwitter className="hover:text-cyan-300 transition" />
          <FiInstagram className="hover:text-cyan-300 transition" />
          <FiFacebook className="hover:text-cyan-300 transition" />
          <FiLinkedin className="hover:text-cyan-300 transition" />
          <SiTiktok className="hover:text-cyan-300 transition" />
        </div>
      </div>

      {/* ==== CONNECT ACCOUNTS SECTION ==== */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-10">
        <div className="p-2 sm:p-4">
          <div className="border border-[#18181B] rounded-lg p-4 sm:p-6 mb-8 bg-[#131316] text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white glow">
              Connect Social Accounts
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Link your social media profiles to enable automated content distribution
            </p>
          </div>

          {/* ==== PLATFORM CARDS ==== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {platforms.map((platform) => {
              const isConnected = connections[platform.name];

              return (
                <div
                  key={platform.name}
                  className={`rounded-xl p-4 sm:p-5 flex flex-col transition-all border ${isConnected
                      ? "border-cyan-400 bg-cyan-400/10 "
                      : "border-[#18181B] bg-[#131316]"
                    }`}
                >
                  {/* === TOP BAR (Icon + Name + Status) === */}
                  <div className="flex justify-between items-center mb-4 sm:mb-5">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-lg sm:text-xl ${isConnected
                            ? "text-cyan-400 border border-cyan-400 p-2 rounded-xl"
                            : "text-gray-400 border border-gray-600 p-2 rounded-xl"
                          }`}
                      >
                        {platform.icon}
                      </span>
                      <span className="font-semibold text-white text-base sm:text-lg">
                        {platform.name}
                      </span>
                    </div>

                    {/* === STATUS TAG === */}
                    {isConnected ? (
                      <span className="inline-flex items-center justify-center text-xs sm:text-sm text-green-400 border border-green-500 px-2 sm:px-3 py-1.5 rounded-2xl shadow-[0_0_8px_rgba(0,255,0,0.5)]">
                        ✓ Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center text-xs sm:text-sm text-white border border-gray-500 px-2 sm:px-3 py-1.5 rounded-2xl">
                        🞩 Not Connected
                      </span>
                    )}
                  </div>

                  {/* === AUTO-POST TOGGLE (Visible only if connected) === */}
                  {isConnected && (
                    <div className="flex items-center justify-between border border-[#18181B] bg-[#0d0d0d] p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-300">
                        Auto-Post Top Content
                      </p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoPost}
                          onChange={() => setAutoPost(!autoPost)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-checked:bg-cyan-400 transition-all"></div>
                        <div className="absolute left-0.5 top-0.5 bg-black h-4 w-4 rounded-full peer-checked:translate-x-4 transition-transform"></div>
                      </label>
                    </div>
                  )}

                  {/* === CONNECT / DISCONNECT BUTTON === */}
                  <div className="mt-auto">
                    <button
                      onClick={() => toggleConnection(platform.name)}
                      className={`w-full mt-4 sm:mt-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base ${isConnected
                          ? "bg-[#0d0d0d] border border-[#18181B] text-white"
                          : "bg-cyan-400 hover:bg-cyan-500 text-black"
                        }`}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
