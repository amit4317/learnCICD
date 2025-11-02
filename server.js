import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.json({ service: "api", time: new Date().toISOString() }));

app.listen(PORT, () => console.log(`API listening on ${PORT}`));
