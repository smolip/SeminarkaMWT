import { useState } from "react";
import { Search } from "lucide-react";

export default function SearcPlayer() {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      setPlayerData({ nickname, level: 10, elo: 2430 });
      setLoading(false);
    }, 1000);
  };

  return (
      <div className="p-6 rounded-2xl shadow-xl w-full max-w-xl bg-[#1E1E1E]">
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
            <Search size={18} />
          </button>
        </div>
      </div>
  );
}
