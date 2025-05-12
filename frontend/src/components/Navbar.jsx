import { Search, UserCircle, Star, Trophy } from "lucide-react";

const leftItems = [
  { name: "Vyhledat", icon: Search, path: "/" },
  { name: "Můj profil", icon: UserCircle, path: "/profil" },
];

const rightItems = [
  { name: "Oblíbení hráči", icon: Star, path: "/oblibeny" },
  { name: "Žebříčky", icon: Trophy, path: "/leaderboard" },
];

export default function TopNavBar({ currentPage, onPageChange }) {
  return (
    <header className="w-full bg-[#1E1E1E] shadow-md px-8 py-4 flex items-center justify-between border-b-2 border-[#FF5733]">
      {/* Left */}
      <div className="w-1/3 flex justify-end gap-4">
        {leftItems.map(({ name, icon: Icon, path }) => {
          const isActive = currentPage === path;
          return (
            <button
              key={name}
              onClick={() => onPageChange(path)}
              className={`group flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#181818] text-[#E0E0E0] scale-[1.02]"
                  : "hover:bg-[#2C2C2C] text-[#A0A0A0]"
              }`}
            >
              <Icon size={18} />
              {name}
            </button>
          );
        })}
      </div>

      {/* Mid */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-bold select-none  shadow-amber-300">
          <span className="text-[#E0E0E0]">Faceit</span>
          <span className="text-[#FF5733]">Stats</span>
        </h1>
      </div>

      {/* Right */}
      <div className="w-1/3 flex justify-start gap-4">
        {rightItems.map(({ name, icon: Icon, path }) => {
          const isActive = currentPage === path;
          return (
            <button
              key={name}
              onClick={() => onPageChange(path)}
              className={`group flex items-left gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#181818] text-[#E0E0E0] scale-[1.02]"
                  : "hover:bg-[#2C2C2C] text-[#A0A0A0]"
              }`}
            >
              <Icon size={18} />
              {name}
            </button>
          );
        })}
      </div>
    </header>
  );
}
