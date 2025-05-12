import { useState } from "react";
import Navbar from "./components/Navbar";
import Vyhledat from "./pages/Vyhledat";
import Profil from "./pages/Profil";
import Oblibeny from "./pages/Oblibeny";
import Leaderboard from "./pages/Leaderboard";

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("/"); // Default page path

  const handlePageChange = (pagePath) => {
    setCurrentPage(pagePath);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "/":
        return <Vyhledat/>;
      case "/profil":
        return <Profil/>;
      case "/oblibeny":
        return <Oblibeny/>;
      case "/leaderboard":
        return <Leaderboard/>;
      default:
        return <Vyhledat />; 
    }
  };

  return (
    <div className="relative" >
      <div className="fixed top-0 w-full z-50">
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      <main className="bg-[#121212] ">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
