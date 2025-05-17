import { useEffect, useState } from "react";
import SetProfile from "../components/SetProfile";
import StatsCardPlus from "../components/StatsCardPlus";

export default function Profil() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState(null);

  // 1️⃣ Načti přezdívku z localStorage při načtení stránky
  useEffect(() => {
    const saved = localStorage.getItem("playerName");
    if (saved) {
      setNickname(saved);
      fetchPlayerData(saved);
    }
  }, []);

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minut

  // 2️⃣ Funkce pro načtení dat hráče z API
  const fetchPlayerData = async (name) => {
    setLoading(true);
    
    try {
      const cached = localStorage.getItem(`playerData-${name}`);
      
      if (cached) {
        const parsed = JSON.parse(cached);
        const now = Date.now();
  
        if (now - parsed.timestamp < CACHE_DURATION) {
          setPlayerData(parsed.data);
          setLoading(false);
          return;
        }
      }
  
      // Pokud nejsou platná cache, fetchni nová data
      const statsRes = await fetch(`http://localhost:3001/api/faceit/stats/${name}`);
      const stats = await statsRes.json();
      const matchesRes = await fetch(`http://localhost:3001/api/faceit/matches/${name}`);
      const matches = await matchesRes.json();
      const overviewRes = await fetch(`http://localhost:3001/api/faceit/overview/${name}`);
      const overview = await overviewRes.json();
      const graphRes = await fetch(`http://localhost:3001/api/faceit/playerGraphs/${name}`);
      const graph = await graphRes.json();
  
      const fullData = { stats, matches, overview, graph };
  
      // Ulož do localStorage s časovou značkou
      localStorage.setItem(
        `playerData-${name}`,
        JSON.stringify({ timestamp: Date.now(), data: fullData })
      );
  
      setPlayerData(fullData);
    } catch (err) {
      console.error("Chyba při načítání hráče:", err);
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Funkce, když SetProfile uloží jméno
  const handleSetProfile = (newName) => {
    localStorage.setItem("playerName", newName);
    setNickname(newName);
    fetchPlayerData(newName);
  };

  // 4️⃣ Funkce pro nové hledání
  const resetSearch = () => {
    setPlayerData(null);
    setNickname(null);
    localStorage.removeItem("playerName");
    if (nickname) {
      localStorage.removeItem(`playerData-${nickname}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] px-4">
      {!nickname && (
        <SetProfile onSetProfile={handleSetProfile} />
      )}
      {nickname && !playerData && loading && (
        <p className="text-white">Načítám hráče...</p>
      )}
      {playerData && (
          <div className="">
            <StatsCardPlus playerData={playerData} onSearchAgain={resetSearch} />
          </div>
      )}
    </div>
  );
}
