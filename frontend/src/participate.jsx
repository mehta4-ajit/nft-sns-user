import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { BASE_URL } from "./config";
import AnimatedAlert from "./Alertanimated";

export default function SubmitEntryModal({ eventId, onClose }) {
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: ""
  });

  // ✅ Fetch user's NFTs
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user-items-nft`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setNfts(data.items);
        }
      } catch (err) {
        console.error("NFT fetch error:", err);
      }
    };

    fetchNFTs();
  }, []);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Submit selected NFT
  const submitEntry = async () => {
    if (!selectedNFT)
      return setAlertData({ show: true, type: "error", message: "Please select an NFT" });

    if (!eventId)
      return setAlertData({ show: true, type: "error", message: "Invalid event ID" });

    try {
      const res = await fetch(`${BASE_URL}/api/events/${eventId}/participate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          item_id: selectedNFT.id,
          title: selectedNFT.name,
          thumbnail: selectedNFT.url_thumbnail || selectedNFT.url_storage,
          creator: selectedNFT.creator || selectedNFT.user_name || "Unknown",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setAlertData({
          show: true,
          type: "success",
          message: "NFT submitted successfully!"
        });

        setTimeout(() => {
          setAlertData({ show: false, type: "", message: "" });
          onClose();
        }, 1500);
      } else {
        setAlertData({
          show: true,
          type: "error",
          message: data.error || "Submission failed"
        });
      }
    } catch (err) {
      console.error(err);
      setAlertData({
        show: true,
        type: "error",
        message: "Network error"
      });
    }
  };

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-[#131316] text-white rounded-2xl p-6 w-full max-w-md md:max-w-lg shadow-2xl border border-[#2b2b2b]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Submit Your Entry</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl font-bold -translate-y-1"
          >
            ×
          </button>
        </div>

        {/* Dropdown */}
        <div className="mb-5">
          <label className="block text-sm mb-2 text-gray-300">
            Select NFT from My Collection
          </label>

          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="flex justify-between items-center w-full bg-[#0f0f0f] text-gray-300 border border-[#2b2b2b] rounded-lg px-3 py-2 text-sm cursor-pointer select-none"
            >
              {selectedNFT ? selectedNFT.name : "Choose an NFT to submit"}
              <ChevronDown
                className={`w-4 h-4 text-white transition-transform duration-200 ${open ? "rotate-180" : ""
                  }`}
              />
            </div>

            {open && (
              <div className="absolute mt-1 w-full bg-[#0f0f0f] border border-[#2b2b2b] rounded-lg shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
                {nfts.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No NFTs found
                  </div>
                )}

                {nfts.map((nft, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedNFT(nft);
                      setOpen(false);
                    }}
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-cyan-500/20 cursor-pointer transition flex items-center gap-3"
                  >
                    <img
                      src={nft.url_thumbnail || nft.url_storage}
                      alt={nft.name}
                      className="w-8 h-8 object-cover rounded-md border border-[#333]"
                    />
                    <span>{nft.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Preview Section (auto appears when selected) */}
        {selectedNFT && (
          <div className="mb-5 border border-[#1F1F23] rounded-lg p-3 bg-[#0f0f0f]">
            <p className="text-xs text-gray-400 mb-2">Preview</p>
            <img
              src={selectedNFT.url_thumbnail || selectedNFT.url_storage}
              alt={selectedNFT.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Info Text */}
        <div className="flex items-start text-gray-400 text-sm border border-[#1F1F23] p-3 rounded-lg mb-6">
          <span className="text-white mr-2">💡</span>
          <p className="text-xs sm:text-sm">
            By submitting, you agree to the contest rules and terms.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={onClose}
            className="border border-[#1F1F23] bg-[#0d0d0d] w-full sm:w-1/2 text-white px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={submitEntry}
            className="bg-cyan-400 w-full sm:w-1/2 text-black font-semibold px-4 py-2 rounded-lg hover:bg-cyan-500 transition"
          >
            Submit Entry
          </button>
        </div>
      </div>
    </div>

    {alertData.show && (
      <AnimatedAlert
        type={alertData.type}
        message={alertData.message}
        onClose={() => setAlertData({ show: false, type: "", message: "" })}
      />
    )}

    </>
  );
  
}
