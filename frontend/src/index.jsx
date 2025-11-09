import React from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Available Pages</h1>
      <div className="flex flex-col gap-3">
        <Link to="/login" className="text-blue-500 hover:underline">Login Page</Link>
        <Link to="/wallets" className="text-blue-500 hover:underline">Wallet</Link>
        <Link to="/profile" className="text-blue-500 hover:underline">Profile Page</Link>
        <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
      </div>
    </div>
  );
}