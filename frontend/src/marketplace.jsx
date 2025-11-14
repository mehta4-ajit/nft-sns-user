import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
const Marketplace = () => {
    const [sortOpen, setSortOpen] = useState(false);

    const nftList = [
        {
            img: "/ms-5/Frame 13 (13).png",
            title: "Cosmic Dreams #42",
            creator: "CyberArtist",
            creatorImg: "/ms-5/groupImg.png",
            verified: true,
            price: "Ξ 0.25",
            status: "For Sale",
        },
        {
            img: "/ms-5/Frame 13 (14).png",
            title: "Holographic Geometry",
            creator: "AbstractMind",
            creatorImg: "/ms-5/groupImg (1).png",
            verified: true,
            price: "Ξ 0.15",
            status: "For Sale",
        },
        {
            img: "/ms-5/Frame 13 (15).png",
            title: "Cyber Dragon Ascension",
            creator: "DreamWeaver",
            creatorImg: "/ms-5/Group (1).png",
            verified: false,
            price: "Ξ 0.25",
            status: "For Sale",
        },
    ];

    return (
        <div className="bg-black text-white min-h-screen p-6 sm:p-8 font-sans">

            {/* ---------------- PAGE HEADER ---------------- */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-cyan-400">NFT Marketplace</h1>
                <p className="text-gray-400 mt-1">
                    Discover and purchase unique digital assets on Polygon
                </p>
            </div>

            {/* ---------------- SEARCH + SORT BAR ---------------- */}
            <div className="bg-[#13131680] border border-cyan-800/35 p-6 rounded-xl mb-8">

                <div className="flex flex-col lg:flex-row gap-4 lg:items-center">

                    {/* Search Bar */}
                    <div className="flex items-center bg-black/20 border border-[#1F1F23] rounded-lg px-4 py-3 w-full">
                        <img src="/ms-5/search.png" className="w-4 mr-2 opacity-70" />
                        <input
                            type="text"
                            placeholder="Search NFTs or creators..."
                            className="bg-transparent w-full outline-none text-gray-300 text-sm"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center justify-between bg-black/20 border border-[#1F1F23] w-full lg:w-56 px-4 py-3 rounded-lg text-white"
                        >
                            Recently Listed
                            <ChevronDown className="w-4 ml-2" />
                        </button>

                        {/* Dropdown Options */}
                        {sortOpen && (
                            <div className="absolute right-0 mt-2 bg-[#0d0d0d] border border-gray-700 rounded-lg w-full lg:w-56 shadow-xl z-20">
                                {[
                                    "Recently Listed",
                                    "Price: Low to High",
                                    "Price: High to Low",
                                    "Most Popular",
                                ].map((option, i) => (
                                    <button
                                        key={i}
                                        className="w-full text-left px-4 py-2 hover:bg-cyan-400 transition"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Small Text Under Bar */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mt-4">
                    <span>6 NFTs for sale</span>
                    <span className="text-gray-500 font-bold text-xl -mt-0.5">•</span>

                    <span className="flex items-center gap-1">
                        <img src="/ms-5/Ellipse 1.png" className="object-contain" />
                        Polygon Network
                    </span>
                </div>
            </div>

            {/* ---------------- NFT GRID ---------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {nftList.map((nft, i) => (
                    <div key={i} className="bg-[#0d0d0d] border  border-cyan-800/35 rounded-xl shadow-lg">

                        {/* Image */}
                        <div className="relative">
                            <img
                                src={nft.img}
                                alt={nft.title}
                                className="w-full h-85 object-cover rounded-t-xl"
                            />

                            {/* For Sale Badge */}
                            {nft.status === "For Sale" && (
                                <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-2xl">
                                    For Sale
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5">

                            {/* Title */}
                            <h3 className="text-lg font-semibold">{nft.title}</h3>

                            {/* Creator */}
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                <img src={nft.creatorImg} className="w-5 h-5 rounded-full" />
                                <span>{nft.creator}</span>

                                {/* Verified Badge */}
                                {nft.verified && (
                                    <div className="w-6 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                        <img src="/ms-5/tick.png" className="w-3 h-2" />
                                    </div>
                                )}
                            </div>

                            <div className="w-full border-t border-cyan-400/10 mt-2.5"></div>


                            {/* Price Row */}
                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-xs">Price</p>
                                    <p className="font-semibold">{nft.price}</p>
                                </div>

                                <button className="bg-cyan-400 text-black font-medium px-5 py-2 rounded-lg hover:bg-[#0096c7]">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Marketplace;
