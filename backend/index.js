const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio'); // Potřeba pro scraping
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001; 
const API_KEY = process.env.ANALYSER_API_KEY; 
const BASE_URL = 'https://faceitanalyser.com/api/'; 

app.use(cors());
app.use(express.json());


// Získání základních statistik hráče
app.get('/api/faceit/stats/:player_id', async (req, res) => {
  const { player_id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}stats/${player_id}?key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

// Získání zápasů hráče
app.get('/api/faceit/matches/:player_id', async (req, res) => {
  const { player_id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}matches/${player_id}?key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

// Získání přehledu hráče
app.get('/api/faceit/overview/:player_id', async (req, res) => {
  const { player_id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}overview/${player_id}?key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

// Získání highlights hráče
app.get('/api/faceit/highlights/:player_id', async (req, res) => {
  const { player_id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}highlights/${player_id}?key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

// Získání dat pro graf ela
app.get('/api/faceit/playerGraphs/:playerid', async (req, res) => {
  const { playerid } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}playerGraphs/${playerid}?key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
});















// --- NEW SCRAPING LOGIC FOR LEADERBOARD ---

async function scrapeLeaderboard(region, country, totalPages, limitPerPage = 20) {
    const baseUrl = 'https://faceittracker.net/leaderboards/elo';
    const rankSelector = 'td[data-th="Rank"]';
    const nameSelector = 'td[data-th="Player"] a';
    const eloSelector = 'td[data-th="Elo"]';
    const matchesSelector = 'td[data-th="Matches"]';
    const wrSelector = 'td[data-th="Win Rate"]';
    // Pravděpodobný selektor pro řádky tabulky - ověřte!
     const playerRowsSelector = 'table tbody tr';


    const delayBetweenRequests = 500; // Pauza v milisekundách

    const allPlayers = [];

    console.log(`Starting scrape for Region: ${region}, Country: ${country}, Pages: ${totalPages}`);

    for (let i = 1; i <= totalPages; i++) {
        const url = `${baseUrl}?region=${region}&country=${country}&page=${i}&limit=${limitPerPage}`;
        console.log(`Scraping page ${i}: ${url}`);

        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            const html = response.data;
            const $ = cheerio.load(html);

            const playerRows = $(playerRowsSelector);

             if (playerRows.length === 0 && i === 1) {
                 // Pokud na první stránce nejsou žádné řádky, je pravděpodobně něco špatně
                 throw new Error("No player data found on the first page. Check selectors or input parameters.");
             } else if (playerRows.length === 0) {
                 // Pokud nejsou data na dalších stránkách, dosáhli jsme konce
                 console.log(`No more player rows found on page ${i}. Ending scrape.`);
                 break;
             }


            playerRows.each((rowIndex, rowElement) => {
                const rank = $(rowElement).find(rankSelector).text().trim();
                const name = $(rowElement).find(nameSelector).text().trim();
                const elo = $(rowElement).find(eloSelector).text().trim();
                const matches = $(rowElement).find(matchesSelector).text().trim();
                const winRate = $(rowElement).find(wrSelector).text().trim();

                // Přidej hráče jen pokud má alespoň jméno a ELO (můžete upravit podmínky)
                if (name && elo) {
                     allPlayers.push({
                         rank: parseInt(rank, 10) || rank,
                         player: name,
                         elo: parseInt(elo, 10) || elo,
                         matches: parseInt(matches, 10) || matches,
                         winRate: parseFloat(winRate) || winRate,
                         // Zde můžete přidat i URL profilu, pokud ji získáte ze scrape (např. z 'a' tagu)
                         // profileUrl: $(rowElement).find(nameSelector).attr('href') || '#'
                     });
                     // console.log(`  Found player: ${name}`);
                } else {
                     // console.warn(`  Skipping row ${rowIndex + 1} on page ${i} due to missing data.`);
                }
            });


        } catch (error) {
            console.error(`Error scraping page ${i}: ${error.message}`);
             if (error.response && error.response.status === 404) {
                 console.warn(`Page ${i} not found (404). Continuing with next page.`);
                 continue; // Pokračovat s další stránkou i při 404, může se stát na konci
             }
             // Při jiné chybě (např. síťová chyba) je lepší scraping ukončit
             console.error(`Aborting scrape due to error on page ${i}.`);
            // return Promise.reject(error); // Můžete vyhodit chybu pro chycení v endpointu
        }

        if (i < totalPages) {
            await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
        }
    }

    console.log(`Scraping finished. Found ${allPlayers.length} players.`);
    return allPlayers;
}


// NEW: API endpoint pro scraping leaderboardu
app.get('/api/leaderboard', async (req, res) => {
    const { region, country, pages } = req.query;

    // Validace vstupů
    const totalPages = parseInt(pages, 10);
    if (!region || !country || isNaN(totalPages) || totalPages <= 0) {
        return res.status(400).json({ error: 'Missing or invalid parameters (region, country, pages must be a positive number).' });
    }

    const limitPerPage = 20; // Pevně dané pro tento scrape

    try {
        const leaderboardData = await scrapeLeaderboard(region, country, totalPages, limitPerPage);
        res.json(leaderboardData);
    } catch (error) {
        console.error("Error in /api/leaderboard endpoint:", error);
        res.status(500).json({ error: error.message || 'Failed to scrape leaderboard data.' });
    }
});


// --- Server listen ---
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});