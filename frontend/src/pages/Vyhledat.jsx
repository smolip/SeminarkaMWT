import { useState } from "react";
import SearchPlayer from "../components/SearchPlayer";
import PlayerProfile from "../components/StatsCard";

export default function Vyhledat() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] mx-auto">
      {playerData ? (
        <PlayerProfile
          playerData={playerData}
          onSearchAgain={() => setPlayerData(null)}
        />
      ) : (
        <SearchPlayer
          onFoundPlayer={setPlayerData}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}


