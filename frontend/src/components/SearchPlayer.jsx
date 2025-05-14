import { useState } from "react";
import { Search } from "lucide-react";
import PlayerProfile from "./StatsCard";

export default function SearchPlayer({ onFoundPlayer }) {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      setPlayerData({ nickname, level: 10, elo: 2430 });
      setLoading(false);
      if (onFoundPlayer) onFoundPlayer();
    }, 1000);
  };

  return (
    <>
      {playerData ? (
        <div className="p-6 rounded-2xl shadow-md w-full max-w-xl bg-[#1E1E1E]">
          <PlayerProfile />
        </div>
      ) : (
        <div className="p-6 rounded-2xl shadow-md w-full max-w-xl bg-[#1E1E1E]">
          <h1 className="text-2xl font-bold mb-4 text-[#FF5500]"> Vyhledat hráče</h1>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Zadej Faceit přezdívku..."
              className="flex-1 p-3 rounded-lg focus:outline-none placeholder-opacity-70"
              style={{
                backgroundColor: "#2C2C2C",
                color: "#E0E0E0",
                border: "none",
              }}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              disabled={loading || !nickname}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition"
              style={{
                backgroundColor: "#FF5500",
                color: "#ffffff",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#CC4400")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FF5500")}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                <Search size={18} />
              )}
            </button>
          </div>
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <span className="text-orange-500 animate-pulse">Načítám data hráče...</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
