import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { routesRouter } from "./routes/routes.js";
import { initDb } from "./db.js";

const app = express();
const PORT = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// Serve frontend build
const clientDist = path.join(__dirname, "..", "..", "client", "dist");
app.use(express.static(clientDist));

// Serve audio files from local filesystem (no MinIO dependency)
const audioDir = path.join(__dirname, "..", "audio");
app.use("/audio", express.static(audioDir, {
  setHeaders: (res) => {
    res.setHeader("Cache-Control", "public, max-age=86400");
  }
}));

// API routes
app.use("/api", routesRouter);

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

initDb();

app.listen(PORT, () => {
  console.log(`🌍 Deutschland Tour Server running on http://localhost:${PORT}`);
  console.log(`📡 Audio files: ${path.join(__dirname, "..", "audio")}`);
});

export { app };
