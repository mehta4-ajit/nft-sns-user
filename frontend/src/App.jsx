import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your ready components
import ProfileSettings from "./profile.jsx";
import Wallets from "./wallets.jsx";
import Login from "./login.jsx";
import RegisterPage from "./register.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path = "/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/profile" element={<ProfileSettings />} />

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
