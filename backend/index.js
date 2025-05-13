// server/index.js
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Ahoj z Express backendu!' });
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});