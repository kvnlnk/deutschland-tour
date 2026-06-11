import { Router, Request, Response } from "express";
import { query } from "../db.js";

export const routesRouter = Router();

// MinIO base URL for audio files
const AUDIO_BASE = "http://localhost:9000/audio";
const IMAGE_BASE = "http://localhost:9000/images";

// GET /api/routes — list all routes
routesRouter.get("/routes", async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT id, city, name, name_en, description, description_en,
              image_url, duration_min, distance_km, price_cents, tags
       FROM routes ORDER BY price_cents ASC, city ASC`
    );
    res.json({ routes: result.rows });
  } catch (err: any) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/routes/:id — full route with POIs
routesRouter.get("/routes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routeResult = await query(
      `SELECT id, city, name, name_en, description, description_en,
              image_url, duration_min, distance_km, price_cents, tags
       FROM routes WHERE id = $1`, [id]
    );

    if (routeResult.rows.length === 0) {
      res.status(404).json({ error: "Route not found" });
      return;
    }

    const poiResult = await query(
      `SELECT id, name, name_en, description, description_en,
              lat, lng, display_order AS "order", duration,
              audio_url_de AS "audioDe", audio_url_en AS "audioEn",
              image_url AS "imageUrl"
       FROM pois WHERE route_id = $1
       ORDER BY display_order ASC`, [id]
    );

    const route = {
      ...routeResult.rows[0],
      pois: poiResult.rows,
    };

    res.json({ route });
  } catch (err: any) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reviews — submit a review
routesRouter.post("/reviews", async (req: Request, res: Response) => {
  try {
    const { routeId, author, rating, comment } = req.body;
    if (!routeId || !rating || rating < 1 || rating > 5) {
      res.status(400).json({ error: "routeId and rating (1-5) required" });
      return;
    }

    const result = await query(
      `INSERT INTO reviews (route_id, author, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [routeId, author?.trim() || "Anonym", rating, comment?.trim() || ""]
    );

    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err: any) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reviews/:routeId
routesRouter.get("/reviews/:routeId", async (req: Request, res: Response) => {
  try {
    const { routeId } = req.params;
    const result = await query(
      `SELECT id, author, rating, comment, created_at
       FROM reviews WHERE route_id = $1
       ORDER BY created_at DESC LIMIT 50`, [routeId]
    );

    const avgResult = await query(
      `SELECT COALESCE(AVG(rating), 0)::real AS avg,
              COUNT(*)::int AS count
       FROM reviews WHERE route_id = $1`, [routeId]
    );

    res.json({
      reviews: result.rows,
      stats: avgResult.rows[0],
    });
  } catch (err: any) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/create-checkout-session — Stripe demo
routesRouter.post("/create-checkout-session", async (req: Request, res: Response) => {
  const { routeId, bundle } = req.body;

  if (!routeId && !bundle) {
    res.status(400).json({ error: "routeId or bundle required" });
    return;
  }

  // Get price from DB if routeId
  let amount = 0;
  if (routeId) {
    try {
      const r = await query("SELECT price_cents FROM routes WHERE id = $1", [routeId]);
      if (r.rows.length > 0) amount = r.rows[0].price_cents;
    } catch { /* fallback to defaults below */ }
  }

  // Bundle pricing
  const BUNDLE_PRICES: Record<string, number> = {
    "city-bundle": 1499,
    "all-access": 2999,
  };

  const key = bundle || routeId || "";
  if (bundle) amount = BUNDLE_PRICES[bundle] || amount;
  if (amount === 0) {
    res.status(400).json({ error: "Free or invalid product" });
    return;
  }

  // Stripe is not configured with a real key → return demo session
  res.json({
    url: `/?purchase=${key}&demo=1`,
    demo: true,
    message: "Demo-Modus: Tour freigeschaltet (keine echte Zahlung)",
  });
});

// POST /api/purchases — log a purchase (demo mode)
routesRouter.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { routeId, type, amountCents } = req.body;
    const result = await query(
      `INSERT INTO purchases (route_id, type, amount_cents, status)
       VALUES ($1, $2, $3, 'demo') RETURNING id`,
      [routeId || "unknown", type || "single", amountCents || 0]
    );
    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/health
routesRouter.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    database: "postgresql",
    audio: "minio",
    minio_url: AUDIO_BASE,
  });
});
