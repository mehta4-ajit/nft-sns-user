// ProfileSettings.jsx
import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar.jsx";
import AnimatedAlert from "./Alertanimated.jsx";

const API_BASE = "http://localhost:5000";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    twitter: "",
    instagram: "",
    website: "",
    id: null,
    UserWallets: [],   // ✅ ADD THIS
  });

  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const authHeaders = (json = true) => {
    const headers = {};
    if (json) headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  // Helper: show alert for x seconds
  const fireAlert = (name, ms = 3000) => {
    setAlert(name);
    setTimeout(() => setAlert(null), ms);
  };

  // -------------------------
  // FETCH PROFILE DATA
  // -------------------------
  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${API_BASE}/api/user/profile`, {
          method: "GET",
          headers: authHeaders(false),
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        const p = data.profile || data;

        if (!mounted) return;

        setProfile((prev) => ({
          ...prev,
          displayName: p.full_name || p.displayName || "",
          bio: p.bio || "",
          twitter: p.twitter || "",
          instagram: p.instagram || "",
          website: p.website || "",
          id: p.id || prev.id,
          UserWallets: p.UserWallets || [],  // ✅ ADD THIS
        }));

        setLoading(false);
      } catch (err) {
        console.error("Fetch profile error:", err);
        if (mounted) {
          fireAlert("failedFetch");
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [token, navigate]);

  // -------------------------
  // HANDLE INPUT CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------
  // SAVE PROFILE
  // -------------------------
  const handleSave = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setSaving(true);

    try {
      const body = {
        full_name: profile.displayName,
        bio: profile.bio,
        twitter: profile.twitter,
        instagram: profile.instagram,
        website: profile.website,
      };

      const res = await fetch(`${API_BASE}/api/user/profile`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to save profile");
      }

      fireAlert("profileSaved");
      setIsEditing(false);
    } catch (err) {
      console.error("Save profile error:", err);
      fireAlert("failedSave");
    } finally {
      setSaving(false);
    }
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /// -------------------------
// DISCONNECT WALLET
// -------------------------
const handleDisconnectWallet = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/wallet/disconnect`, {
      method: "PATCH",
      headers: authHeaders(false),
    });

    if (!res.ok) {
      fireAlert("failedDisconnect");
      return;
    }

    // Remove active wallet from state
    setProfile((prev) => ({
      ...prev,
      UserWallets: prev.UserWallets.map(w => ({ ...w, is_active: false })), // mark all wallets inactive
    }));

    fireAlert("walletDisconnected");
  } catch (err) {
    console.error("Disconnect wallet error:", err);
    fireAlert("failedDisconnect");
  }
};


  if (loading) return <div className="text-white p-6">Loading profile...</div>;

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      <div className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile Settings</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage your creator profile and settings</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-md border border-[#18181B] bg-[#09090B4D] text-white font-semibold hover:bg-[#1a1a1a]"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-2 rounded-md bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black font-semibold hover:opacity-90 flex items-center gap-2"
                  disabled={saving}
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 rounded-md bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black font-semibold hover:opacity-90 flex items-center gap-2"
              >
                <img src="Edit.png" alt="Edit" className="w-5 h-5 object-contain" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center shadow-md border border-[#18181B]">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#111111] flex items-center justify-center overflow-hidden">
                <img src="avatarusrer 1.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
              <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">{profile.displayName || "Creator Name"}</h2>
              <p className="text-gray-400 text-sm">Creator</p>
            </div>

            {/* Stats */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 space-y-3 shadow-md border border-[#18181B]">
              <h3 className="text-sm font-semibold text-white uppercase">Stats</h3>
              <div className="text-sm text-gray-300">
                <div className="flex justify-between"><span>NFTs Created</span><span className="font-semibold">42</span></div>
                <div className="flex justify-between mt-2"><span>Likes Received</span><span className="font-semibold">1284</span></div>
                <div className="flex justify-between mt-2"><span>Ranking</span><span className="font-semibold">#156</span></div>
              </div>
            </div>

            {/* Wallet */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 space-y-3 shadow-md border border-[#18181B]">
              <h3 className="text-sm font-semibold text-white uppercase flex items-center gap-2">
                <img src="Vector.png" alt="Wallet" className="w-4 h-4 object-contain" />
                Wallet
              </h3>

              {(() => {
                // Find active wallet
                const activeWallet = profile.UserWallets?.find(w => w.is_active);

                if (activeWallet) {
                  // Wallet is connected
                  return (
                    <>
                      <p className="text-sm text-gray-300">Connected Wallet:</p>
                      <p className="text-sm font-mono text-cyan-400 break-all">
                        {activeWallet.address}
                      </p>
                      <button
                        onClick={handleDisconnectWallet}
                        className="w-full mt-3 px-4 py-2 rounded-md border border-red-500 text-red-500 font-semibold hover:bg-red-500/10"
                      >
                        Disconnect Wallet
                      </button>
                    </>
                  );
                } else {
                  // No wallet connected
                  return (
                    <>
                      <p className="text-sm text-gray-300">No wallet connected</p>
                      <button
                        onClick={() => navigate("/wallets")}
                        className="w-full mt-3 px-4 py-2 rounded-md bg-gradient-to-r from-[#24CBF5] to-[#9952E0] text-black font-semibold"
                      >
                        Connect Wallet
                      </button>
                    </>
                  );
                }
              })()}
            </div>

            {/* Social Distribution */}
            <div className="bg-[#13131680] rounded-xl p-5 sm:p-6 space-y-3 shadow-md border border-[#18181B]">
              <h3 className="text-sm font-semibold text-white">Social Distribution</h3>
              <p className="text-gray-400 text-sm">Manage your social media integrations and automated content distribution.</p>
              <button className="mt-3 px-3 py-2 rounded-md border border-[#18181B] bg-[#09090B4D] text-white text-sm">Manage Connections</button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 bg-[#13131680] rounded-xl p-5 sm:p-8 space-y-6 shadow-md border border-[#18181B]">
            <h3 className="text-lg font-semibold text-white">Profile Information</h3>

            {/* Display Name */}
            <div>
              <label className="block text-sm text-white mb-1">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={profile.displayName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 focus:outline-none ${isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"}`}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm text-white mb-1">Bio / About</label>
              <textarea
                name="bio"
                rows="3"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 resize-none ${isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"}`}
              />
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm text-white uppercase mb-4 sm:mb-6">Social Links</h4>
              <div className="space-y-4">
                <input
                  type="url"
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/your"
                  disabled={!isEditing}
                  className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 ${isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"}`}
                />
                <input
                  type="url"
                  name="instagram"
                  value={profile.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/your"
                  disabled={!isEditing}
                  className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 ${isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"}`}
                />
                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://your-website.com"
                  disabled={!isEditing}
                  className={`w-full bg-[#09090B4D] border border-[#18181B] rounded-md px-3 py-2 text-sm sm:text-base text-gray-300 ${isEditing ? "focus:border-[#9952E0]" : "opacity-60 cursor-not-allowed"}`}
                />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-4 border-t border-[#18181B]">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-md text-white font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Box */}
      {alert && (
        <AnimatedAlert
          type={
            alert === "profileSaved" || alert === "walletDisconnected"
              ? "success"
              : "error"
          }
          message={
            alert === "profileSaved"
              ? "Your profile changes have been saved."
              : alert === "walletDisconnected"
                ? "Wallet disconnected successfully."
                : alert === "failedFetch"
                  ? "Could not load profile. Refresh or try later."
                  : alert === "failedSave"
                    ? "Could not save changes. Try again."
                    : alert === "failedDisconnect"
                      ? "Could not disconnect wallet. Try again."
                      : "Something went wrong."
          }
          onClose={() => setAlert(null)}
        />

      )}

    </div>
  );
}
