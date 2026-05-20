const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Connect to MongoDB ──────────────────────────────────────
// ✅ Fixed: was calling mongoose.connect() here AND in db.js — removed duplicate
connectDB();

// ── Routes ──────────────────────────────────────────────────
app.use("/api/patients", require("./routes/patientRoutes"));

// ── Health check (useful for testing the server is alive) ───
app.get("/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// ── 404 fallback ────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("[Unhandled error]", err);
    res.status(500).json({ error: "Something went wrong." });
});

// ── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});