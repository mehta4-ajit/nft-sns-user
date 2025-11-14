import React from "react";
import { useNavigate } from "react-router-dom";

const NftDetails = ({ nft }) => {
    const navigate = useNavigate();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(nft.address);
    };

    return (
        <div className="bg-black text-white min-h-screen p-4 sm:p-6 font-sans">

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-cyan-800/30 rounded-lg hover:bg-gray-800 mb-6 w-fit"
            >
                <img src="/ms-5/left arrow.png" className="w-4" />
                Back
            </button>

            {/* MAIN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

                {/* LEFT — NFT IMAGE */}
                <div className="border border-cyan-800/35 rounded-xl p-2 w-full">
                    <img
                        src={nft.image}
                        alt={nft.title}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
                    />
                </div>

                {/* RIGHT PANEL */}
                <div className="flex flex-col w-full">

               <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#24CBF5] via-[#22D3EE] to-[#C084FC] bg-clip-text text-transparent inline-block w-fit">
  {nft.title}
</h1>



                    {/* CREATOR */}
                    <div className="flex items-center gap-2 text-gray-400 mt-3 flex-wrap">
                        <img src="/ms-5/user-ico.png" className="w-4" />
                        <span>Creator:</span>
                        <span className="text-white font-medium break-all">{nft.creatorAddress}</span>
                    </div>

                    {/* PRICE BOX */}
                    <div className="bg-gradient-to-r from-[#06B6D433] to-[#3B82F633] p-5 rounded-xl mt-6 border border-cyan-900/40">
                        <p className="text-gray-300 text-sm mb-2">Current Price</p>

                        <div className="text-2xl sm:text-3xl font-bold flex items-center gap-4">
                            <span>Ξ</span>
                            {nft.priceValue}
                            <span className="text-gray-400 text-sm">{nft.currency}</span>
                        </div>

                        <div className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                            <img src="/ms-5/Ellipse 1.png" className="w-4" />
                            on Polygon
                        </div>
                    </div>

                    {/* BUY BUTTON */}
                    <button className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-lg mt-5 hover:bg-[#00a8c6] flex items-center justify-center gap-2">
                        <img src="/ms-5/buy ico.png" className="w-5 h-5 object-contain" />
                        Buy on Polygon
                    </button>

                    <p className="text-gray-400 text-xs text-center mt-3">
                        After purchase, NFT will appear under My NFTs with "Owned" badge
                    </p>

                    {/* DETAILS BOX */}
                    <div className="mt-10 border border-cyan-800/35 p-5 rounded-xl w-full">
                        <h2 className="text-xl font-semibold mb-4">Details</h2>

                        <div className="flex items-center justify-between py-2 flex-wrap">
                            <span className="text-gray-400">Category</span>
                            <span className="bg-purple-600 text-white text-sm px-4 py-1 rounded-xl font-bold">
                                {nft.category}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-2 flex-wrap">
                            <span className="text-gray-400">Token ID</span>
                            <span className="text-white">{nft.tokenId}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 flex-wrap">
                            <span className="text-gray-400">Chain</span>
                            <span className="text-white">{nft.chain}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 flex-wrap">
                            <span className="text-gray-400">Mint Date</span>
                            <span className="text-white">{nft.mintDate}</span>
                        </div>
                    </div>

                    {/* DESCRIPTION BOX */}
                    <div className="mt-8 border border-cyan-800/35 p-5 rounded-xl w-full">
                        <h2 className="text-xl font-semibold mb-4">Description</h2>

                        <p className="text-gray-300 text-sm mb-4">{nft.description}</p>

                        {/* ADDRESS + COPY */}
                        <div className="flex items-center rounded-lg gap-3 w-full">

                            <div className="flex-1 border border-cyan-400 px-3 py-2 rounded-xl bg-cyan-400/10 overflow-hidden">
                                <span className="text-cyan-400 text-sm truncate block">
                                    {nft.address}
                                </span>
                            </div>

                            <button
                                onClick={copyToClipboard}
                                className="border border-gray-700 rounded-xl p-2 hover:border-cyan-400 transition flex items-center justify-center"
                            >
                                <img src="/ms-5/copy.png" className="w-5 h-5 object-contain" />
                            </button>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default NftDetails;
