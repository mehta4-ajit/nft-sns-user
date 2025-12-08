import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your ready components
import ProfileSettings from "./profile.jsx";
import Wallets from "./wallets.jsx";
import Login from "./login.jsx";
import RegisterPage from "./register.jsx";
import VerifyEmailPage from "./VerifyEmailPage.jsx";
import Events from "./events.jsx";
import UploadMintNFT from "./UploadNFT.jsx";
import DistributionPage from "./distributioncomplete.jsx";
import MyNFTsPage from "./mynft.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/upload" element={<UploadMintNFT />} />
        <Route path="/distribution" element={<DistributionPage />} />
        <Route path="/mynft" element={<MyNFTsPage />} />

        {/* Optional: fallback for unknown routes */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
              <h1 className="text-3xl">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
