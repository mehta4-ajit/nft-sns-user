import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import Navbar from "./navbar";
import { BASE_URL } from "./config";

const creatorsSidebar = [
  { id: 1, name: "Creator 1", followers: "394K", avatar: "avatar 1 (1).png" },
  { id: 2, name: "Creator 2", followers: "356K", avatar: "avatar 1 (2).png" },
  { id: 3, name: "Creator 3", followers: "58K", avatar: "avatar 1 (3).png" },
  { id: 4, name: "Creator 4", followers: "403K", avatar: "avatar 1 (4).png" },
];

const topRanked = [
  { id: "t1", title: "Neon Dreams #247", likes: 342, thumbnail: "Image (5).png" },
  { id: "t2", title: "Holographic Geometry", likes: 218, thumbnail: "Image (6).png" },
  { id: "t3", title: "Floating Realms", likes: 567, thumbnail: "Image (7).png" },
];

export default function Dashboard() {
  const [creatorsData, setCreatorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/feed/creators`);
        const data = await res.json();
        if (data.success) setCreatorsData(data.creators);
      } catch (err) {
        console.error("Error fetching feed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  if (loading) return <div className="text-white p-6">Loading feed...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#080808] text-white p-6 sm:p-8 lg:p-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="col-span-12 lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              <div className="bg-[#0e0e0f] border border-[#151517] rounded-xl p-4 shadow-sm">
                <h6 className="text-gray-400 text-md font-semibold mb-3">
                  Quick Navigation
                </h6>
                <nav className="flex flex-col gap-2">
                  <button className="text-left px-3 py-2 rounded-lg bg-cyan-900/40 text-cyan-400 flex items-center gap-2 font-medium transition-all">
                    Dashboard
                  </button>
                  {["My Uploads", "My NFTs", "Distribution", "Leaderboards"].map(
                    (item, index) => (
                      <button
                        key={index}
                        className="text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-cyan-900/40 hover:text-cyan-400 transition-all duration-200"
                      >
                        {item}
                      </button>
                    )
                  )}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorsData.map((creator) =>
                creator.items.map((item) => (
                  <article
                    key={item.id}
                    className="relative bg-[#0f0f10] border border-[#151517] rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:border-cyan-400/40"
                  >
                    {/* image with hover overlay */}
                    <div className="relative w-full h-48 sm:h-54 lg:h-48 bg-[#0a0a0a] overflow-hidden group">
                      <img
                        src={item.url_thumbnail}
                        alt={item.name}
                        className="w-full h-full object-contain p-1 transition-all duration-500 group-hover:blur-sm"
                      />
                      <button
                        onClick={() => navigate(`/itemdetail/${item.id}`)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <div className="bg-cyan-300 text-black px-4 py-2 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:bg-cyan-400 transition">
                          <img
                            src="eye.png"
                            className="object-contain h-6 w-6 filter brightness-0"
                          />
                          View Details
                        </div>
                      </button>
                    </div>

                    {/* content */}
                    <div className="p-4 space-y-3">
                      {/* creator row */}
                      <div className="flex items-center gap-3">
                        <img
                          src={creator.profileImage || "avatar 1 (1).png"}
                          alt={creator.full_name}
                          className="w-9 h-9 rounded-full object-cover border-2 border-[#0b0b0b]"
                        />
                        <div className="flex gap-2 items-center">
                          <div className="text-md font-semibold">{creator.full_name}</div>
                          {creator.isVerified && (
                            <img
                              src="Image (10).png"
                              alt="verified badge"
                              className="w-4 h-4 object-contain"
                            />
                          )}
                        </div>
                      </div>

                      {/* item title + description */}
                      <div className="flex flex-col space-y-0.5">
                        <h1 className="text-white">{item.name}</h1>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* stats row */}
                      <div className="flex items-center justify-between text-gray-400 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes || 0}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            <span>{item.shares || 0}</span>
                          </div>
                        </div>

                        <div className="flex items-center ml-20">
                          <img src="iconDev.png" className="object-contain -mx-2" />
                          <img src="iconDev (3).png" className="object-contain" />
                          <img
                            src="iconDev (2).png"
                            className="object-contain border border-gray-700 rounded-full mr-4"
                          />
                        </div>
                      </div>

                      <div className="text-[12px] text-gray-500 space-x-3.5 flex items-center">
                        <span className="text-cyan-400 text-xl leading-none align-middle ml-2">•</span>
                        <span>Auto-share enabled to: Twitter, Instagram</span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="col-span-12 lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              {/* Trending Creators */}
              <div className="bg-[#0e0e0f] border border-[#151517] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center mb-3 gap-2">
                  <img src="Image (8).png" className="object-contain" />
                  <h6 className="text-white font-semibold text-sm">
                    Trending Creators
                  </h6>
                </div>

                <div className="space-y-3">
                  {creatorsSidebar.map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium">{c.name}</div>
                          <div className="text-xs text-gray-400">{c.followers} followers</div>
                        </div>
                      </div>
                      <div className="text-cyan-400 font-semibold text-sm">›</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Ranked NFTs */}
              <div className="bg-[#0e0e0f] border border-[#151517] rounded-2xl p-4 shadow-sm">
                <div className="flex gap-2 mb-3">
                  <img src="Image (9).png" className="object-contain" />
                  <h6 className="text-white font-semibold text-sm">Top Ranked NFTs</h6>
                </div>
                <div className="space-y-3">
                  {topRanked.map((t) => (
                    <div key={t.id} className="flex items-center gap-3">
                      <img
                        src={t.thumbnail}
                        alt={t.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm">{t.title}</div>
                        <div className="text-xs text-gray-400">{t.likes} likes</div>
                      </div>
                      <div className="text-cyan-400">›</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
