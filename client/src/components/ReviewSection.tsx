import { useState, useEffect } from "react";
import type { Review } from "../types";

interface ReviewSectionProps {
  routeId: string;
  routeName: string;
}

const LOCAL_KEY = "deutschland-tour-reviews";

function getLocalReviews(routeId: string): Review[] {
  try {
    const all: Record<string, Review[]> = JSON.parse(
      localStorage.getItem(LOCAL_KEY) || "{}"
    );
    return all[routeId] || [];
  } catch {
    return [];
  }
}

function getLocalAverage(routeId: string): { avg: number; count: number } {
  const reviews = getLocalReviews(routeId);
  if (reviews.length === 0) return { avg: 0, count: 0 };
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return { avg: +(sum / reviews.length).toFixed(1), count: reviews.length };
}

export default function ReviewSection({ routeId, routeName }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ avg: 0, count: 0 });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [apiMode, setApiMode] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [routeId]);

  async function loadReviews() {
    // Try API first
    try {
      const { fetchReviews } = await import("../api");
      const result = await fetchReviews(routeId);
      if (result.reviews.length > 0) {
        setReviews(result.reviews);
        setStats(result.stats);
        setApiMode(true);
        return;
      }
    } catch {
      // API failed, use local
    }

    // Fallback to localStorage
    const local = getLocalReviews(routeId);
    setReviews(local);
    setStats(getLocalAverage(routeId));
    setApiMode(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      routeId,
      rating,
      comment: comment.trim(),
      author: author.trim() || "Anonym",
      date: new Date().toLocaleDateString("de-DE"),
    };

    // Try API
    let posted = false;
    try {
      const { postReview } = await import("../api");
      const result = await postReview(routeId, newReview.author, rating, comment);
      posted = result.success;
    } catch {
      posted = false;
    }

    if (posted) {
      setApiMode(true);
      // Reload from API
      loadReviews();
    } else {
      // Fallback to localStorage
      const all: Record<string, Review[]> = JSON.parse(
        localStorage.getItem(LOCAL_KEY) || "{}"
      );
      all[routeId] = [newReview, ...(all[routeId] || [])];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
      setReviews(all[routeId]);
      setStats(getLocalAverage(routeId));
    }

    setRating(0);
    setComment("");
    setAuthor("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const renderStars = (value: number, interactive = false) => (
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type={interactive ? "button" : undefined}
          className={`review-star ${s <= (interactive ? hoverRating || rating : value) ? "review-star--filled" : ""}`}
          onClick={interactive ? () => setRating(s) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(s) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          disabled={!interactive}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={s <= (interactive ? hoverRating || rating : value) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );

  return (
    <div className="review-section">
      <div className="review-header">
        <h3 className="review-title">Bewertungen</h3>
        {stats.count > 0 && (
          <div className="review-summary">
            <span className="review-avg">{stats.avg}</span>
            {renderStars(Math.round(stats.avg))}
            <span className="review-count">({stats.count})</span>
          </div>
        )}
      </div>

      {/* Submit Form */}
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="review-form-row">
          <label className="review-label">Deine Bewertung</label>
          {renderStars(rating, true)}
        </div>
        <input
          className="review-input"
          placeholder="Dein Name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={30}
        />
        <textarea
          className="review-textarea"
          placeholder="Wie war die Tour? Tipp, Highlight, Verbesserung…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          maxLength={500}
        />
        <button
          className="btn btn-primary review-submit"
          type="submit"
          disabled={rating === 0}
        >
          {submitted ? "✓ Abgeschickt!" : "Bewertung abgeben"}
        </button>
      </form>

      {/* List */}
      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="review-empty">
            Noch keine Bewertungen. Sei der Erste!
          </p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-item">
              <div className="review-item-header">
                <span className="review-item-author">{r.author}</span>
                <span className="review-item-date">{r.date}</span>
              </div>
              {renderStars(r.rating)}
              {r.comment && <p className="review-item-comment">{r.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
