const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;
const API_KEY = process.env.ANALYSER_API_KEY;
const BASE_URL = 'https://faceitanalyser.com/api/';

app.use(cors());

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
  const { playerid } = req.params; // správný název podle URL parametru
  try {
    const response = await axios.get(`${BASE_URL}playerGraphs/${playerid}?key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});