import React from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-8">페이지 리스트</h1>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          <Link to="/login" className="text-blue-500 hover:underline">Login Page</Link>
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          <Link to="/wallets" className="text-blue-500 hover:underline">Wallet</Link>
          <Link to="/profile" className="text-blue-500 hover:underline">Profile Page</Link>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          <Link to="/feed" className="text-blue-500 hover:underline">Feed</Link>
          <Link to="/uploadnft" className="text-blue-500 hover:underline">Upload NFT</Link>
          <Link to="/nftmodals" className="text-blue-500 hover:underline">NFT Modals</Link>
          <Link to="/mynft" className="text-blue-500 hover:underline">My NFTs Page</Link>
        </div>

        <div className='flex flex-col'>
          <Link to="/feed" className="text-blue-500 hover:underline">Feed</Link>
          <Link to="/districomplete" className="text-blue-500 hover:underline col-span-2 mt-4">Distribution Page</Link>
          <Link to="/sharemodal" className="text-blue-500 hover:underline col-span-2 mt-4">ShareModal Page</Link>
          <Link to="/detail" className="text-blue-500 hover:underline col-span-2 mt-4">NFT details Page</Link>
          <Link to="/distribution1" className="text-blue-500 hover:underline col-span-2 mt-4">Distribution Part1</Link>
          <Link to="/distribution2" className="text-blue-500 hover:underline col-span-2 mt-4">Distribution Part2</Link>
        </div>

      </div>
    </div>
  );
}
