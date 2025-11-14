import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components
import ProfileSettings from "./profile.jsx";
import Wallets from "./wallets.jsx";
import Login from "./login.jsx";
import RegisterPage from "./register.jsx";
import IndexPage from "./index.jsx";
import UploadMintNFT from "./UploadNFT.jsx";
import NFTMintPage from "./nftmodals.jsx";
import MyNFTsPage from "./mynft.jsx";
import NFTDashboard from "./feed.jsx";
import SocialIntegration from "./distribution.jsx";
import DistributionDashboard from "./distributiondashboard.jsx";
import DistributionPage from "./distributioncomplete.jsx";
import ShareModal from "./sharemodal.jsx";
import NFTDisplay from "./detailsnft.jsx";
import ContestLeaderboard from "./leaderboard.jsx";
import Events from "./events.jsx";
import ContestDetails from "./eventdetailpg.jsx";
import NFTSubmitModal from "./participate.jsx";
import Dashboard from "./dashboard.jsx";
import NFTMarketplace from "./marketplace.jsx";
import NftDetails from "./buynft.jsx";
import ListNFTForSale from "./listnft.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/uploadnft" element={<UploadMintNFT />} />
        <Route path="/nftmodals" element={<NFTMintPage />} />
        <Route path="/mynft" element={<MyNFTsPage />} />
        <Route path="/feed" element={<NFTDashboard />} />
        <Route path="/distribution1" element={<SocialIntegration />} />
        <Route path="/distribution2" element={<DistributionDashboard />} />
        <Route path="/districomplete" element={<DistributionPage />} />
        <Route path="/sharemodal" element={<ShareModal />} />
        <Route path="/detail" element={<NFTDisplay />} />
        <Route path="/leaderboard" element={<ContestLeaderboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/eventdetailpg" element={<ContestDetails />} />
        <Route path="/participate" element={<NFTSubmitModal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<NFTMarketplace />} />
        <Route path="/buy" element={<NftDetails
          nft={{
            title: "Cosmic Dreams #42",
            image: "/ms-5/Frame 13 (buy).png",
            creatorAddress: "0xA2f5...9C3",
            priceValue: "0.25",
            currency: "MATIC",
            category: "Digital Art",
            tokenId: "1247",
            chain: "Polygon",
            mintDate: "11-23-2024",
            description:
              "A vibrant digital artwork showcasing cosmic phenomena and abstract dreamscapes.",
            address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
          }}
        />} />

        <Route path = "/nftlist"  element = {<ListNFTForSale/>}/>
      </Routes>
    </Router>
  );
}

export default App;
