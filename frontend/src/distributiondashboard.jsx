import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { FiTwitter, FiInstagram, FiFacebook } from "react-icons/fi";

export default function DistributionDashboard() {
  const [utmTracking, setUtmTracking] = useState(true);
  const [autoCaption, setAutoCaption] = useState(true);

  const posts = [
    {
      title: "Cosmic Dreams #42",
      time: "2 hours ago",
      status: "Published",
      clicks: 847,
      color: "text-green-400",
      img: "Image (6).png",
      platform: "Twitter",
    },
    {
      title: "Neon Pulse",
      time: "in 30 minutes",
      status: "Scheduled",
      clicks: null,
      color: "text-blue-400",
      img: "Image (7).png",
      platform: "Instagram",
    },
    {
      title: "Digital Horizon",
      time: "1 day ago",
      status: "Published",
      clicks: 1221,
      color: "text-green-400",
      img: "Image (5).png",
      platform: "Facebook",
    },
  ];

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Twitter":
        return <FiTwitter className="text-sky-400" />;
      case "Instagram":
        return <FiInstagram className="text-pink-500" />;
      case "Facebook":
        return <FiFacebook className="text-blue-500" />;
      default:
        return null;
    }
  };

  const handleView = (post) => {
    console.log("View clicked for:", post.title);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex justify-center">
      {/* Container width kept same (max-w-398.5) */}
      <div className="w-full max-w-398.5 p-4 md:p-6 space-y-6">
        {/* ================= AUTO DISTRIBUTION + RECENT POSTS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ================= AUTO DISTRIBUTION SETTINGS ================= */}
          <div className="bg-[#131316] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-900">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 glow">
              Auto Distribution Settings
            </h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Configure when and how your content is shared
            </p>

            <div className="space-y-5">
              {/* Dropdown */}
              <div>
                <label className="block text-white text-sm mb-2">
                  When to Publish
                </label>
                <select className="w-full bg-[#0d0d0d] text-gray-200 rounded-lg p-2 outline-none border border-gray-700 text-sm md:text-base">
                  <option>Once ranked in Top 3</option>
                  <option>Immediately</option>
                  <option>After approval</option>
                </select>
              </div>

              {/* Switches */}
              <div className="space-y-4">
                {/* Include UTM Tracking */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg bg-[#0d0d0d]">
                  <div>
                    <span className="text-white block font-semibold text-sm md:text-base">
                      Include UTM Tracking
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      Track engagement via deep links
                    </span>
                  </div>
                  <Switch
                    checked={utmTracking}
                    onChange={setUtmTracking}
                    className={`${
                      utmTracking ? "bg-cyan-500" : "bg-gray-600"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 self-end sm:self-auto`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform bg-black rounded-full transition-transform duration-300 ${
                        utmTracking ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch>
                </div>

                {/* Enable Auto Caption */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#0d0d0d] p-4 rounded-lg">
                  <div>
                    <span className="text-white block font-semibold text-sm md:text-base">
                      Enable Auto Caption
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      Generate captions from metadata
                    </span>
                  </div>
                  <Switch
                    checked={autoCaption}
                    onChange={setAutoCaption}
                    className={`${
                      autoCaption ? "bg-cyan-500" : "bg-gray-600"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 self-end sm:self-auto`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform bg-black rounded-full transition-transform duration-300 ${
                        autoCaption ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch>
                </div>
              </div>

              {/* Example UTM Link */}
              <div className="border border-cyan-500 p-4 rounded-lg">
                <label className="block text-gray-400 text-xs md:text-sm mb-2">
                  Example UTM Link:
                </label>
                <div className="text-cyan-400 text-xs md:text-sm rounded-lg break-words">
                  https://nftverse.app/view/1239?utm_source=twitter&utm_medium=autoshare
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full bg-cyan-400 text-black font-semibold rounded-lg py-2 mt-4 hover:bg-cyan-300 transition text-sm md:text-base">
                Save Distribution Settings
              </button>
            </div>
          </div>

          {/* ================= SCHEDULED & RECENT POSTS ================= */}
          <div className="bg-[#131316] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-900">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 glow">
              Scheduled & Recent Posts
            </h2>
            <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
              Preview content ready for distribution
            </p>

            <div className="space-y-4">
              {posts.map((post, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#131316] border border-[#1F1F23] p-4 rounded-xl"
                >
                  {/* Thumbnail + Info */}
                  <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                    <div className="relative">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-700"
                      />
                      <div className="absolute -bottom-1 -right-2 bg-black/70 p-1.5 rounded-full text-lg md:text-xl">
                        {getPlatformIcon(post.platform)}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-base md:text-lg">{post.title}</h3>
                      <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                        {post.time}
                      </p>

                      {post.clicks && (
                        <div className="flex items-center gap-2 mt-3 text-xs md:text-sm text-gray-400 flex-wrap">
                          <p>
                            UTM Clicks:{" "}
                            <span className="text-cyan-400">{post.clicks}</span>
                          </p>

                          <button
                            className="flex items-center gap-1 p-1 rounded-full text-white cursor-pointer"
                            onClick={() => handleView(post)}
                          >
                            <img
                              src="eye (1).png"
                              alt="View"
                              className="w-5 h-5 opacity-90"
                            />
                            <span className="text-xs md:text-sm">View</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`border px-2 py-0.5 rounded-full text-xs md:text-sm ${post.color} border-current flex items-center gap-1 self-start sm:self-center`}
                  >
                    {post.status === "Published" ? (
                      <img src="chek circle.png" alt="Tick Icon" className="w-4 h-4" />
                    ) : (
                      <img src="time.png" alt="Clock Icon" className="w-4 h-4" />
                    )}
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RECENT AUTO-POSTS TABLE ================= */}
        <div className="bg-[#131316] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-900 overflow-x-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 glow">
            Recent Auto-Posts
          </h2>
          <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
            Track your automated distribution activity
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="p-3">Platform</th>
                  <th className="p-3">NFT Title</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Publish Time</th>
                  <th className="p-3">UTM Clicks</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {[
                  {
                    platform: "Twitter",
                    title: "Cosmic Dreams #42",
                    status: "Published",
                    time: "2 hours ago",
                    clicks: 847,
                  },
                  {
                    platform: "Instagram",
                    title: "Abstract Flow",
                    status: "Published",
                    time: "5 hours ago",
                    clicks: 629,
                  },
                  {
                    platform: "Twitter",
                    title: "Neon Pulse",
                    status: "Published",
                    time: "1 day ago",
                    clicks: 1221,
                  },
                ].map((item, i) => (
                  <tr key={i} className="border-b border-gray-800">
                    <td className="px-3 py-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      {item.platform}
                    </td>
                    <td className="px-3 py-4">{item.title}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center border border-green-400 rounded-2xl text-green-400 px-2 py-1 w-[90px] sm:min-w-[100px]">
                        <img
                          src="chek circle.png"
                          alt="Published"
                          className="object-contain w-4 h-4 mr-1"
                        />
                        <span>{item.status}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">{item.time}</td>
                    <td className="px-3 py-4 text-cyan-400">{item.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
