import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { routesRouter } from "./routes/routes";
import { initDb } from "./db";

const app = express();
const PORT = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// Serve audio files
app.use("/audio", express.static(path.join(__dirname, "..", "audio")));

// Serve frontend build
const clientDist = path.join(__dirname, "..", "..", "client", "dist");
app.use(express.static(clientDist));

// SPA fallback: serve index.html for all non-file routes
app.get("*", (req, res) => {
  // Don't catch /api routes
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(clientDist, "index.html"));
});

// API routes
app.use("/api", routesRouter);

initDb();

app.listen(PORT, () => {
  console.log(`🌍 Deutschland Tour Server running on http://localhost:${PORT}`);
  console.log(`📡 Audio files: ${path.join(__dirname, "..", "audio")}`);
});

export { app };
