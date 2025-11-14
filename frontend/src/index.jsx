import React from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-8">페이지 리스트</h1>

      {/* ONE SINGLE ROW */}
      <div className="flex gap-20 overflow-x-auto pb-6 w-full justify-center">

        {/* Milestone 1 */}
        <div className="flex flex-col gap-3 min-w-[180px] text-center">
           <h1 className='mb-4 font-bold'>Milestone - 1</h1>
          <Link to="/login" className="text-blue-500 hover:underline">Login Page</Link>
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          <Link to="/wallets" className="text-blue-500 hover:underline">Wallet</Link>
          <Link to="/profile" className="text-blue-500 hover:underline">Profile Page</Link>
        </div>

        {/* Milestone 2 */}
        <div className="flex flex-col gap-3 min-w-[180px] text-center">
           <h1 className='mb-4 font-bold'>Milestone - 2</h1>
          <Link to="/feed" className="text-blue-500 hover:underline">Feed</Link>
          <Link to="/uploadnft" className="text-blue-500 hover:underline">Upload NFT</Link>
          <Link to="/nftmodals" className="text-blue-500 hover:underline">NFT Modals</Link>
          <Link to="/mynft" className="text-blue-500 hover:underline">My NFTs Page</Link>
        </div>

        {/* Milestone 3 */}
        <div className="flex flex-col gap-3 min-w-[180px] text-center">
           <h1 className='mb-4 font-bold'>Milestone - 3</h1>
          <Link to="/feed" className="text-blue-500 hover:underline">Feed</Link>
          <Link to="/districomplete" className="text-blue-500 hover:underline mt-4">Distribution Page</Link>
          <Link to="/sharemodal" className="text-blue-500 hover:underline mt-4">ShareModal Page</Link>
          <Link to="/detail" className="text-blue-500 hover:underline mt-4">NFT details Page</Link>
          <Link to="/distribution1" className="text-blue-500 hover:underline mt-4">Distribution Part1</Link>
          <Link to="/distribution2" className="text-blue-500 hover:underline mt-4">Distribution Part2</Link>
        </div>

        {/* Milestone 4 */}
        <div className="flex flex-col gap-3 min-w-[180px] text-center">
           <h1 className='mb-4 font-bold'>Milestone - 4</h1>
          <Link to="/events" className="text-blue-500 hover:underline">Events Page</Link>
          <Link to="/eventdetailpg" className="text-blue-500 hover:underline mt-4">Event Detail Page</Link>
          <Link to="/participate" className="text-blue-500 hover:underline mt-4">Participate Page</Link>
          <Link to="/leaderboard" className="text-blue-500 hover:underline mt-4">Leaderboard Page</Link>
        </div>

        {/* Milestone 5 */}
        <div className="flex flex-col gap-3 min-w-[180px] text-center mb-10">
          <h1 className='mb-4 font-bold'>Milestone - 5</h1>
          <Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
          <Link to="/nftlist" className="text-blue-500 hover:underline mt-4">NFT List</Link>
          <Link to="/marketplace" className="text-blue-500 hover:underline mt-4">Marketplace</Link>
          <Link to="/buy" className="text-blue-500 hover:underline mt-4">Buy NFT</Link>
        </div>

      </div>
    </div>
  );
}
