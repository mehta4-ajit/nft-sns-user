import React, { useState } from 'react';
import { ChevronDown, Tag } from 'lucide-react';

export default function ListNFTForSale() {
    const [selectedNFT, setSelectedNFT] = useState('');
    const [price, setPrice] = useState('0.00');
    const [saleType, setSaleType] = useState('Fixed Price');

    const [showNFTDropdown, setShowNFTDropdown] = useState(false);
    const [showSaleTypeDropdown, setShowSaleTypeDropdown] = useState(false);

    const nftOptions = ['Cosmic Dreams #42', 'Galaxy Cat', 'Neon Nights'];
    const saleTypeOptions = ['Fixed Price', 'Auction'];

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-6 py-6">

            {/* BACK BUTTON */}
            <button className="absolute sm:top-6 sm:left-6 top-4 left-4 flex items-center gap-2 
                text-gray-300 hover:text-white transition-colors text-xs sm:text-sm font-semibold 
                px-3 sm:px-4 py-2 rounded-lg border border-cyan-800/30 cursor-pointer">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <div className="max-w-2xl mx-auto pt-12 sm:pt-16">

                {/* HEADER */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <Tag className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />

                        <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-cyan-400">
                            List NFT <span className="bg-gradient-to-r from-[#22D3EE] to-[#9952E0] bg-clip-text text-transparent">for Sale</span>
                        </h1>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm ml-10 sm:ml-11">
                        Select your NFT and set your selling terms
                    </p>
                </div>

                {/* FORM CARD */}
                <div className="bg-[#13131680] border border-cyan-800/35 rounded-2xl p-6 sm:p-8">

                    {/* ---------------- SELECT NFT ---------------- */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-3">Select NFT</label>

                        <div className="relative">
                            <button
                                onClick={() => setShowNFTDropdown(!showNFTDropdown)}
                                className="w-full bg-black/20 border border-zinc-800 rounded-lg px-4 py-3 text-left 
                                flex items-center justify-between hover:border-zinc-600 transition-colors"
                            >
                                <span className={selectedNFT ? "text-white" : "text-gray-400"}>
                                    {selectedNFT || 'Choose from your NFTs'}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform 
                                    ${showNFTDropdown ? "rotate-180" : "rotate-0"}`} />
                            </button>

                            {/* CUSTOM DROPDOWN */}
                            {showNFTDropdown && (
                                <div className="absolute top-full w-full mt-2 bg-[#0f0f0f] 
                                    border border-zinc-800 rounded-lg overflow-hidden z-20 transition-all">

                                    {nftOptions.map((nft) => {
                                        const isSelected = selectedNFT === nft;

                                        return (
                                            <button
                                                key={nft}
                                                onClick={() => {
                                                    setSelectedNFT(nft);
                                                    setShowNFTDropdown(false);
                                                }}
                                                className={`w-full px-4 py-3 flex items-center gap-3 text-left
                                                    transition-colors 
                                                    ${isSelected
                                                        ? "bg-cyan-400 text-black"
                                                        : "hover:bg-zinc-800 text-gray-300"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                )}

                                                <span>{nft}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ---------------- PRICE ---------------- */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-3">Price (ETH)</label>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">Ξ</div>

                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-black/30 border border-zinc-800 rounded-lg 
                                pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 
                                transition-colors text-sm sm:text-base"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* ---------------- SALE TYPE ---------------- */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium mb-3">Sale Type</label>

                        <div className="relative">
                            <button
                                onClick={() => setShowSaleTypeDropdown(!showSaleTypeDropdown)}
                                className="w-full bg-black/30 border border-zinc-900 rounded-lg px-4 py-3 text-left 
                                flex items-center justify-between hover:border-zinc-600 transition-colors"
                            >
                                <span className="text-white">{saleType}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform 
                                    ${showSaleTypeDropdown ? "rotate-180" : "rotate-0"}`} />
                            </button>

                            {/* CUSTOM DROPDOWN */}
                            {showSaleTypeDropdown && (
                                <div className="absolute top-full w-full mt-2 bg-[#0f0f0f] 
                                    border border-zinc-800 rounded-lg overflow-hidden z-20">

                                    {saleTypeOptions.map((type) => {
                                        const isSelected = saleType === type;

                                        return (
                                            <button
                                                key={type}
                                                onClick={() => {
                                                    setSaleType(type);
                                                    setShowSaleTypeDropdown(false);
                                                }}
                                                className={`w-full px-4 py-3 flex items-center gap-3 text-left
                                                    transition-colors 
                                                    ${isSelected
                                                        ? "bg-cyan-400 text-black"
                                                        : "hover:bg-zinc-800 text-gray-300"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                )}

                                                <span>{type}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* LIST BUTTON */}
                    <button className="w-full bg-cyan-400 text-black font-semibold rounded-xl py-3 sm:py-4 
                        flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer hover:bg-cyan-300">
                        <Tag className="w-5 h-5" />
                        List for Sale
                    </button>
                </div>
            </div>
        </div>
    );
}
