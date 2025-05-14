import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

import { Bookmark, Plus } from "lucide-react";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

// Data o zápasech (simulovaný JSON)
const matchesData = [
  { date: "12. maj", map: "Mirage", result: "Win", kd: "18/12", elo: "+24" },
  { date: "11. maj", map: "Mirage", result: "Win", kd: "15/13", elo: "+24" },
  { date: "10. maj", map: "Mirage", result: "Loss", kd: "18/18", elo: "+14" },
  { date: "9. maj", map: "Mirage", result: "Win", kd: "15/15", elo: "+22" },
  { date: "4. maj", map: "Mirage", result: "Loss", kd: "13/15", elo: "–24" }
];

// Data pro graf ELO
const eloData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  datasets: [
    {
      label: "ELO",
      data: [1100, 1120, 1150, 1190, 1230, 1280, 1320, 1370, 0],
      borderColor: "#F97316", // Tailwind orange-500
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      fill: true,
      tension: 0.4
    }
  ]
};

// Možnosti pro graf ELO
const eloOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: { display: false },
    y: {
      display: false,
      min: 1000,
      max: 1400
    }
  }
};

export default function PlayerProfile({ onSearchAgain }) {
  const stats = [
    { label: "ELO", value: "1.275" },
    { label: "Win Rate", value: "52,5 %" },
    { label: "K/D Ratio", value: "1,21" },
  ];

  return (
    <div className="p-8 text-white bg-[#181818] rounded-xl">
      {/* Profilní karta */}
      <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg flex gap-6 items-center mb-8 ">
        <img
          src="https://i.imgur.com/2Fx1bsv.png"
          alt="Avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Skylr</h2>
            <img src="https://flagcdn.com/w40/cz.png" alt="CZ" className="w-6" />
          </div>
        </div>
        <span className="ml-auto text-orange-500 font-bold text-xl">10</span>
      </div>

      {/* Statistiky */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#1E1E1E] p-4 rounded-xl text-center">
            <h4 className="text-gray-400">{stat.label}</h4>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
        <div className="bg-[#1E1E1E] p-4 rounded-xl">
          <h3 className="text-orange-500 font-semibold mb-2">ELO History</h3>
          <Line data={eloData} options={eloOptions} />
        </div>
      </div>

      {/* Tabulka zápasů */}
      <div className="bg-[#1E1E1E] p-6 rounded-xl">
        <h3 className="text-orange-500 font-semibold mb-4">Lostenst Matches</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 border-b border-[#2C2C2C]">
            <tr>
              <th className="py-2">Date</th>
              <th>Map</th>
              <th>Result</th>
              <th>K/D</th>
              <th>ELO Change</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {matchesData.map((match, i) => (
              <tr key={i} className="border-b border-[#2C2C2C]">
                <td className="py-2">{match.date}</td>
                <td>{match.map}</td>
                <td className={match.result === "Win" ? "text-orange-500" : "text-red-400"}>
                  {match.result}
                </td>
                <td>{match.kd}</td>
                <td className={match.elo.startsWith("+") ? "text-orange-500" : "text-red-400"}>
                  {match.elo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-8 px-4">
      {/*PLUS*/}
        <button className="group bg-[#2C2C2C] hover:bg-[#3a3a3a] text-white py-2 px-4 rounded flex items-center transition">
          <Plus className="h-5 w-5 group-hover:scale-110 transform transition duration-200" />
        </button>
      {/*ZNOVU*/}
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition"
          onClick={onSearchAgain}
        > Hledat znovu
        </button>
      {/*BOOKMARK*/}
        <button className="group bg-[#2C2C2C] hover:bg-[#3a3a3a] text-white py-2 px-4 rounded flex items-center transition">
          <Bookmark className="h-5 w-5 group-hover:scale-110 transform transition duration-200" />
        </button>
      </div>
    </div>
  );
}
