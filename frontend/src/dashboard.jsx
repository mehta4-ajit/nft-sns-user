import React, { useState } from "react";

const Dashboard = () => {
    // ------------------- DYNAMIC DATA -------------------
    const stats = [
        {
            label: "My NFTs",
            value: 24,
            icon: "ms-5/right.png",
            bg: "bg-gradient-to-r from-[#06B6D433] to-[#3B82F633]",
        },
        {
            label: "For Sale",
            value: 8,
            icon: "/ms-5/right (1).png",
            bg: "bg-gradient-to-r from-[#A855F733] to-[#EC489933]",
        },
        {
            label: "Total Sales",
            value: "2.45 ETH",
            icon: "ms-5/right (2).png",
            bg: "bg-gradient-to-r from-[#22C55E33] to-[#10B98133]",
        },
        {
            label: "Active Events",
            value: 3,
            icon: "ms-5/right (3).png",
            bg: "bg-gradient-to-r from-[#F9731633] to-[#F59E0B33]",
        },
    ];

    const actions = [
        {
            label: "Upload New NFT",
            icon: "ms-5/upload file (3).png",
            bg: "bg-cyan-400 hover:bg-[#0096c7] text-black",
        },
        {
            label: "List NFT for Sale",
            icon: "ms-5/upload file (1).png",
            bg: "bg-[#a855f7] hover:bg-[#9333ea] text-white",
        },
        {
            label: "Browse NFTs to Buy",
            icon: "ms-5/top (1).png",
            bg: "bg-[#0d0d0d] hover:bg-[#374151] text-white",
        },
        {
            label: "Join Event",
            icon: "ms-5/top (2).png",
            bg: "bg-[#0d0d0d] hover:bg-[#374151] text-white",
        },
    ];

    const listingsData = [
        {
            title: "Galaxy Cat",
            price: "Ξ 0.25",
            status: "Active",
            statusColor: "bg-green-400/20 text-green-300 border border-green-400",
            linkIcon: "ms-5/Vector (6).png",
            editIcon: "ms-5/editBtn.png",
            deleteIcon: "ms-5/dltbtn.png",
        },
        {
            title: "Galaxy Cat",
            price: "Ξ 0.25",
            status: "Sold",
            statusColor: "bg-gray-600/50 text-white/70",
            linkIcon: "ms-5/Vector (6).png",
            editIcon: "",
            deleteIcon: "",
        },
    ];

    const [activeTab, setActiveTab] = useState("listings");

    return (
        <div className="bg-black text-white min-h-screen p-4 sm:p-6 font-sans">

            {/* --------------------- HEADER --------------------- */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-cyan-400">
                    Welcome, Creator <span>👋</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Wallet: <span className="text-white">0xA2f5...9C3</span>
                </p>
            </div>

            {/* --------------------- STATS SECTION --------------------- */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-9">

                {stats.map((item, i) => (
                    <div key={i} className={`${item.bg} p-5 sm:p-7 rounded-xl`}>
                        <div className="flex items-center gap-2 justify-between">
                            <p className="text-gray-300 text-sm sm:text-lg">{item.label}</p>
                            <img src={item.icon} className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <h2 className="text-xl sm:text-3xl font-bold mt-2">{item.value}</h2>
                    </div>
                ))}

            </div>

            {/* --------------------- QUICK ACTIONS --------------------- */}
            <div className="bg-[#13131680] rounded-xl p-4 sm:p-5 mb-8 border border-cyan-800/30">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {actions.map((action, i) => (
                        <button
                            key={i}
                            className={`${action.bg} font-medium py-4 sm:py-5 rounded-lg flex flex-col items-center justify-center gap-2 border border-[#1F1F23]`}
                        >
                            <img src={action.icon} className="w-5 h-5 object-contain" />
                            <span className="text-xs sm:text-sm text-center">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* --------------------- TRADING OVERVIEW --------------------- */}
            <div className="bg-[#13131680] rounded-xl border border-cyan-800/30 p-4 sm:p-5">
                
                <h2 className="text-xl font-semibold mb-4">Trading Overview</h2>

                {/* TABS */}
                <div className="flex items-center gap-3 sm:gap-5 p-1 mb-5 rounded-lg w-fit bg-gray-400/20">
                    <button
                        onClick={() => setActiveTab("listings")}
                        className={`px-6 sm:px-12 py-1 font-small text-sm sm:text-base rounded-md ${
                            activeTab === "listings"
                                ? "bg-[#0d0d0d] text-white"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        My Listings
                    </button>

                    <button
                        onClick={() => setActiveTab("purchases")}
                        className={`px-6 sm:px-12 py-1 font-small text-sm sm:text-base rounded-md ${
                            activeTab === "purchases"
                                ? "bg-[#0d0d0d] text-white"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        My Purchases
                    </button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-left text-gray-300 min-w-[600px]">
                        <thead className="text-gray-400 border-b border-gray-700 text-sm sm:text-base">
                            <tr>
                                <th className="py-2">NFT Title</th>
                                <th className="py-2">Price (MATIC)</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">View on Polygon</th>
                                <th className="py-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listingsData.map((item, i) => (
                                <tr key={i} className="border-b border-gray-800 text-sm sm:text-base">
                                    <td className="py-3">{item.title}</td>

                                    <td className="py-3">{item.price}</td>

                                    <td className="py-3">
                                        <span
                                            className={`${item.statusColor} text-xs sm:text-sm px-3 py-0.5 rounded-2xl`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="py-3">
                                        <img
                                            src={item.linkIcon}
                                            className="w-4 h-4 cursor-pointer"
                                        />
                                    </td>

                                    <td className="py-3 space-x-3">
                                        {item.status !== "Sold" && (
                                            <>
                                                <img
                                                    src={item.editIcon}
                                                    className="inline-block w-4 sm:w-5 cursor-pointer"
                                                />
                                                <img
                                                    src={item.deleteIcon}
                                                    className="inline-block w-4 sm:w-5 cursor-pointer"
                                                />
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
