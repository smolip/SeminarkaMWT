import { useState } from "react";
import SearchPlayer from "../components/SearchPlayer";
import PlayerProfile from "../components/StatsCard"; 
import PlayerProfilePlus from "../components/StatsCardPlus";


export default function Vyhledat() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showStatsPlus, setShowStatsPlus] = useState(false);

  const handleShowMoreStats = () => {
    setShowStatsPlus(true);
  };

  const handleSearchAgain = () => {
    setPlayerData(null);
    setShowStatsPlus(false); // Resetujeme showStatsPlus při novém hledání
  };


  let contentToRender;

  if (playerData) {
    if (showStatsPlus) {
      contentToRender = (
        <PlayerProfilePlus
          playerData={playerData}
          onSearchAgain={handleSearchAgain} 
          buttonText="Hledat znovu"
        />
      );
    } else {
      // Máme data hráče, ale showStatsPlus je false
      contentToRender = (
        <PlayerProfile
          playerData={playerData}
          onSearchAgain={handleSearchAgain} 
          onShowMoreStats={handleShowMoreStats}
        />
      );
    }
  } else {
    contentToRender = (
      <SearchPlayer
        onFoundPlayer={setPlayerData}
        loading={loading}
        setLoading={setLoading}
      />
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] mx-auto">
      {contentToRender}
    </div>
  );
}