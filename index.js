// index.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// السماح بالوصول من تطبيقك
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// مسار رئيسي لجلب البيانات من football-data.org
app.get("/proxy", async (req, res) => {
  try {
    const path = req.query.path; // مثال: /v4/matches/12345
    const url = `https://api.football-data.org${path}`;
    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_API_KEY,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy error" });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));