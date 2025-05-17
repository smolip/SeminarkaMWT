import { Bookmark, BookmarkCheck, Plus } from "lucide-react";
import { useState, useEffect } from "react"

export default function PlayerProfile({ playerData, onSearchAgain, onShowMoreStats }) {

  const [bookmarked, setBookmarked] = useState(false);

  // Get player details
  const overview = playerData.overview || {};
  const nickname = overview.name ?? "?";
  const avatar = overview.avatar || "https://i.imgur.com/2Fx1bsv.png";
  const level = overview.lvl ?? "?";
  const faceitUrl = overview.f_url;


  useEffect(() => {
    const bookmarkedPlayers = JSON.parse(localStorage.getItem('bookmarkedPlayers')) || [];
    setBookmarked(bookmarkedPlayers.some(player => player.nickname === nickname));
  }, [nickname]);

  
  const handleClick = () => {
    const bookmarkedPlayers = JSON.parse(localStorage.getItem('bookmarkedPlayers')) || [];
    let updatedBookmarks;

    const currentPlayer = {
      nickname: nickname,
      avatar: avatar,
      level: level,
      faceitUrl: faceitUrl,
    };

    if (bookmarked) {
      // Remove player
      updatedBookmarks = bookmarkedPlayers.filter(player => player.nickname !== nickname);
    } else {
      // Add player if not bookmarked
      // Avoid adding duplicate nicknames
      if (!bookmarkedPlayers.some(player => player.nickname === nickname)) {
         updatedBookmarks = [...bookmarkedPlayers, currentPlayer];
      } else {
         updatedBookmarks = bookmarkedPlayers; // No change if already exists
      }
    }
    localStorage.setItem('bookmarkedPlayers', JSON.stringify(updatedBookmarks));
    setBookmarked(prev => !prev); // Toggle
  }


  
  const statsObj = playerData.stats || {};
  const stats = [
    { label: "ELO", value: overview.elo ?? "?" },
    { label: "Win Rate", value: statsObj.wr ?? "?" },
    { label: "K/D Ratio", value: statsObj.avg_kdr ?? "?" },
    { label: "Matches", value: statsObj.m ?? "?" },
  ];
  const matches = (playerData.matches?.segments || []).slice(0, 10);



  return (
      <div className="p-8 text-white bg-[#181818] rounded-xl mt-18">
    
        {/* Profilní karta a statistiky */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Profilní karta */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg flex gap-6 items-center">
            <img
              src={overview.avatar || "https://i.imgur.com/2Fx1bsv.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{overview.name ?? "?"}</h2>
                {(overview.country || statsObj.country || playerData.country) && (
                  <img
                    src={`https://flagcdn.com/w40/${(overview.country || statsObj.country || playerData.country).toLowerCase()}.png`}
                    alt="country"
                    className="w-6 h-auto"
                  />
                )}
              </div>
            </div>
            <span className="ml-auto text-orange-500 font-bold text-xl">
              {overview.lvl ?? "?"}
            </span>
          </div>
    
          {/* Statistiky */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#1E1E1E] p-4 rounded-xl text-center">
                <h4 className="text-gray-400">{stat.label}</h4>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
       
        </div>
    
        {/* Tabulka zápasů */}
        <div className="bg-[#1E1E1E] p-6 rounded-xl mb-6">
          <h3 className="text-orange-500 font-semibold mb-4">Poslední 10 zápasů</h3>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-[#2C2C2C]">
              <tr>
                <th className="py-2">Date</th>
                <th>Map</th>
                <th>Result</th>
                <th>K/D</th>
                <th className="px-5">ELO</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-white">
              {matches.map((match, i) => (
                <tr key={i} className="border-b border-[#2C2C2C]">
                  <td className="py-2">
                    {match.date || match.created_at
                      ? new Date(match.created_at || match.date).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{match.map}</td>
                  <td
                    className={`${
                      match.w === 1 || match.w === "1"
                        ? "text-green-400"
                        : match.w === 0 || match.w === "0"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {match.w === 1 || match.w === "1"
                      ? "Win"
                      : match.w === 0 || match.w === "0"
                      ? "Loss"
                      : "?"}
                  </td>
                  <td>{`${match.k}/${match.d}`}</td>
                  <td>{`${match.elod} ${match.elo}`}</td>
                  <td>
                  <button className="group bg-[#2C2C2C] hover:bg-[#3a3a3a] text-white rounded flex items-center transition">
                        <a href={match.url} target="_blank" rel="noopener noreferrer">
                        <Plus className="h-5 w-5 group-hover:scale-105 transform transition duration-200" />
                        </a>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
        {/* Buttons */}
        <div className="flex justify-between items-center mt-6 px-4">
          <button className="group bg-[#2C2C2C] hover:bg-[#3a3a3a] text-white py-2 px-4 rounded flex items-center transition" onClick={onShowMoreStats}>
            <Plus className="h-5 w-5 group-hover:scale-110 transform transition duration-200" />
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition"
            onClick={onSearchAgain}
          >
            Hledat znovu
          </button>
          <button
            onClick={handleClick}
            className="group bg-[#2C2C2C] hover:bg-[#3a3a3a] text-white py-2 px-4 rounded flex items-center transition"
          >
            <span
              className={`transition-transform duration-300 ease-in-out ${
                bookmarked ? "scale-125 rotate-12 text-orange-500" : "scale-100"
              }`}
            >
              {bookmarked ? (
                <BookmarkCheck className="h-5 w-5" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </span>
          </button>
        </div>
      </div>
    );
}
