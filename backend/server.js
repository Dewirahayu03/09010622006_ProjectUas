// Import dependencies
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const express = require('express');

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Sesuaikan dengan password MySQL Anda
  database: 'myprofile'
});

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MySQL database
db.connect(err => {
  if (err) {
    console.error('Kesalahan koneksi database:', err.stack);
    return;
  }
  console.log('Terhubung ke database.');
});

// API endpoint to fetch news
app.get('/', (req, res) => {
  const sql = 'SELECT judul_berita, ringkasan, gambar FROM berita'; // Adjust SQL query to select required fields
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Kesalahan kueri database:', err);
      res.status(500).json({ error: 'Kesalahan Server Internal' });
      return;
    }
    res.json(results); // Send JSON response with news data
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
