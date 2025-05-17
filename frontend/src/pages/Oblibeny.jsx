import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function Oblibeny() {
  const [bookmarkedPlayers, setBookmarkedPlayers] = useState([]);

  useEffect(() => {
    // Load players from localStorage
    const loadBookmarkedPlayers = () => {
      const storedPlayers = JSON.parse(localStorage.getItem('bookmarkedPlayers')) || [];
      setBookmarkedPlayers(storedPlayers);
    };
    loadBookmarkedPlayers();
  }, []);

  const handleRemovePlayer = (nicknameToRemove) => {
    const updatedBookmarks = bookmarkedPlayers.filter(
      (player) => player.nickname !== nicknameToRemove
    );
    setBookmarkedPlayers(updatedBookmarks); // Update state
    localStorage.setItem('bookmarkedPlayers', JSON.stringify(updatedBookmarks)); // Update localStorage
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#121212] mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Oblíbení hráči</h1>
      {bookmarkedPlayers.length > 0 ? (
        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
          {bookmarkedPlayers.map((player, index) => (
            <div key={index} className="bg-[#181818] p-6 rounded-xl shadow-lg flex flex-col items-center text-white relative">
              {/* Remove Button */}
              <button
                onClick={() => handleRemovePlayer(player.nickname)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                aria-label={`Odebrat ${player.nickname} z oblíbených`}
              >
                <Trash2 className="h-5 w-5 m-2" />
              </button>

              <img
                src={player.avatar}
                alt={`${player.nickname} Avatar`}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{player.nickname}</h2>
              <p className="text-orange-500 font-semibold mb-4">Level: {player.level}</p>
              <a
                href={player.faceitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Profil na Faceit
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">Žádní oblíbení hráči zatím nebyli přidáni.</p>
      )}
    </div>
  );
}