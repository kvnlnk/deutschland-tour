import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface PurchaseContextType {
  purchasedTours: Set<string>;
  hasAccess: (routeId: string) => boolean;
  purchaseTour: (routeId: string) => Promise<void>;
  purchaseBundle: (type: "city-bundle" | "all-access") => Promise<void>;
  loading: boolean;
}

const PurchaseContext = createContext<PurchaseContextType>({
  purchasedTours: new Set(),
  hasAccess: () => false,
  purchaseTour: async () => {},
  purchaseBundle: async () => {},
  loading: false,
});

const STORAGE_KEY = "deutschland-tour-purchases";

function loadPurchases(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set(["berlin-classic"]); // Berlin is free
}

function savePurchases(purchases: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...purchases]));
}

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [purchasedTours, setPurchasedTours] = useState<Set<string>>(loadPurchases);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    savePurchases(purchasedTours);
  }, [purchasedTours]);

  // Handle Stripe redirect back (success/cancel from URL params)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const purchase = params.get("purchase");
    const success = params.get("success");
    const cancel = params.get("cancel");

    if (purchase && success === "1") {
      setPurchasedTours((prev) => {
        const next = new Set(prev);
        if (purchase === "all-access") {
          next.add("all-access");
        } else if (purchase === "city-bundle") {
          next.add("city-bundle");
        } else {
          next.add(purchase);
        }
        return next;
      });
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (cancel) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const hasAccess = useCallback(
    (routeId: string) => {
      return purchasedTours.has("all-access") || purchasedTours.has(routeId) || routeId === "berlin-classic";
    },
    [purchasedTours]
  );

  const purchaseTour = useCallback(async (routeId: string) => {
    setLoading(true);
    try {
      const { createCheckoutSession, logPurchase } = await import("../api");
      const data = await createCheckoutSession(routeId);
      if (data.url && !data.demo) {
        window.location.href = data.url;
      } else {
        // Demo mode: unlock locally
        setPurchasedTours((prev) => {
          const next = new Set(prev);
          next.add(routeId);
          return next;
        });
        logPurchase(routeId, "single", 499);
      }
    } catch {
      // Fallback
      setPurchasedTours((prev) => {
        const next = new Set(prev);
        next.add(routeId);
        return next;
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const purchaseBundle = useCallback(async (type: "city-bundle" | "all-access") => {
    setLoading(true);
    try {
      const { createCheckoutSession, logPurchase } = await import("../api");
      const data = await createCheckoutSession(undefined, type);
      if (data.url && !data.demo) {
        window.location.href = data.url;
      } else {
        setPurchasedTours((prev) => {
          const next = new Set(prev);
          next.add(type);
          return next;
        });
        logPurchase(type, "bundle", type === "all-access" ? 2999 : 1499);
      }
    } catch {
      setPurchasedTours((prev) => {
        const next = new Set(prev);
        next.add(type);
        return next;
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PurchaseContext.Provider value={{ purchasedTours, hasAccess, purchaseTour, purchaseBundle, loading }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  return useContext(PurchaseContext);
}
