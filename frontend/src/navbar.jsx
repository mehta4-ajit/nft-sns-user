import { useState } from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0b0b0b] text-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex flex-wrap justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-3">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-4 cursor-pointer">
          <img src="/logo (2).png" alt="Logo" className="h-12 w-12 sm:h-14 sm:w-14" />
          <span className="text-xl sm:text-2xl font-bold text-white glow">
            MINTIOLAB
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-300 ml-auto mr-[130px]">
          <a href="#" className="hover:text-cyan-400 border-b-2 border-cyan-400 pb-1">Feed</a>
          <a href="#" className="hover:text-cyan-400">Upload</a>
          <a href="#" className="hover:text-cyan-400">My NFTs</a>
          <a href="#" className="hover:text-cyan-400">Distribution</a>
          <a href="#" className="hover:text-cyan-400">Leaderboards</a>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center border border-gray-700 rounded-2xl px-2.5 py-1.5">
            <a href="#" className="p-2 rounded-full border border-cyan-600 flex items-center justify-center hover:bg-cyan-900 transition">
              <FaTwitter className="text-cyan-400 w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 rounded-full border border-cyan-600 flex items-center justify-center ml-2 hover:bg-cyan-900 transition">
              <FaInstagram className="text-cyan-400 w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center border border-gray-700 rounded-2xl px-4 py-2">
            <MdAccountBalanceWallet className="text-cyan-400 mr-2" />
            <span className="text-white font-semibold text-sm">0.45 ETH</span>
            <span className="text-gray-500 mx-2">|</span>
            <span className="text-gray-400 text-sm">0xA2f...9C3</span>
          </div>

          <div className="flex items-center cursor-pointer group">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700">
              <img src="/avatar 1.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <FiChevronDown className="ml-1 text-gray-400 group-hover:text-white transition" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 focus:outline-none"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b0b0b] border-t border-gray-800 animate-fade-in-down">
          <div className="flex flex-col items-center space-y-4 py-6 text-gray-300">
            {["Feed", "Upload", "My NFTs", "Distribution", "Leaderboards"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-cyan-400"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            <div className="w-3/4 h-px bg-gray-800 my-4" />

            <div className="flex space-x-4">
              <a href="#" className="p-3 rounded-full border border-cyan-600 flex items-center justify-center hover:bg-cyan-900 transition">
                <FaTwitter className="text-cyan-400 w-4 h-4" />
              </a>
              <a href="#" className="p-3 rounded-full border border-cyan-600 flex items-center justify-center hover:bg-cyan-900 transition">
                <FaInstagram className="text-cyan-400 w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center border border-gray-700 rounded-2xl px-4 py-4 mt-4">
              <MdAccountBalanceWallet className="text-cyan-400 mr-2" />
              <span className="text-white font-semibold text-sm">0.45 ETH</span>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-gray-400 text-sm">0xA2f...9C3</span>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                <img src="/avatar 1.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-white font-medium">Creator</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
