import React from "react";
import SocialIntegration from "./distribution";
import DistributionDashboard from "./distributiondashboard";
import Navbar from "./navbar";

export default function DistributionPage() {
  return (
    <>
    
    <div className="bg-[#0d0d0d] min-h-screen text-white ">
      <Navbar/>
      {/* ===== Top: Social Integration Section ===== */}
      <SocialIntegration/>

      {/* ===== Bottom: Distribution Dashboard Section ===== */}
     <DistributionDashboard/>
    </div>
    </>
  );
}