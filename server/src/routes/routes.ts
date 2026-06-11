import { Router, Request, Response } from "express";
import { getDb } from "../db";

export const routesRouter = Router();

// Stripe checkout session creation
routesRouter.post("/create-checkout-session", async (req: Request, res: Response) => {
  const { routeId, bundle } = req.body;

  if (!routeId && !bundle) {
    res.status(400).json({ error: "routeId or bundle required" });
    return;
  }

  // Price lookup
  const PRICES: Record<string, number> = {
    "berlin-classic": 0,    // free
    "muenchen-altstadt": 499,
    "hamburg-hafen": 499,
    "city-bundle": 1499,
    "all-access": 2999,
  };

  const key = bundle || routeId || "";
  const amount = PRICES[key];
  if (amount === undefined || amount === 0) {
    res.status(400).json({ error: "Invalid product" });
    return;
  }

  try {
    // Dynamically import stripe
    const Stripe = (await import("stripe")).default;
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      res.status(500).json({ error: "Stripe not configured" });
      return;
    }
    const stripe = new Stripe(stripeSecret);

    const productNames: Record<string, string> = {
      "muenchen-altstadt": "Münchner Altstadt Tour",
      "hamburg-hafen": "Hamburger Hafen Tour",
      "city-bundle": "Städte-Bundle (alle Touren einer Stadt)",
      "all-access": "All Access – alle Touren für immer",
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: productNames[key] || "Deutschland Tour",
            description: bundle === "city-bundle" ? "Alle Touren in einer Stadt" :
                         bundle === "all-access" ? "Alle Touren, alle Städte, für immer" :
                         "Self-guided audio walking tour",
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${req.headers.origin || "https://deutschland-tour.vercel.app"}/?purchase=${key}&success=1`,
      cancel_url: `${req.headers.origin || "https://deutschland-tour.vercel.app"}/?cancel=1`,
      metadata: {
        product_key: key,
        type: bundle ? "bundle" : "single",
      },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Verify a purchase (check webhook receipt)
routesRouter.get("/verify-purchase/:key", (req: Request, res: Response) => {
  const key = req.params.key;
  const db = getDb();
  const row = db.prepare(
    "SELECT id, created_at FROM purchases WHERE product_key = ? AND verified = 1"
  ).get(key);
  res.json({ purchased: !!row, purchase: row || null });
});

// GET /api/routes — list all routes
routesRouter.get("/routes", (_req: Request, res: Response) => {
  res.json({
    routes: [
      {
        id: "berlin-classic",
        city: "Berlin",
        name: "Berliner Historischer Rundgang",
        nameEn: "Berlin Historical Walk",
        description: "Vom Brandenburger Tor zum Alexanderplatz – 800 Jahre Berlin auf 4,2 km.",
        descriptionEn: "From Brandenburg Gate to Alexanderplatz – 800 years of Berlin on 4.2 km.",
        durationMinutes: 120,
        distanceKm: 4.2,
        poiCount: 9,
        priceCents: 0,
        imageUrl: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80",
      },
      {
        id: "muenchen-altstadt",
        city: "München",
        name: "Münchner Altstadt & Kultur",
        nameEn: "Munich Old Town & Culture",
        description: "Bayerische Geschichte, Bierkultur und königliche Pracht auf 3 km durchs Herz Münchens.",
        descriptionEn: "Bavarian history, beer culture and royal splendor on a 3 km walk through Munich's heart.",
        durationMinutes: 90,
        distanceKm: 3.1,
        poiCount: 9,
        priceCents: 499,
        imageUrl: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=600&q=80",
      },
      {
        id: "hamburg-hafen",
        city: "Hamburg",
        name: "Hamburger Hafen & Geschichte",
        nameEn: "Hamburg Harbor & History",
        description: "Deutschlands Tor zur Welt – hanseatische Geschichte und moderne Architektur auf 3,5 km.",
        descriptionEn: "Germany's Gateway to the World – Hanseatic history and modern architecture on 3.5 km.",
        durationMinutes: 100,
        distanceKm: 3.5,
        poiCount: 9,
        priceCents: 499,
        imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      },
    ],
  });
});

// GET /api/routes/:id — full route with POIs
routesRouter.get("/routes/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const routeData: Record<string, any> = {
    "berlin-classic": {
      id: "berlin-classic",
      city: "Berlin",
      name: "Berliner Historischer Rundgang",
      nameEn: "Berlin Historical Walk",
      durationMinutes: 120,
      distanceKm: 4.2,
      priceCents: 0,
      pois: [
        { id: "brandenburger-tor", name: "Brandenburger Tor", nameEn: "Brandenburg Gate", lat: 52.516274, lng: 13.377704, order: 1, description: "Das Brandenburger Tor ist das bekannteste Wahrzeichen Berlins und ein Symbol der deutschen Einheit.", descriptionEn: "The Brandenburg Gate is Berlin's most famous landmark and a symbol of German unity.", audioDe: "/audio/brandenburger-tor_de.mp3", audioEn: "/audio/brandenburger-tor_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80" },
        { id: "reichstag", name: "Reichstagsgebäude", nameEn: "Reichstag Building", lat: 52.51862, lng: 13.376187, order: 2, description: "Der Reichstag beherbergt den Deutschen Bundestag.", descriptionEn: "The Reichstag houses the German Bundestag.", audioDe: "/audio/reichstag_de.mp3", audioEn: "/audio/reichstag_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1585199468602-191509b1cf1c?w=600&q=80" },
        { id: "holocaust-mahnmal", name: "Denkmal für die ermordeten Juden Europas", nameEn: "Holocaust Memorial", lat: 52.5137, lng: 13.3788, order: 3, description: "2711 Betonstelen erinnern an die jüdischen Opfer.", descriptionEn: "2,711 concrete stelae commemorate Jewish victims.", audioDe: "/audio/holocaust-mahnmal_de.mp3", audioEn: "/audio/holocaust-mahnmal_en.mp3", duration: 15, imageUrl: "https://images.unsplash.com/photo-1586007736985-2dfa1b3bf7c2?w=600&q=80" },
        { id: "potsdamer-platz", name: "Potsdamer Platz", nameEn: "Potsdamer Platz", lat: 52.5093, lng: 13.3763, order: 4, description: "Vom verkehrsreichsten Platz Europas zum modernen Geschäftsviertel.", descriptionEn: "From Europe's busiest square to a modern business district.", audioDe: "/audio/potsdamer-platz_de.mp3", audioEn: "/audio/potsdamer-platz_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1579603712761-8e0a899c4e08?w=600&q=80" },
        { id: "checkpoint-charlie", name: "Checkpoint Charlie", nameEn: "Checkpoint Charlie", lat: 52.5074, lng: 13.3903, order: 5, description: "Der berühmteste Grenzübergang des Kalten Krieges.", descriptionEn: "The most famous Cold War border crossing.", audioDe: "/audio/checkpoint-charlie_de.mp3", audioEn: "/audio/checkpoint-charlie_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1569214152476-faf546a7e31b?w=600&q=80" },
        { id: "gendarmenmarkt", name: "Gendarmenmarkt", nameEn: "Gendarmenmarkt", lat: 52.5135, lng: 13.3927, order: 6, description: "Der schönste Platz Berlins.", descriptionEn: "Berlin's most beautiful square.", audioDe: "/audio/gendarmenmarkt_de.mp3", audioEn: "/audio/gendarmenmarkt_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1599701265516-5b7e5b5a0528?w=600&q=80" },
        { id: "berliner-dom", name: "Berliner Dom", nameEn: "Berlin Cathedral", lat: 52.5192, lng: 13.4011, order: 7, description: "Die größte evangelische Kirche Deutschlands.", descriptionEn: "Germany's largest Protestant church.", audioDe: "/audio/berliner-dom_de.mp3", audioEn: "/audio/berliner-dom_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1600679484602-c5f294a5ea4d?w=600&q=80" },
        { id: "museumsinsel", name: "Museumsinsel", nameEn: "Museum Island", lat: 52.5207, lng: 13.3968, order: 8, description: "UNESCO-Weltkulturerbe mit fünf Museen.", descriptionEn: "UNESCO World Heritage with five museums.", audioDe: "/audio/museumsinsel_de.mp3", audioEn: "/audio/museumsinsel_en.mp3", duration: 15, imageUrl: "https://images.unsplash.com/photo-1565639769863-4672e180f7ed?w=600&q=80" },
        { id: "alexanderplatz", name: "Alexanderplatz", nameEn: "Alexanderplatz", lat: 52.5219, lng: 13.4132, order: 9, description: "Berlins bekanntester Platz mit 368m Fernsehturm.", descriptionEn: "Berlin's most famous square with 368m TV tower.", audioDe: "/audio/alexanderplatz_de.mp3", audioEn: "/audio/alexanderplatz_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2768c?w=600&q=80" },
      ],
    },
    "muenchen-altstadt": {
      id: "muenchen-altstadt",
      city: "München",
      name: "Münchner Altstadt & Kultur",
      nameEn: "Munich Old Town & Culture",
      durationMinutes: 90,
      distanceKm: 3.1,
      priceCents: 499,
      pois: [
        { id: "muenchen-marienplatz", name: "Marienplatz", nameEn: "Marienplatz", lat: 48.1372, lng: 11.5756, order: 1, description: "Münchens Zentrum seit 1158.", descriptionEn: "Munich's center since 1158.", audioDe: "/audio/muenchen-marienplatz_de.mp3", audioEn: "/audio/muenchen-marienplatz_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1582706973045-c25f0e5e8ea1?w=600&q=80" },
        { id: "muenchen-frauenkirche", name: "Frauenkirche", nameEn: "Frauenkirche", lat: 48.1386, lng: 11.5736, order: 2, description: "Münchens Wahrzeichen mit 99m Türmen.", descriptionEn: "Munich's landmark with 99m towers.", audioDe: "/audio/muenchen-frauenkirche_de.mp3", audioEn: "/audio/muenchen-frauenkirche_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1590071761951-c4b7d1677039?w=600&q=80" },
        { id: "muenchen-viktualienmarkt", name: "Viktualienmarkt", nameEn: "Viktualienmarkt", lat: 48.1352, lng: 11.5764, order: 3, description: "Münchens berühmtester Markt seit 1807.", descriptionEn: "Munich's famous market since 1807.", audioDe: "/audio/muenchen-viktualienmarkt_de.mp3", audioEn: "/audio/muenchen-viktualienmarkt_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1555890634-fa05ad39ea74?w=600&q=80" },
        { id: "muenchen-hofbrauhaus", name: "Hofbräuhaus", nameEn: "Hofbräuhaus", lat: 48.1376, lng: 11.58, order: 4, description: "Weltberühmtes Bierlokal seit 1589.", descriptionEn: "World-famous beer hall since 1589.", audioDe: "/audio/muenchen-hofbrauhaus_de.mp3", audioEn: "/audio/muenchen-hofbrauhaus_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1591703224186-48b127a31aa0?w=600&q=80" },
        { id: "muenchen-residenz", name: "Münchner Residenz", nameEn: "Munich Residence", lat: 48.1413, lng: 11.5783, order: 5, description: "Einer der größten Paläste Europas.", descriptionEn: "One of Europe's largest city palaces.", audioDe: "/audio/muenchen-residenz_de.mp3", audioEn: "/audio/muenchen-residenz_en.mp3", duration: 12, imageUrl: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80" },
        { id: "muenchen-odeonsplatz", name: "Odeonsplatz", nameEn: "Odeonsplatz", lat: 48.1427, lng: 11.5774, order: 6, description: "Einer der schönsten Plätze Münchens.", descriptionEn: "One of Munich's most beautiful squares.", audioDe: "/audio/muenchen-odeonsplatz_de.mp3", audioEn: "/audio/muenchen-odeonsplatz_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1578937858064-54d8e32b3b29?w=600&q=80" },
        { id: "muenchen-englischer-garten", name: "Englischer Garten", nameEn: "English Garden", lat: 48.1569, lng: 11.5914, order: 7, description: "Größer als der Central Park.", descriptionEn: "Larger than Central Park.", audioDe: "/audio/muenchen-englischer-garten_de.mp3", audioEn: "/audio/muenchen-englischer-garten_en.mp3", duration: 12, imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
        { id: "muenchen-siegestor", name: "Siegestor", nameEn: "Victory Gate", lat: 48.1521, lng: 11.5818, order: 8, description: "Mahnmal für den Frieden.", descriptionEn: "A memorial for peace.", audioDe: "/audio/muenchen-siegestor_de.mp3", audioEn: "/audio/muenchen-siegestor_en.mp3", duration: 8, imageUrl: "https://images.unsplash.com/photo-1589020613799-37ab42daa9ce?w=600&q=80" },
        { id: "muenchen-pinakotheken", name: "Pinakotheken", nameEn: "Pinakotheken", lat: 48.1483, lng: 11.5706, order: 9, description: "Bedeutendste Kunstmuseen der Welt.", descriptionEn: "World's most important art museums.", audioDe: "/audio/muenchen-pinakotheken_de.mp3", audioEn: "/audio/muenchen-pinakotheken_en.mp3", duration: 12, imageUrl: "https://images.unsplash.com/photo-1593538312300-9ed682d4f20b?w=600&q=80" },
      ],
    },
    "hamburg-hafen": {
      id: "hamburg-hafen",
      city: "Hamburg",
      name: "Hamburger Hafen & Geschichte",
      nameEn: "Hamburg Harbor & History",
      durationMinutes: 100,
      distanceKm: 3.5,
      priceCents: 499,
      pois: [
        { id: "hamburg-rathaus", name: "Hamburger Rathaus", nameEn: "Hamburg City Hall", lat: 53.5503, lng: 9.9929, order: 1, description: "Größer als der Buckingham Palace.", descriptionEn: "Larger than Buckingham Palace.", audioDe: "/audio/hamburg-rathaus_de.mp3", audioEn: "/audio/hamburg-rathaus_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1558704932-1b46b8e8e9c9?w=600&q=80" },
        { id: "hamburg-kleine-alster", name: "Kleine Alster", nameEn: "Kleine Alster", lat: 53.5512, lng: 9.9916, order: 2, description: "Das Herz der Hamburger Innenstadt.", descriptionEn: "The heart of downtown Hamburg.", audioDe: "/audio/hamburg-kleine-alster_de.mp3", audioEn: "/audio/hamburg-kleine-alster_en.mp3", duration: 8, imageUrl: "https://images.unsplash.com/photo-1559671836-33d98e2d6e35?w=600&q=80" },
        { id: "hamburg-speicherstadt", name: "Speicherstadt", nameEn: "Speicherstadt", lat: 53.5447, lng: 9.9915, order: 3, description: "UNESCO-Weltkulturerbe seit 2015.", descriptionEn: "UNESCO World Heritage since 2015.", audioDe: "/audio/hamburg-speicherstadt_de.mp3", audioEn: "/audio/hamburg-speicherstadt_en.mp3", duration: 12, imageUrl: "https://images.unsplash.com/photo-1599256621730-535a1a2ac528?w=600&q=80" },
        { id: "hamburg-elbphilharmonie", name: "Elbphilharmonie", nameEn: "Elbphilharmonie", lat: 53.5413, lng: 9.9843, order: 4, description: "Das neue Wahrzeichen Hamburgs.", descriptionEn: "Hamburg's new landmark.", audioDe: "/audio/hamburg-elbphilharmonie_de.mp3", audioEn: "/audio/hamburg-elbphilharmonie_en.mp3", duration: 12, imageUrl: "https://images.unsplash.com/photo-1595348021839-10ddc40dedf8?w=600&q=80" },
        { id: "hamburg-landungsbruecken", name: "Landungsbrücken", nameEn: "Landungsbrücken", lat: 53.5457, lng: 9.9696, order: 5, description: "Maritimes Herz Hamburgs seit 1910.", descriptionEn: "Hamburg's maritime heart since 1910.", audioDe: "/audio/hamburg-landungsbruecken_de.mp3", audioEn: "/audio/hamburg-landungsbruecken_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1595643319489-1e23d0c0a734?w=600&q=80" },
        { id: "hamburg-alter-elbtunnel", name: "Alter Elbtunnel", nameEn: "Old Elbe Tunnel", lat: 53.546, lng: 9.9668, order: 6, description: "Technisches Meisterwerk von 1911.", descriptionEn: "Engineering masterpiece from 1911.", audioDe: "/audio/hamburg-alter-elbtunnel_de.mp3", audioEn: "/audio/hamburg-alter-elbtunnel_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1611647832580-3772680a29cd?w=600&q=80" },
        { id: "hamburg-fischmarkt", name: "Fischmarkt & St. Pauli", nameEn: "Fish Market & St. Pauli", lat: 53.5453, lng: 9.9562, order: 7, description: "Kulturgut seit 1703.", descriptionEn: "Cultural institution since 1703.", audioDe: "/audio/hamburg-fischmarkt_de.mp3", audioEn: "/audio/hamburg-fischmarkt_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1587547116159-1f9c61b7191a?w=600&q=80" },
        { id: "hamburg-planten-blomen", name: "Planten un Blomen", nameEn: "Planten un Blomen", lat: 53.5605, lng: 9.9826, order: 8, description: "47ha Park im Herzen Hamburgs.", descriptionEn: "47-hectare park in Hamburg's heart.", audioDe: "/audio/hamburg-planten-blomen_de.mp3", audioEn: "/audio/hamburg-planten-blomen_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1568050632560-f2ff2200e67c?w=600&q=80" },
        { id: "hamburg-hafencity", name: "HafenCity", nameEn: "HafenCity", lat: 53.5415, lng: 9.998, order: 9, description: "Europas größtes Stadtentwicklungsprojekt.", descriptionEn: "Europe's largest urban development project.", audioDe: "/audio/hamburg-hafencity_de.mp3", audioEn: "/audio/hamburg-hafencity_en.mp3", duration: 10, imageUrl: "https://images.unsplash.com/photo-1603437873669-5d18e0adc729?w=600&q=80" },
      ],
    },
  };

  const route = routeData[String(id)];
  if (!route) {
    res.status(404).json({ error: "Route not found" });
    return;
  }

  res.json({ route });
});

// POST /api/tours — log a tour start
routesRouter.post("/tours", (req: Request, res: Response) => {
  const { routeId, deviceId } = req.body;
  if (!routeId) {
    res.status(400).json({ error: "routeId is required" });
    return;
  }
  const db = getDb();
  const result = db.prepare("INSERT INTO tour_stats (route_id, device_id) VALUES (?, ?)").run(routeId, deviceId || null);
  res.status(201).json({ success: true, id: result.lastInsertRowid });
});

// PATCH /api/tours/:id/complete
routesRouter.patch("/tours/:id/complete", (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const db = getDb();
  const result = db.prepare("UPDATE tour_stats SET completed_at = datetime('now') WHERE id = ? AND completed_at IS NULL").run(id);
  if (result.changes === 0) { res.status(404).json({ error: "Tour not found or already completed" }); return; }
  res.json({ success: true });
});
