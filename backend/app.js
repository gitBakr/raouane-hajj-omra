const cors = require('cors');

app.use(cors({
  origin: [
    'https://raouane-hajj-omra.onrender.com',
    'http://localhost:8080',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
})); 