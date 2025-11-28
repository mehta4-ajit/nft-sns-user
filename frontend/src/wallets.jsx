import React, { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";

import metamask from "../public/metafosk.png";
import walletconnectIcon from "../public/connect.png";
import coinbaseIcon from "../public/stuit.png";
import tickIcon from "../public/check Icon.png";

import WalletConnectProvider from "@walletconnect/ethereum-provider";

export default function Wallets() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState("");
  const [chainId, setChainId] = useState(null);
  const [alert, setAlert] = useState(null);

  // --------------------------------------------------
  // GET ETHERS PROVIDER
  // --------------------------------------------------
  const getProvider = (externalProvider) => {
    if (!externalProvider) return null;
    return new ethers.BrowserProvider(externalProvider);
  };

  // --------------------------------------------------
  // LOAD ACCOUNT DATA
  // --------------------------------------------------
  const loadAccountData = useCallback(async (acct, provider) => {
    try {
      if (!provider) return;
      const bal = await provider.getBalance(acct);
      setBalance(ethers.formatEther(bal));

      const net = await provider.getNetwork();
      setChainId(Number(net.chainId));
      setNetwork(net.name);
    } catch (err) {
      console.error(err);
      setAlert("error: " + err.message);
    }
  }, []);

  // --------------------------------------------------
  // REGISTER WALLET IN BACKEND
  // --------------------------------------------------
  const registerWalletBackend = async (address) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const res = await fetch("http://localhost:5000/api/wallet/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAlert("connected");
      setIsConnected(true);
    } catch (err) {
      console.error(err);
      setAlert("error: " + err.message);
    }
  };

  // --------------------------------------------------
  // DISCONNECT WALLET
  // --------------------------------------------------
  const disconnectWallet = async (silent = false) => {
  if (window.wcProvider?.disconnect) await window.wcProvider.disconnect();

  setSelectedWallet(null);
  setIsConnected(false);
  setWalletAddress("");
  setBalance(null);
  setNetwork("");
  setChainId(null);

  if (!silent) setAlert("disconnected");
};

  
  // -------------------------
  // USE EFFECT
  // -------------------------
  useEffect(() => {
    const { metaMask, coinbase } = detectInjectedWallets();

    console.log("MetaMask Installed:", !!metaMask);
    console.log("Coinbase Installed:", !!coinbase);
  }, []);

  // --------------------------------------------------
  // EXTENSION DETECTION (VERY IMPORTANT)
  // --------------------------------------------------
  const detectInjectedWallets = () => {
    const { ethereum } = window;
    let metaMask = null;
    let coinbase = null;

    if (!ethereum) return { metaMask, coinbase };

    // Multi-provider injection (MetaMask + Coinbase)
    if (ethereum.providers?.length) {
      ethereum.providers.forEach((p) => {
        if (p.isMetaMask) metaMask = p;
        if (p.isCoinbaseWallet) coinbase = p;
      });
    }

    // Single provider fallback
    if (ethereum.isMetaMask) metaMask = ethereum;
    if (ethereum.isCoinbaseWallet) coinbase = ethereum;

    return { metaMask, coinbase };
  };

  // --------------------------------------------------
  // CONNECT METAMASK (EXTENSION)
  // --------------------------------------------------
  const connectMetaMask = async () => {
    try {
      const { metaMask } = detectInjectedWallets();
      if (!metaMask) throw new Error("Please install MetaMask extension.");

      const accounts = await metaMask.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];
      setWalletAddress(address);

      const provider = new ethers.BrowserProvider(metaMask);

      await loadAccountData(address, provider);
      await registerWalletBackend(address);

      setSelectedWallet("MetaMask");
      setIsConnected(true);
    } catch (err) {
      setAlert("error: " + err.message);
    }
  };

  // --------------------------------------------------
  // CONNECT COINBASE (EXTENSION)
  // --------------------------------------------------
  const connectCoinbase = async () => {
    try {
      const { coinbase } = detectInjectedWallets();
      if (!coinbase) throw new Error("Please install Coinbase Wallet extension.");

      const accounts = await coinbase.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];
      setWalletAddress(address);

      const provider = new ethers.BrowserProvider(coinbase);

      await loadAccountData(address, provider);
      await registerWalletBackend(address);

      setSelectedWallet("Coinbase");
      setIsConnected(true);
    } catch (err) {
      setAlert("error: " + err.message);
    }
  };

  // --------------------------------------------------
  // CONNECT WALLETCONNECT
  // --------------------------------------------------
  const connectWalletConnect = async () => {
    try {
      if (window.wcProvider?.disconnect) await window.wcProvider.disconnect();

      const wcProvider = await WalletConnectProvider.init({
        projectId: "31e35412b28df048fca658f48c492f62",
        chains: [1],
        showQrModal: true,
      });

      window.wcProvider = wcProvider;

      await wcProvider.enable();

      const provider = getProvider(wcProvider);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setSelectedWallet("WalletConnect");

      await loadAccountData(address, provider);
      await registerWalletBackend(address);

    } catch (err) {
      setAlert("error: " + err.message);
    }
  };

  // --------------------------------------------------
  // WALLET SELECT HANDLER
  // --------------------------------------------------
  const handleWalletSelect = async (wallet) => {
  await disconnectWallet(true); // <-- NO ALERT
  setSelectedWallet(wallet);

  if (wallet === "MetaMask") connectMetaMask();
  else if (wallet === "Coinbase") connectCoinbase();
  else if (wallet === "WalletConnect") connectWalletConnect();
};


  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10 text-white">

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Back</span>
      </Link>

      {/* Wallet Icon */}
      <div className="mb-6 mt-8">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#24CBF5] to-[#9952E0] shadow-lg">
          <Wallet className="h-10 w-10 text-white" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Connect Your Wallet
      </h1>
      <p className="text-gray-400 mb-8">Choose your preferred wallet</p>

      <form className="relative w-full max-w-lg bg-black rounded-2xl p-6 sm:p-8 border border-[#18181B] shadow-xl">

        {/* STATUS */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">Wallet Status</label>
          <div
            className={`p-3 rounded-md text-sm border bg-[#09090B4D] ${
              isConnected ? "border-cyan-500" : "border-[#18181B]"
            }`}
          >
            {!isConnected ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Not Connected
              </div>
            ) : (
              <div>
                <div className="text-gray-400 text-xs">Address</div>
                <div className="text-cyan-400 font-semibold">{walletAddress}</div>

                <div className="text-gray-400 text-xs mt-2">Balance</div>
                <div>{balance} ETH</div>

                <div className="text-gray-400 text-xs mt-2">Network</div>
                <div>
                  {network} (Chain ID: {chainId})
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WALLET OPTIONS */}
        <div className="space-y-5 mb-6">
          {[
            { name: "MetaMask", icon: metamask },
            { name: "WalletConnect", icon: walletconnectIcon },
            { name: "Coinbase", icon: coinbaseIcon },
          ].map((wallet) => (
            <div
              key={wallet.name}
              onClick={() => handleWalletSelect(wallet.name)}
              className={`flex items-center gap-4 p-4 rounded-md cursor-pointer border-2 transition-all bg-[#09090B4D] ${
                selectedWallet === wallet.name
                  ? "border-cyan-500 shadow-lg"
                  : "border-[#18181B] hover:border-cyan-500"
              }`}
            >
              <img src={wallet.icon} className="w-8 h-8" />
              <div className="flex-1">
                <h3 className="font-semibold">{wallet.name}</h3>
                <p className="text-gray-400 text-sm">{wallet.name} connect</p>
              </div>
              {selectedWallet === wallet.name && (
                <img src={tickIcon} className="w-4 h-4" />
              )}
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        {!isConnected ? (
          <div className="flex justify-center">
            <Link to="/login" className="text-gray-300 hover:text-cyan-400">
              <ArrowLeft className="inline w-5 h-5 mr-1" />
              Back to Login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={disconnectWallet}
              className="w-full sm:w-1/2 border border-[#18181B] hover:bg-red-500/10 py-2.5 rounded-md"
            >
              Disconnect Wallet
            </button>

            <Link
              to="/profile"
              className="w-full sm:w-1/2 bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black text-center py-2.5 rounded-md"
            >
              Continue to Profile
            </Link>
          </div>
        )}
      </form>

      {/* ALERT */}
      {alert && (
        <div
          className={`fixed right-8 top-20 bg-black border ${
            alert.includes("connected")
              ? "border-cyan-500"
              : alert.includes("disconnected")
              ? "border-yellow-500"
              : "border-red-500"
          } rounded-xl px-6 py-4 w-80 shadow-xl`}
        >
          <button
            onClick={() => setAlert(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-white text-lg font-semibold mb-1">
            {alert.includes("connected")
              ? "Wallet Connected"
              : alert.includes("disconnected")
              ? "Wallet Disconnected"
              : "Error"}
          </h2>

          <p className="text-gray-400 text-sm">{alert}</p>
        </div>
      )}
    </div>
  );
}
