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

// Audio proxy to MinIO
app.use("/audio", async (req, res) => {
  const audioPath = req.path; // e.g. /brandenburger-tor_de.mp3
  try {
    const minioUrl = `http://localhost:9000/audio${audioPath}`;
    const response = await fetch(minioUrl);
    if (response.ok) {
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      response.body?.pipeTo(
        new WritableStream({
          write(chunk) { res.write(chunk); },
          close() { res.end(); },
        })
      );
    } else {
      res.redirect(minioUrl);
    }
  } catch {
    res.redirect(`http://localhost:9000/audio${audioPath}`);
  }
});

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
