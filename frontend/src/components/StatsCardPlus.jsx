import { Plus } from "lucide-react";
import CIcon from '@coreui/icons-react'
import { cibSteam, cibFaceit } from '@coreui/icons'
import EloChart from "../components/EloChart"

export default function PlayerProfilePlus({ playerData, onSearchAgain, buttonText }) {

  // Základní info z overview
  const overview = playerData.overview || {};
  const statsObj = playerData.stats || {};
  // Statistiky z overview nebo stats
  const stats = [
    { label: "ELO", value: overview.elo ?? "?" },
    { label: "Win Rate", value: statsObj.wr ?? "?" },
    { label: "Matches", value: statsObj.m ?? "?" },
    { label: "Wins", value: statsObj.w ?? "?" },
    { label: "Looses", value: statsObj.l ?? "?" },
    { label: "K/D Ratio", value: statsObj.avg_kdr ?? "?" },
    { label: "K/R Ratio", value: statsObj.avg_krr ?? "?" },
    { label: "HLTV rating", value: statsObj.avg_hltv ?? "?" },
    { label: "Headshot %", value: statsObj.hsp ?? "?" },
    { label: "Avg Kills", value: statsObj.avg_k ?? "?" },
    { label: "Avg Deaths", value: statsObj.avg_d ?? "?" },

  ];
  const eloData = playerData.graph || {};
  

  const matches = playerData.matches?.segments || {};

  return (
      <div className="p-8 text-white bg-[#181818] rounded-xl mt-20">
    
        {/* Profilní karta a statistiky */}
        <div className="grid grid-rows-2 gap-6 mb-6">
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
                {(overview.country) && (
                  <img
                    src={`https://flagcdn.com/w40/${(overview.country).toLowerCase()}.png`}
                    alt="country"
                    className="w-6 h-auto"
                  />
                )}
              </div>
            </div>

           
            {/*SteamProklik */}
            <a href={overview.s_url} className="w-5 h-5 text-white">
              <div className="w-full h-full text-white">
              <CIcon icon={cibSteam} customClassName="fill-white hover:fill-gray-300" />
              </div>
            </a>

            {/*FaceitProklik */}
            <a href={overview.f_url} className="w-5 h-5 text-white">
              <div className="w-full h-full text-white">
              <CIcon icon={cibFaceit} customClassName="fill-white hover:fill-gray-300" />
              </div>
            </a>

            <span className=" text-orange-500 font-bold text-xl ml-auto">
              {overview.lvl ?? "?"}
            </span>
            
          </div>
    
          {/* Statistiky */}
          <div className="flex flex-row gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#1E1E1E] p-6 rounded-xl text-center">
                <h4 className="text-gray-400">{stat.label}</h4>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
       
        </div>
    
        <div className="grid grid-cols-2 gap-6">

        {/* Tabulka zápasů */}
<div className="bg-[#1E1E1E] p-6 rounded-xl mb-6">
  <h3 className="text-orange-500 font-semibold mb-4">Poslední zápasy</h3>
  
        {/* Scrollovatelný kontejner */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-[#2C2C2C] sticky top-0 bg-[#1E1E1E] z-10">
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
        </div>

        {/* Graf */}
        <div className="bg-[#1E1E1E] p-6 rounded-xl mb-6">
            <EloChart eloData={eloData}/>
        </div>

        </div>
    
        {/* Buttons */}
        <div className="flex justify-center items-center mt-6 px-4">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition"
            onClick={onSearchAgain}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
}
