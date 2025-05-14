import { useState } from "react";
import SearchPlayer from "../components/SearchPlayer";
import PlayerProfile from "../components/StatsCard";

export default function Vyhledat() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center pt-18 bg-[#121212] max-w-2xl mx-auto">
      {showProfile ? (
        <PlayerProfile onSearchAgain={() => setShowProfile(false)} />
      ) : (
        <SearchPlayer onFoundPlayer={() => setShowProfile(true)} />
      )}
    </div>
  );
}


