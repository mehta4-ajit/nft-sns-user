import React from "react";
import { FiCopy } from "react-icons/fi";

export default function ShareModal() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white px-4">
      {/* Modal Container */}
      <div className="bg-[#131316] w-full max-w-md md:max-w-lg rounded-2xl border border-[#1F1F23] p-6 md:p-8 shadow-lg relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg md:text-xl font-semibold">Share to X (Twitter)</h2>
          <button className="text-gray-400 hover:text-gray-200 text-2xl leading-none">
            ×
          </button>
        </div>

        {/* NFT Preview */}
        <div className="flex items-start space-x-3 border border-[#1F1F23] rounded-xl p-4 mb-4">
          <img
            src="Image (6).png"
            alt="Neon Dreams #247"
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
          />
          <div className="flex flex-col justify-start">
            <h3 className="font-semibold text-white text-sm md:text-base">
              Neon Dreams #247
            </h3>
            <p className="text-xs md:text-sm text-gray-400">
              A vibrant digital artwork exploring the intersection of technology
              and consciousness
            </p>
          </div>
        </div>

        {/* Auto-generated Caption */}
        <div className="mb-5">
          <label className="block text-gray-300 mb-2 text-sm font-medium">
            Auto-generated Caption
          </label>
          <textarea
            className="w-full bg-[#131316] border border-[#1F1F23] rounded-xl p-3 text-gray-300 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500 overflow-hidden"
            rows="4"
            readOnly
            value={`Check out "Neon Dreams #247" on CreatorVerse! 🤯✨

A vibrant digital artwork exploring the intersection of technology and consciousness

#NFT #Web3 #DigitalArt #CreatorVerse`}
          ></textarea>
        </div>

        {/* UTM Tracking Link */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm font-medium">
            UTM Tracking Link
          </label>

          <div className="flex items-center gap-2">
            {/* Link Input Box */}
            <div className="flex items-center bg-[#131316] border border-[#1F1F23] rounded-xl px-3 py-[10px] flex-grow">
              <input
                type="text"
                value="https://creatorverse.app/nft/...utm_source=instagram"
                readOnly
                className="bg-transparent text-gray-400 text-sm outline-none w-full"
              />
            </div>

            {/* Copy Icon Box (separate) */}
            <button className="bg-[#0d0d0d] border border-[#1F1F23] rounded-xl p-2 md:p-[10px] text-gray-400 hover:text-white flex items-center justify-center">
              <FiCopy className="text-lg" />
            </button>
          </div>
        </div>

        {/* NFT Address */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm font-medium">
            NFT Address
          </label>

          <div className="flex items-center gap-2">
            {/* Address Input Box */}
            <div className="flex items-center bg-cyan-400/10 border border-cyan-400 rounded-xl px-3 py-[10px] flex-grow">
              <input
                type="text"
                value="0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
                readOnly
                className="bg-transparent text-cyan-400 text-sm outline-none w-full"
              />
            </div>

            {/* Copy Icon Box (separate) */}
            <button className="bg-[#0d0d0d] border border-[#1F1F23] rounded-xl p-2 md:p-[10px] text-gray-400 hover:text-white flex items-center justify-center">
              <FiCopy className="text-lg" />
            </button>
          </div>
        </div>

        {/* NFT Serial Key */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <label className="block text-gray-300 text-sm font-medium">
            NFT Serial Key:
          </label>
          <p className="text-cyan-400 text-sm font-medium">1000032</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button className="w-full sm:w-1/2 bg-[#0d0d0d] text-gray-300 rounded-xl py-2 font-medium border border-[#1F1F23] transition">
            Cancel
          </button>
          <button className="w-full sm:w-1/2 bg-cyan-400 hover:bg-cyan-500 text-black rounded-xl py-2 font-semibold transition">
            Post to Instagram
          </button>
        </div>
      </div>
    </div>
  );
}
