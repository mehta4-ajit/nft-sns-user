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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wallets" element={<Wallets/>} />
        <Route path="/uploadnft" element={<UploadMintNFT/>} />
        <Route path="/nftmodals" element={<NFTMintPage/>} />
        <Route path="/mynft" element={<MyNFTsPage/>} />
        <Route path="/feed" element={<NFTDashboard/>} />
        <Route path="/distribution1" element={<SocialIntegration/>} />
        <Route path="/distribution2" element={<DistributionDashboard/>} />
        <Route path="/districomplete" element={<DistributionPage/>} />
        <Route path="/sharemodal" element={<ShareModal/>} />
        <Route path="/detail" element={<NFTDisplay/>} />

      </Routes>
    </Router>
  );
}

export default App;
