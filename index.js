import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const WORKER_URL = "https://tg.perspolistehran.workers.dev"; // ← آدرس Worker یا api.telegram.org

app.post("/", async (req, res) => {
  try {
    const result = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const text = await result.text();
    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Render Proxy to Cloudflare Worker is working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
