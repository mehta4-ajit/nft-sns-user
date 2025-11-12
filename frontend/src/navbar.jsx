import { useState, useEffect } from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Define all navbar links
  const links = [
    { name: "Feed", href: "/feed" },
    { name: "Upload", href: "/uploadnft" },
    { name: "My NFTs", href: "/mynft" },
    { name: "Distribution", href: "/distribution" },
    { name: "Leaderboards", href: "/leaderboards" },
  ];

  // Automatically set the active link based on current URL
  useEffect(() => {
    const currentPath = window.location.pathname;
    const current = links.find((link) => link.href === currentPath);
    setActiveLink(current ? current.name : "Feed");
  }, [window.location.pathname]);

  return (
    <nav className="bg-[#0b0b0b] text-white shadow-md sticky top-0 z-50">
      <div className="flex flex-wrap justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-3">
        {/* LEFT SECTION: Logo + Links */}
        <div className="flex items-center space-x-8">
          {/* Logo + Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <img
              src="/logo (2).png"
              alt="Logo"
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
            <span className="text-xl sm:text-2xl font-bold text-white glow">
              MINTIOLAB
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-gray-300 ml-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`relative font-medium transition duration-200 ${
                  activeLink === link.name
                    ? "text-white"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transform translate-y-1 transition-all duration-300"></span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: Socials + Wallet + Profile */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Social Icons */}
          <div className="flex items-center border border-gray-700 rounded-2xl px-2.5 py-1.5">
            <a
              href="#"
              className="p-2 rounded-full border border-cyan-600 flex items-center justify-center hover:bg-cyan-900 transition"
            >
              <FaTwitter className="text-cyan-400 w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-cyan-600 flex items-center justify-center ml-2 hover:bg-cyan-900 transition"
            >
              <FaInstagram className="text-cyan-400 w-3.5 h-3.5" />
            </a>
          </div>

          {/* Wallet */}
          <div className="flex items-center border border-gray-700 rounded-2xl px-4 py-2">
            <MdAccountBalanceWallet className="text-cyan-400 mr-2" />
            <span className="text-white font-semibold text-sm">0.45 ETH</span>
            <span className="text-gray-500 mx-2">|</span>
            <span className="text-gray-400 text-sm">0xA2f...9C3</span>
          </div>

          {/* Profile */}
          <div className="flex items-center cursor-pointer group">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700">
              <img
                src="/avatar 1.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <FiChevronDown className="ml-1 text-gray-400 group-hover:text-white transition" />
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 focus:outline-none"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b0b0b] border-t border-gray-800 animate-fade-in-down">
          <div className="flex flex-col items-center space-y-4 py-6 text-gray-300">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setMenuOpen(false);
                }}
                className={`relative font-medium transition duration-200 ${
                  activeLink === link.name
                    ? "text-white"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span className="absolute left-0 -bottom-1.5 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
                )}
              </a>
            ))}

            <div className="w-3/4 h-px bg-gray-800 my-4" />

            {/* Social icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 rounded-full border border-cyan-600 flex items-center justify-center hover:bg-cyan-900 transition"
              >
                <FaTwitter className="text-cyan-400 w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full border border-cyan-600 flex items-center justify-center hover:bg-cyan-900 transition"
              >
                <FaInstagram className="text-cyan-400 w-4 h-4" />
              </a>
            </div>

            {/* Wallet */}
            <div className="flex items-center border border-gray-700 rounded-2xl px-4 py-4 mt-4">
              <MdAccountBalanceWallet className="text-cyan-400 mr-2" />
              <span className="text-white font-semibold text-sm">0.45 ETH</span>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-gray-400 text-sm">0xA2f...9C3</span>
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-2 mt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                <img
                  src="/avatar 1.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium">Creator</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
