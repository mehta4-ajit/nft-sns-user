import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import { BASE_URL } from './config';
import Navbar from './navbar';

export default function NFTDisplay() {
  const { id } = useParams(); // get item id from route
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/item/${id}`);
        const data = await res.json();
        if (data.success) {
          setItem(data.item);
          setLikeCount(data.item.likes || 0); // optional if likes are stored
        }
      } catch (err) {
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!item) return <div className="text-white p-6">Item not found</div>;

  // Parse tags string into array
  const tags = item.tags ? item.tags.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={() => navigate("/feed")}
          className="text-sm flex items-center font-semibold gap-2 px-4 py-2 rounded-lg border border-[#232329] cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back to Feed</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column - Image & Actions */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img
                src={item.url_thumbnail}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer border transition-all ${isLiked
                    ? 'bg-cyan-400 border-cyan-400 text-black'
                    : 'border-gray-700 hover:border-gray-600'
                  }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                <span>{likeCount} Likes</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer border border-gray-700 hover:border-gray-600 transition-colors">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Creator Info */}
            <div className="bg-[#131316] border border-[#18181B] p-4 rounded-[15px]">
              <div className="flex items-center gap-3">
                <img
                  src={item.user?.profileImage || 'avatar-placeholder.png'}
                  alt={item.user?.full_name || 'Creator Avatar'}
                  className="w-14 h-14 rounded-full object-cover border border-cyan-400"
                />
                <div>
                  <p className="text-[14px] text-sm text-gray-400">Creator</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-semibold text-white">{item.user?.full_name}</h3>
                    {item.user?.isVerified && <CheckCircle size={17} className="text-cyan-400" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-white glow">{item.name}</h1>
              <p className="text-[16px] text-[#717675] leading-relaxed">{item.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-semibold px-4 py-1.5 rounded-full border-[1px] border-cyan-400 text-cyan-400 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* NFT Metadata */}
            <div className="bg-[#13131680] border border-[#18181B] p-4 rounded-[15px]">
              <div className="space-y-5 p-[4px]">
                <h2 className="text-[18px] font-semibold">NFT Metadata</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-[16px]">
                    <div>
                      <p className="text-[#A1A1AA] text-sm mb-1">Royalty</p>
                      <p className="font-medium">{item.royalty}%</p>
                    </div>
                    <div>
                      <p className="text-[#A1A1AA] text-sm mb-1">Blockchain</p>
                      <p className="font-medium">Polygon</p>
                    </div>
                  </div>
                  {/* Contract Address */}
                  <div className="w-[528px] border-t border-[1px] border-[#2323294D] mt-4 mb-4"></div>

                  <div>
                    <p className="text-[#A1A1AA] text-sm mb-1">Contract Address</p>
                    <p className="font-medium">0x1a2b3c4d...5e6f7g8h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Distribution & Tracking */}
            <div className="bg-[#13131680] border border-[1px] border-[#18181B] p-6 rounded-[15px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-semibold">Auto Distribution & Tracking</h2>
                <div className="flex items-center gap-2 pt-1 pb-1 pl-2 pr-2 bg-cyan-400/10 rounded-full border border-[#24CBF580]">
                  <CheckCircle size={16} className="text-cyan-400" />
                  <span className="text-cyan-400 text-sm">Twitter Connected</span>
                </div>
              </div>
              {/* Connected Platforms */}
              <div className="flex-column mb-[8px]">
                <p className="text-[#A1A1AA] font-medium text-sm mb-[2px]">
                  Connected Platforms
                </p>

                <div className="flex flex-wrap gap-0 m-0 p-0 -ml-4">
                  <img
                    src="/new iconSet (3).png"
                    alt="Twitter"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="/new iconSet (4).png"
                    alt="Instagram"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="/new iconSet (5).png"
                    alt="Facebook"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="/new iconSet (6).png"
                    alt="LinkedIn"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="/new iconSet (8).png"
                    alt="TikTok"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                </div>
              </div>


              {/* UTM Tracking Link */}
              <div className="mb-6">
                <p className="text-[#A1A1AA] text-sm mb-2">UTM Tracking Link</p>

                <div className="flex items-center gap-2">
                  {/* Link Bar */}
                  <div className="flex-1 bg-[#1a1a1d] border border-[#232329] rounded-lg px-4 py-3">
                    <code className="text-sm text-gray-400 font-mono break-all">
                      https://creatorverse.app/nft/...?utm_source=instagram
                    </code>
                  </div>

                  {/* Copy Button */}
                  <button className="flex items-center justify-center px-4 py-4 bg-[#09090B] border border-[#232329] rounded-[10px] hover:bg-gray-900 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 10.5V3.5C3 2.67157 3.67157 2 4.5 2H10.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>

                <p className="text-[#717675] text-xs mt-2">
                  Auto-distribution uses OAuth & API integration. UTM tags generate tracking links.
                </p>
              </div>



              {/* Recent Auto-Posts */}
              <div>
                <p className="text-[#A1A1AA] text-sm mb-3">Recent Auto-Posts</p>
                <div className="space-y-3">
                  {/* Twitter Post */}
                  <div className="flex items-center justify-between p-3 bg-[#1a1a1d] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <div>
                        <p className="text-sm font-medium">Twitter</p>
                        <p className="text-xs text-[#717675]">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs font-medium rounded-full">
                        Published
                      </span>
                      <span className="text-sm text-[#717675]">142 clicks</span>
                    </div>
                  </div>

                  {/* Instagram Post */}
                  <div className="flex items-center justify-between p-3 bg-[#1a1a1d] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <div>
                        <p className="text-sm font-medium">Instagram</p>
                        <p className="text-xs text-[#717675]">3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs font-medium rounded-full">
                        Published
                      </span>
                      <span className="text-sm text-[#717675]">89 clicks</span>
                    </div>
                  </div>

                  {/* Facebook Post */}
                  <div className="flex items-center justify-between p-3 bg-[#1a1a1d] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div>
                        <p className="text-sm font-medium">Facebook</p>
                        <p className="text-xs text-[#717675]">1 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-full">
                        Failed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Re-share Button */}
              <button className="w-full mt-6 py-3 rounded-lg border border-[#232329] hover:border-[#3f3f46] transition-colors text-sm font-medium">
                Re-share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}