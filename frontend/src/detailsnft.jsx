import React from 'react';
import { Heart, Share2, ArrowLeft, CheckCircle } from 'lucide-react';

export default function NFTDisplay() {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="p-6">
        <button className="text-sm flex items-center font-semibold gap-2 px-4 py-2 rounded-lg border border-[#232329] cursor-pointer">
          <ArrowLeft size={20} />
          <span>Back to Feed</span>
        </button>

      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img
                src="img card.png"
                alt="Neon Dreams NFT"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Action Buttons */}
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
            <div className="bg-[#131316] border border-[1px] border-[#18181B] p-4 rounded-[15px]">
              <div className="flex items-center gap-3">
                <img
                  src="Avtar Sec.png"
                  alt="Creator Avatar"
                  className="w-14 h-14 rounded-full object-cover border border-cyan-400"
                />
                <div>
                  <p className="text-[14px] text-sm text-gray-400">Creator</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-semibold text-white">SpaceVision</h3>
                    <CheckCircle size={17} className="text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>


            {/* Title and Description */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-white glow">Neon Dreams #247</h1>
              <p className="text-[16px] text-[#717675] leading-relaxed">
                A vibrant digital artwork exploring the intersection of technology and consciousness.
                This piece represents the fusion of human creativity and digital innovation, capturing
                the essence of our cybernetic future.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold px-4 py-1.5 rounded-full border-[1px] border-cyan-400 text-cyan-400 text-sm">
                Digital Art
              </span>
              <span className="font-semibold px-4 py-1.5 rounded-full border-[1px] border-cyan-400 text-cyan-400 text-sm">
                Cyberpunk
              </span>
              <span className="font-semibold px-4 py-1.5 rounded-full border-[1px] border-cyan-400 text-cyan-400 text-sm">
                Abstract
              </span>
            </div>

            {/* NFT Metadata */}
            <div className="bg-[#13131680] border border-[1px] border-[#18181B] p-4 rounded-[15px]">
              <div className="space-y-5 p-[4px]">
                <h2 className="text-[18px] font-semibold">NFT Metadata</h2>

                <div className="space-y-4">
                  {/* Category and Mint Date */}
                  <div className="grid grid-cols-2 gap-x-[16px]">
                    <div>
                      <p className="text-[#A1A1AA] text-sm mb-1">Category</p>
                      <p className="font-medium ">0x7f3a...4e2b</p>
                    </div>
                    <div>
                      <p className="text-[#A1A1AA] text-sm mb-1">Mint Date</p>
                      <p className="font-medium">1/10/2024</p>
                    </div>
                  </div>

                  {/* Royalty and Blockchain */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#A1A1AA] text-sm mb-1">Royalty</p>
                      <p className="font-medium">7.5%</p>
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
                    src="new iconSet (3).png"
                    alt="Twitter"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="new iconSet (4).png"
                    alt="Instagram"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="new iconSet (5).png"
                    alt="Facebook"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="new iconSet (6).png"
                    alt="LinkedIn"
                    className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] xs:w-[60px] xs:h-[60px] object-cover rounded-[10px] mh-[-40px]"
                  />
                  <img
                    src="new iconSet (8).png"
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