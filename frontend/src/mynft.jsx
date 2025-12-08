import React, { useState, useEffect } from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Search, Grid, List, Upload } from "lucide-react";
import CustomDropdown from "./customdropdown";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyNFTsPage() {
    const navigate = useNavigate();
    const [view, setView] = useState("grid");
    const [status, setStatus] = useState("All Status");
    const [category, setCategory] = useState("All Categories");
    const [search, setSearch] = useState("");

    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch NFTs from backend
    const fetchUserNFTs = async (statusFilter = status, categoryFilter = category, searchFilter = search) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return navigate("/login");

            const res = await axios.get("http://localhost:5000/api/user-items-nft", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    status: statusFilter === "All Status" ? undefined : statusFilter,
                    category: categoryFilter === "All Categories" ? undefined : categoryFilter,
                    search: searchFilter || undefined,
                },
            });

            setNfts(res.data.items || []);
        } catch (err) {
            console.error("FETCH NFTs ERROR:", err.response?.data || err);
            alert("Failed to load NFTs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserNFTs();
    }, [status, category, search]);

    // SNS Add
    const handleAddSNS = async (itemId, snsKind) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return alert("Login required");

            const payload = {
                item_id: itemId,
                sns: [snsKind],
                handle: "your_handle_here",
                url: `https://${snsKind}.com/your_handle`,
            };

            const res = await axios.post(
                "http://localhost:5000/api/item/sns/add",
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(res.data.message);
        } catch (err) {
            console.error("SNS ADD ERROR:", err.response?.data || err);
            alert("Something went wrong");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-white text-lg">
                Loading NFTs...
            </div>
        );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0d0d0d] text-white p-4 sm:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold glow">My NFTs</h1>
                        <p className="text-gray-400 text-sm">Manage your minted NFTs and drafts</p>
                    </div>
                    <button
                        className="bg-cyan-300 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg mt-4 md:mt-0 flex items-center justify-center gap-2 font-semibold text-base sm:text-lg"
                        onClick={() => navigate("/uploadnft")}
                    >
                        <Upload size={23} className="border-black border rounded-full p-1" />
                        Upload New NFT
                    </button>
                </div>

                {/* Filter + Search */}
                <div className="bg-[#111111] border border-[#18181B] p-4 rounded-xl flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center flex-grow bg-[#0d0d0d] rounded-lg px-3 py-2.5 border border-[#18181B] min-w-[220px]">
                        <Search size={19} className="text-gray-400 mb-0.5" />
                        <input
                            type="text"
                            placeholder="Search by title or tag..."
                            className="bg-transparent outline-none text-sm text-gray-300 w-full ml-2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <CustomDropdown
                        value={status}
                        onChange={setStatus}
                        options={["All Status", "Minted", "Draft"]}
                    />
                    <CustomDropdown
                        value={category}
                        onChange={setCategory}
                        options={["All Categories", "Art", "Music", "Collectibles"]}
                    />
                    <div className="flex gap-2 ml-auto">
                        <button
                            className={`p-2 rounded-lg border border-[#18181B] hover:bg-[#222222] transition ${view === "grid" ? "bg-cyan-400 text-white" : "bg-[#0d0d0d]"} `}
                            onClick={() => setView("grid")}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            className={`p-2 rounded-lg border border-[#18181B] hover:bg-[#222222] transition ${view === "list" ? "bg-cyan-400 text-white" : "bg-[#0d0d0d]"} `}
                            onClick={() => setView("list")}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* NFT Cards Section */}
                <div
                    className={`${view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pl-10 pr-10"
                        : "flex flex-col gap-6 pl-10 pr-10"
                        }`}
                >
                    {nfts.length === 0 && (
                        <p className="text-gray-400 text-center col-span-full">
                            No NFTs found.
                        </p>
                    )}

                    {nfts.map((nft) => {
                        const nftData = nft.nftData || {};
                        return (
                            <div
                                key={nft.id}
                                className={`bg-[#111111] border border-[#18181B] rounded-2xl shadow-md transition-all duration-300 relative 
                            hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]
                            ${view === "list" ? "flex flex-col sm:flex-row p-4 items-start gap-4" : ""}`}
                            >
                                {/* Status Badge */}
                                <span
                                    className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-md font-medium ${nftData.status === "Minted"
                                        ? "bg-cyan-400 text-white"
                                        : "bg-[#3a3a3a] text-gray-300"
                                        }`}
                                >
                                    {nftData.status || nft.status || "Draft"}
                                </span>

                                {/* Image */}
                                <img
                                    src={nft.url_thumbnail || "Frame 13 (2).png"}
                                    alt={nft.name || "NFT Image"}
                                    className={`${view === "list"
                                        ? "w-full sm:w-40 h-44 object-cover rounded-lg flex-shrink-0"
                                        : "w-full h-72 object-contain rounded-t-2xl p-5"
                                        }`}
                                />

                                {/* Content */}
                                <div
                                    className={`flex flex-col justify-start flex-1 ${view === "grid" ? "p-4 mt-1" : "mt-1"}`}
                                >
                                    {/* Title */}
                                    <h3
                                        className={`font-semibold ${view === "grid" ? "text-lg sm:text-xl" : "text-lg sm:text-xl"} leading-tight`}
                                    >
                                        {nft.name || "Untitled NFT"}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                                        {nft.description || "No description provided."}
                                    </p>

                                    {view === "grid" && <div className="w-full h-px bg-gray-800 my-7" />}

                                    {/* Metadata + Socials */}
                                    {view === "grid" ? (
                                        <div className="flex justify-between items-center -mt-2 text-white text-sm flex-wrap gap-2">
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <p>#{nftData.token_id || "342"}</p>
                                                <div className="flex items-center gap-2.5">
                                                    <img src="Vector (1).png" className="h-3.5 w-3.5 mb-0.5" />
                                                    <p>{nft.likes || "342"}</p>
                                                </div>
                                                <p>{nft.royalty ? `${nft.royalty}% Royalty` : "7.5% Royalty"}</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-xl mt-2 sm:mt-0">
                                                <FaInstagram
                                                    onClick={() => handleAddSNS(nft.id, "instagram")}
                                                    className="hover:text-pink-400 cursor-pointer"
                                                />
                                                <FaYoutube
                                                    onClick={() => handleAddSNS(nft.id, "youtube")}
                                                    className="hover:text-red-500 cursor-pointer"
                                                />
                                                <FaTiktok
                                                    onClick={() => handleAddSNS(nft.id, "tiktok")}
                                                    className="hover:text-cyan-400 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center mt-3 gap-4 text-white text-xs flex-wrap">
                                            <p>#{nftData.token_id || "342"}</p>
                                            <div className="flex items-center gap-2.5">
                                                <img src="Vector (1).png" className="h-3 w-3 mb-0.5 " />
                                                <p>{nft.likes || "342"}</p>
                                            </div>
                                            <p>{nft.royalty ? `${nft.royalty}% Royalty` : "7.5% Royalty"}</p>
                                            <FaInstagram
                                                onClick={() => handleAddSNS(nft.id, "instagram")}
                                                className="hover:text-pink-400 cursor-pointer text-white text-xl ml-8 mt-1"
                                            />
                                            <FaYoutube
                                                onClick={() => handleAddSNS(nft.id, "youtube")}
                                                className="hover:text-red-500 cursor-pointer text-white text-xl ml-2 mt-1"
                                            />
                                            <FaTiktok
                                                onClick={() => handleAddSNS(nft.id, "tiktok")}
                                                className="hover:text-cyan-400 cursor-pointer text-white text-xl ml-2 mt-1"
                                            />
                                        </div>
                                    )}

                                    {/* Buttons */}
                                    {nft.status === "Draft" ? (
                                        <div className={`flex gap-2 mb-2 mt-10 ${view === "grid" ? "w-full" : "w-[200px]"}`}>
                                            <button className="flex-1 border bg-[#0d0d0d] border-[#18181B] hover:bg-[#1a1a1a] rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1.5">
                                                <img src="Edit (1).png" className="object-contain h-4 w-4" /> Edit
                                            </button>
                                            <button className="flex-1 border bg-[#0d0d0d] border-[#18181B] hover:bg-[#1a1a1a] rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1.5">
                                                <img src="eye.png" className="object-contain h-5 w-5" /> View
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className={` border bg-[#0d0d0d] border-[#18181B] hover:bg-[#1a1a1a] rounded-lg py-2 mt-10 text-sm font-medium flex items-center justify-center gap-1.5 ${view === "grid" ? "w-full" : "w-[100px] px-4 "} `}
                                        >
                                            <img src="eye.png" className="object-contain h-5 w-5" /> View
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
