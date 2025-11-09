import React, { useState } from "react";
import { Wallet, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";

import metamask from "../public/metafosk.png";
import walletconnect from "../public/connect.png";
import coinbase from "../public/stuit.png";
import tickIcon from "../public/check Icon.png"; // ✅ tick image

export default function Wallets() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [alert, setAlert] = useState(null);

  const walletAddress = "0xA1B2...C3D4"; // mock address

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setIsConnected(true);
    setAlert("connected");
  };

  const handleDisconnect = () => {
    setSelectedWallet(null);
    setIsConnected(false);
    setAlert("disconnected");
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10 text-white">
      {/* 🔙 Back Arrow */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Back</span>
      </Link>

      {/* Wallet Icon */}
      <div className="mb-6 mt-8">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#24CBF5] to-[#9952E0] shadow-[0_0_20px_rgba(36,203,245,0.25)]">
          <Wallet className="h-10 w-10 text-white" />
        </div>
      </div>

      {/* Headings */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
        Connect Your Wallet
      </h1>
      <p className="text-gray-400 mb-8 text-center text-sm sm:text-base">
        Choose your preferred wallet to get started
      </p>

      {/* Wallet Form */}
      <form className="relative w-full max-w-lg bg-black rounded-2xl p-6 sm:p-8 border border-[#18181B] shadow-[0_0_30px_rgba(36,203,245,0.25)] transition-all duration-300">
        {/* Connection Status */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">
            Wallet Status
          </label>
          <div
            className={`flex items-center justify-between w-full p-3 rounded-md text-sm sm:text-base transition-all border ${
              isConnected
                ? "bg-[#09090B4D] border-cyan-500"
                : "bg-[#09090B4D] border-[#18181B]"
            }`}
          >
            {!isConnected ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                <span>Not Connected</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-gray-400 text-xs">Address</div>
                <div className="text-cyan-400 font-semibold">
                  {walletAddress}
                </div>
              </div>
            )}

            {isConnected && (
              <div className="flex items-center gap-3 text-cyan-400 font-semibold text-lg">
                <img src={tickIcon} alt="tick" className="w-4 h-4" />
                <span>Connected</span>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Options */}
        <div className="space-y-5 mb-6">
          {/* MetaMask */}
          <div
            onClick={() => handleWalletSelect("MetaMask")}
            className={`flex items-center gap-4 p-4 rounded-md cursor-pointer transition-all border-2 ${
              selectedWallet === "MetaMask"
                ? "border-cyan-500 shadow-[0_0_10px_rgba(36,203,245,0.3)]"
                : "border-[#18181B] hover:border-cyan-500"
            } bg-[#09090B4D]`}
          >
            <img src={metamask} alt="MetaMask" className="w-8 h-8" />
            <div className="flex-1">
              <h3 className="font-semibold">MetaMask</h3>
              <p className="text-gray-400 text-sm">
                Connect using your MetaMask browser extension
              </p>
            </div>
            {selectedWallet === "MetaMask" && (
              <img src={tickIcon} alt="selected" className="w-4 h-4" />
            )}
          </div>

          {/* WalletConnect */}
          <div
            onClick={() => handleWalletSelect("WalletConnect")}
            className={`flex items-center gap-4 p-4 rounded-md cursor-pointer transition-all border-2 ${
              selectedWallet === "WalletConnect"
                ? "border-cyan-500 shadow-[0_0_10px_rgba(36,203,245,0.3)]"
                : "border-[#18181B] hover:border-cyan-500"
            } bg-[#09090B4D]`}
          >
            <img src={walletconnect} alt="WalletConnect" className="w-8 h-8" />
            <div className="flex-1">
              <h3 className="font-semibold">WalletConnect</h3>
              <p className="text-gray-400 text-sm">
                Scan QR code to connect your wallet securely
              </p>
            </div>
            {selectedWallet === "WalletConnect" && (
              <img src={tickIcon} alt="selected" className="w-5 h-5" />
            )}
          </div>

          {/* Coinbase */}
          <div
            onClick={() => handleWalletSelect("Coinbase")}
            className={`flex items-center gap-4 p-4 rounded-md cursor-pointer transition-all border-2 ${
              selectedWallet === "Coinbase"
                ? "border-cyan-500 shadow-[0_0_10px_rgba(36,203,245,0.3)]"
                : "border-[#18181B] hover:border-cyan-500"
            } bg-[#09090B4D]`}
          >
            <img src={coinbase} alt="Coinbase" className="w-8 h-8" />
            <div className="flex-1">
              <h3 className="font-semibold">Coinbase Wallet</h3>
              <p className="text-gray-400 text-sm">
                Connect using your Coinbase Wallet app
              </p>
            </div>
            {selectedWallet === "Coinbase" && (
              <img src={tickIcon} alt="selected" className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Buttons */}
        {!isConnected ? (
          <div className="flex justify-center">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2.5 text-gray-300 py-2.5 rounded-lg font-semibold text-sm sm:text-base hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleDisconnect}
              className="w-full sm:w-1/2 border border-[#18181B] text-gray-300 hover:bg-red-500/10 transition-colors py-2.5 rounded-md font-semibold text-sm sm:text-base"
            >
              Disconnect Wallet
            </button>

            <Link
              to="/profile"
              className="w-full sm:w-1/2 bg-gradient-to-r from-[#24CBF5] to-[#9952E0] hover:opacity-90 transition-opacity text-black text-center py-2.5 rounded-md font-semibold text-sm sm:text-base"
            >
              Continue to Profile
            </Link>
          </div>
        )}
      </form>

      {/* Alert Box */}
      {alert && (
        <div
          className={`fixed right-8 top-20 bg-black border ${
            alert === "connected" ? "border-cyan-500" : "border-red-500"
          } shadow-[0_0_15px_rgba(36,203,245,0.3)] rounded-xl px-6 py-4 w-80 transition-all duration-300`}
        >
          <button
            onClick={() => setAlert(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-white text-lg font-semibold mb-1">
            {alert === "connected" ? "Wallet Connected" : "Wallet Disconnected"}
          </h2>
          <p className="text-gray-400 text-sm">
            {alert === "connected"
              ? "Your wallet has been connected successfully."
              : "Your wallet has been disconnected."}
          </p>
        </div>
      )}
    </div>
  );
}
