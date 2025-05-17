import { useState } from "react";

export default function SetProfile({ onSetProfile }) {
  const [nickname, setNickname] = useState("");

  const handleSave = () => {
    if (!nickname.trim()) return;
    onSetProfile(nickname.trim()); // ↩️ pošli zpět do Profil
  };

  return (
    <div className="p-6 rounded-2xl shadow-md w-full max-w-xl bg-[#1E1E1E]">
      <h1 className="text-2xl font-bold mb-4 text-[#FF5500]">Uložit profil</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Zadej Faceit přezdívku..."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#2C2C2C] text-white border-none"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#FF5500] text-white rounded-lg hover:bg-[#CC4400]"
        >
          Uložit
        </button>
      </div>
    </div>
  );
}
