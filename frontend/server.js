const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.APP_PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
