import React, { useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [region, setRegion] = useState('EU');
  const [country, setCountry] = useState('cz');
  const [totalPages, setTotalPages] = useState(1); 
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from your backend API
  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    setLeaderboardData([]);

    const backendUrl = `http://localhost:3001/api/leaderboard`; 

    try {
      const response = await axios.get(backendUrl, {
        params: {
          region: region,
          country: country,
          pages: totalPages,
        },
        timeout: 30000, 
      });

      if (Array.isArray(response.data)) {
           setLeaderboardData(response.data);
      } else {
           setError("Neočekávaný formát dat z backendu.");
           console.error("Unexpected backend response format:", response.data);
      }

    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      if (err.response) {
          setError(`Při načítání došlo k chybě: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Options for dropdowns (můžete rozšířit)
  const regions = ['EU', 'NA', 'SA', 'OCEANIA', 'ASIA'];
  const countries = ['cz', 'sk', 'de', 'us', 'gb'];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#121212] text-white py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Vyhledat Leaderboard</h1>

      {/* Configuration Form */}
      <div className="bg-[#181818] p-6 rounded-xl shadow-lg mb-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Konfigurace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-400">Region</label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 block w-full rounded-md bg-[#2C2C2C] border-transparent focus:border-orange-500 focus:ring-orange-500 text-white"
            >
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-400">Země (kód)</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
               className="mt-1 block w-full rounded-md bg-[#2C2C2C] border-transparent focus:border-orange-500 focus:ring-orange-500 text-white"
            >
               {countries.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
          </div>
           <div className="md:col-span-2">
            <label htmlFor="pages" className="block text-sm font-medium text-gray-400">Počet stránek ke stažení</label>
            <input
              type="number"
              id="pages"
              value={totalPages}
              onChange={(e) => setTotalPages(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
               className="mt-1 block w-full rounded-md bg-[#2C2C2C] border-transparent focus:border-orange-500 focus:ring-orange-500 text-white"
            />
          </div>
        </div>
        <button
          onClick={fetchLeaderboard}
          disabled={loading}
          className={`mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Načítám...' : 'Načíst Leaderboard'}
        </button>
         {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>


      {/* Leaderboard Table */}
      {leaderboardData.length > 0 && (
        <div className="bg-[#181818] p-6 rounded-xl shadow-lg w-full max-w-4xl overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-[#2C2C2C]">
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Hráč</th>
                <th className="py-2 px-4">ELO</th>
               
              </tr>
            </thead>
            <tbody className="text-white">
              {leaderboardData.map((player, index) => (
                <tr key={index} className="border-b border-[#2C2C2C]">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                     {/* Předpokládáme, že player.player je přezdívka */}
                     <a href={`https://www.faceit.com/en/players/${encodeURIComponent(player.player)}`} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                       {player.player}
                     </a>
                   </td>
                  <td className="py-2 px-4">{player.elo}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

       {/* Message when no data */}
       {!loading && !error && leaderboardData.length === 0 && (
           <p className="text-white">Zatím nebyly načteny žádné údaje z leaderboardu. Vyberte konfiguraci a klikněte na "Načíst".</p>
       )}
    </div>
  );
}