import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import SubmitEntryModal from "./participate";
import { jwtDecode } from "jwt-decode";


export default function ContestDetails() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [event, setEvent] = useState(null);
    const [entries, setEntries] = useState([]); // Dynamic entries
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState("user");
    const navigate = useNavigate();


    const rewards = [
        { id: 1, title: "1st Place", description: "5 ETH + Platform Feature", img: "/ms-4/iconBG.png" },
        { id: 2, title: "2nd Place", description: "3 ETH + Platform Feature", img: "/ms-4/iconBG.png" },
        { id: 3, title: "3rd Place", description: "1 ETH + Platform Feature", img: "/ms-4/iconBG.png" },
    ];

    const rules = [
        "Original artwork only — no plagiarism",
        "Maximum one entry per creator",
        "NFT must be minted on Polygon network",
        "Submission deadline: November 30, 2025",
    ];

    // ✅ Decode role from token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            if (decoded?.role) {
                setUserRole(decoded.role.toLowerCase());
            }
        } catch {
            console.error("Token decode failed");
        }
    }, []);

    // Fetch event details
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/events/${id}`);
                const data = await res.json();
                if (data.event) setEvent(data.event);
            } catch (err) {
                console.error("Error fetching event:", err);
            }
        };
        fetchEvent();
    }, [id]);

    // Fetch entries
    const fetchEntries = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/events/${id}/entries`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            if (data.success && data.entries) setEntries(data.entries);
        } catch (err) {
            console.error("Error fetching entries:", err);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, [id]);

    // Callback to add a new entry without refresh
    const handleNewEntry = (entry) => {
        setEntries((prev) => [entry, ...prev]);
        setActiveTab("entries"); // Automatically show entries tab
    };

    if (!event) return <div className="text-white p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white px-3 sm:px-5 md:px-10 py-6">
            {/* Back Button */}
            <button
                onClick={() => navigate("/events")}
                className="p-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm border border-[#1F1F23] text-gray-300 hover:text-white mb-4"
            >
                <img src="/ms-4/Vector (5).png" alt="back" className="w-3 h-3" />
                Back to Events
            </button>

            {/* Header Section */}
            <div className="bg-[#0F0F0F] rounded-2xl overflow-hidden border border-[#18181B] mb-7 relative">
                <img
                    src={event.cover}
                    alt="Contest Banner"
                    className="w-full h-48 sm:h-56 md:h-60 lg:h-72 object-fit brightness-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-black/40 to-transparent px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col justify-end gap-3 ">
                    {/* Desktop */}
                    <div className="hidden md:flex md:items-center md:justify-between gap-3 w-full ">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold glow">{event.title}</h1>
                            <span
                                className={`px-3 rounded-xl border text-xs font-semibold whitespace-nowrap translate-y-1
                                ${event.status === "Active"
                                        ? "bg-green-400/20 text-green-200 border-green-400"
                                        : "bg-red-400/20 text-red-200 border-red-400"
                                    }`}
                            >
                                {event.status}
                            </span>
                        </div>
                        
                        {/* ✅ Only Creator can see Participate button */}
                        {event.status === "Active" && userRole === "creator" && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                                <img src="/ms-4/upload file.png" alt="upload" className="w-3 h-3 object-contain" />
                                Participate Now
                            </button>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col md:hidden gap-2">
                        <div className="flex flex-col items-start gap-2 px-2">
                            <span
                                className={`px-3 pb-0.5 rounded-xl border text-xs font-semibold whitespace-nowrap translate-y-1
                                ${event.status === "Active"
                                        ? "bg-green-400/20 text-green-200 border-green-400"
                                        : "bg-red-400/20 text-red-200 border-red-400"
                                    }`}
                            >
                                {event.status}
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-semibold glow">{event.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <img src="/ms-4/Vector (2).png" alt="calendar" className="w-3 h-3 sm:w-4 sm:h-4" />
                                    {event.startDate} – {event.endDate}
                                </div>
                            </div>
                        </div>
                        {/* ✅ Mobile Creator Only Button */}
                        {event.status === "Active" && userRole === "creator" && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition w-full mt-2"
                            >
                                <img src="/ms-4/upload file.png" alt="upload" className="w-3 h-3 object-contain" />
                                Participate Now
                            </button>
                        )}
                    </div>
                     {/* Date Row */}
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-5">
                            <img src="/ms-4/Vector (2).png" alt="calendar" className="w-4 h-4" />
                            <span>{event.startDate}</span>
                            <img src="/ms-4/Vector (4).png" alt="arrow" />
                            <img src="/ms-4/Vector (3).png" alt="clock" className="w-4 h-4" />
                            <span>{event.endDate}</span>
                        </div>
                        
                </div>
            </div>

            {/* ❌ Message for normal users */}
            {userRole !== "creator" && event.status === "Active" && (
                <div className="w-full flex justify-end mb-4">
                    <div className="
      max-w-[320px] w-full sm:w-auto
      px-4 py-2 rounded-xl 
      border border-yellow-500/30 
      bg-yellow-500/10 
      text-yellow-400 text-xs sm:text-sm
      text-center sm:text-right
    ">
                        Only Creators can participate in this event.
                    </div>
                </div>
            )}


            {/* Tabs */}
            <div className="bg-[#0F0F0F] border border-[#18181B] rounded-xl flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-lg mb-6 overflow-x-auto no-scrollbar w-full sm:w-fit">
                {["overview", "entries", "rewards"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap transition font-medium ${activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        {tab === "overview" ? "Overview" : tab === "entries" ? `Entries (${entries.length})` : "Rewards"}
                    </button>
                ))}
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
                <>
                    <div className="bg-[#0F0F0F] border border-[#18181B] rounded-xl px-4 sm:px-6 py-8 mb-6">
                        <h2 className="text-base sm:text-xl font-semibold mb-2">About This Contest</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Submit your best digital artwork for a chance to win exclusive rewards
                            and get featured on our platform.
                        </p>
                    </div>

                    <div className="bg-[#0F0F0F] border border-[#18181B] rounded-xl px-4 sm:px-6 py-5 mb-4">
                        <h2 className="text-base sm:text-xl font-semibold mb-3">Contest Rules</h2>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            {rules.map((rule, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-xl leading-[1]">•</span>
                                    <span className="text-gray-300">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* Entries */}
            {activeTab === "entries" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4">
                    {entries.length > 0 ? entries.map((entry) => (
                        <div key={entry.id} className="bg-[#0F0F0F] border border-[#18181B] rounded-xl overflow-hidden transition-shadow hover:shadow-[0_0_15px_#06b6d4]">
                            <img src={entry.thumbnail} alt={entry.title} className="pt-4 w-full h-48 sm:h-56 md:h-60 object-contain" />
                            <div className="p-4 flex flex-col gap-1">
                                <h3 className="font-semibold text-white text-base sm:text-lg">{entry.title}</h3>
                                <p className="text-gray-400 text-sm">by {entry.creator}</p>
                                <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs sm:text-sm">
                                    <img src="/ms-4/heart2.png" alt="likes" className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>0 Likes</span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-400 text-sm col-span-full">No entries yet.</p>
                    )}
                </div>
            )}

            {/* Rewards */}
            {activeTab === "rewards" && (
                <div className="space-y-4 mb-4">
                    {rewards.map((reward) => (
                        <div key={reward.id} className="flex items-center gap-3 sm:gap-4 border border-[#18181B] bg-[#0F0F0F] rounded-xl p-3 sm:p-4">
                            <img src={reward.img} alt={reward.title} className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-contain" />
                            <div>
                                <h3 className="font-semibold text-white text-sm sm:text-md">{reward.title}</h3>
                                <p className="text-gray-400 text-xs sm:text-sm">{reward.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Leaderboard */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl px-3 sm:px-6 py-3 mb-8 mt-17">
                <button className="flex items-center justify-center gap-2 w-full text-white hover:text-gray-300 rounded-xl text-xs sm:text-sm font-medium">
                    <img src="/ms-4/trophy (2).png" alt="leaderboard" className="w-4 h-4 sm:w-5 sm:h-5" />
                    View Leaderboard
                </button>
            </div>

            {/* Footer Note */}
            <div className="border border-[#18181B] bg-[#0F0F0F] rounded-xl py-6 sm:py-8 text-center text-gray-400 text-xs sm:text-sm">
                🎉 Winners will be auto-published via connected social accounts
            </div>

            {/* Participate Modal */}
            {showModal && event.status === "Active" && (
                <SubmitEntryModal
                    eventId={id}
                    onClose={() => setShowModal(false)}
                    onSuccess={handleNewEntry} // Pass the callback to add new entry
                />
            )}
        </div>
    );
}
