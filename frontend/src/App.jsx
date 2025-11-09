import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components
import ProfileSettings from "./profile.jsx";
import Wallets from "./wallets.jsx";
import Login from "./login.jsx";
import RegisterPage from "./register.jsx";
import IndexPage from "./index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wallets" element={<Wallets/>} />
      </Routes>
    </Router>
  );
}

export default App;
