import React, { useState, useEffect } from "react";
import { BASE_URL } from "./config";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function Events() {
    const [activeTab, setActiveTab] = useState("Active");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // change per page count
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(`${BASE_URL}/api/events`);
                const data = await response.json();

                const list = Array.isArray(data.events) ? data.events : [];

                const formatted = list.map((ev) => ({
                    id: ev.id,
                    title: ev.title,
                    description: ev.description,
                    startDate: ev.join_start ? formatDate(ev.join_start) : "",
                    endDate: ev.join_end ? formatDate(ev.join_end) : "",
                    status: ev.status === 1 ? "Active" : "Closed",
                    cover: ev.url_image_big || "/ms-4/imgwrapper.png",
                }));

                setEvents(formatted);
                setTotalPages(Math.ceil(formatted.length / itemsPerPage));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }

    // Filter events based on tab
    const filteredEvents =
        activeTab === "All Events"
            ? events
            : events.filter((ev) => ev.status === activeTab);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    useEffect(() => {
        setTotalPages(Math.ceil(filteredEvents.length / itemsPerPage));
        setCurrentPage(1); // reset page when tab changes
    }, [activeTab, filteredEvents.length]);

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-8 py-8">
            {/* Header Section */}
            <div className="mb-7">
                <h1 className="text-3xl font-semibold mb-1 glow">Events & Contests</h1>
                <p className="text-gray-400 text-sm">
                    Participate in contests, showcase your creativity, and win exclusive rewards
                </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 mb-8 border-b border-[#1F1F23] pb-3 text-sm">
                {["All Events", "Active", "Closed"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-md transition ${activeTab === tab
                            ? "bg-cyan-500 text-black font-semibold"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-gray-400 text-center py-10">Loading events...</div>
            )}

            {/* Events Grid */}
            {!loading && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {currentEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-[#131316] border border-[#1F1F23] rounded-2xl overflow-hidden shadow-lg flex flex-col transition hover:shadow-cyan-500/10 hover:border-cyan-600/40"
                            >
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={event.cover}
                                        alt={event.title}
                                        className="w-full h-48 sm:h-56 object-fit"
                                    />
                                    <span
                                        className={`absolute top-3 right-3 flex items-center justify-center text-sm font-semibold pt-0.5 px-4 rounded-full border ${event.status === "Active"
                                            ? "text-green-400 border-green-500 bg-green-500/20"
                                            : "text-gray-400 border-gray-500 bg-gray-800/50"
                                            }`}
                                    >
                                        {event.status}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h2 className="text-[25px] font-semibold mb-1">{event.title}</h2>
                                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-10">
                                            <img src="ms-4/Vector (2).png" alt="calendar" className="w-4 h-4" />
                                            <span>{event.startDate}</span>
                                            <img src="ms-4/Vector (4).png" alt="arrow" />
                                            <img src="ms-4/Vector (3).png" alt="clock" className="w-4 h-4" />
                                            <span>{event.endDate}</span>
                                        </div>

                                        <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                                    </div>

                                    {/* Buttons + Icons */}
                                    <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={() => navigate(`/viewdetail/${event.id}`)}
                                                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm px-4 py-2 rounded-lg"
                                            >
                                                View Details
                                            </button>

                                            <button className="flex items-center gap-1 bg-[#1A1A1D] border border-[#2A2A2A] text-white hover:bg-[#222225] text-sm px-4 py-2 rounded-lg">
                                                <img
                                                    src="/ms-4/trophy (2).png"
                                                    alt="trophy"
                                                    className="w-5 h-5 object-contain"
                                                />
                                                Leaderboard
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <img
                                                src="ms-4/iconDev (4).png"
                                                alt="twitter"
                                                className="w-11 h-11 sm:w-12 sm:h-12 brightness-125 hover:brightness-150 hover:scale-110 transition-transform duration-200"
                                            />
                                            <img
                                                src="ms-4/iconDev (5).png"
                                                alt="instagram"
                                                className="w-11 h-11 sm:w-12 sm:h-12 brightness-125 hover:brightness-150 hover:scale-110 transition-transform duration-200"
                                            />
                                            <img
                                                src="ms-4/iconDev (6).png"
                                                alt="youtube"
                                                className="w-6 h-6 sm:w-7 sm:h-7 brightness-110 hover:brightness-125 hover:scale-105 transition-transform duration-200"
                                            />
                                            <img
                                                src="ms-4/iconDev (7).png"
                                                alt="tiktok"
                                                className="w-6 h-6 sm:w-7 sm:h-7 brightness-110 hover:brightness-125 hover:scale-105 transition-transform duration-200"
                                            />
                                            <img
                                                src="ms-4/iconDev (8).png"
                                                alt="discord"
                                                className="w-6 h-6 sm:w-7 sm:h-7 brightness-110 hover:brightness-125 hover:scale-105 transition-transform duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-4 mt-10">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-800 rounded-md text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-gray-400 py-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-800 rounded-md text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Footer */}
            <div className="border border-[#18181B] bg-[#131316] rounded-xl py-8 text-center text-gray-400 text-xs sm:text-sm mt-8">
                🎉 Winners will be auto-published via connected social accounts
            </div>
        </div>
        </>
    );
}
