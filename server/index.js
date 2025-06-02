import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { getQuotaData } from './quota.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const PASSWORD = process.env.PASSWORD || 'test';
const SECRET_KEY = process.env.SECRET_KEY || 'supersecret';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    req.session.logged_in = true;
    return res.json({ success: true });
  } else {
    req.session.logged_in = false;
    return res.status(401).json({ success: false, error: 'Incorrect password' });
  }
});

app.get('/check', (req, res) => {
  res.json({ logged_in: !!req.session.logged_in });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

app.use(express.static('../client/dist'));

// API endpoint to serve quota data from CSV
app.get('/api/quota', (req, res) => {
  try {
    const quota = getQuotaData();
    res.json({ quota });
  } catch (err) {
    console.error('Error in /api/quota:', err);
    res.status(500).json({ error: 'Failed to load quota data', details: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../client/dist' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
