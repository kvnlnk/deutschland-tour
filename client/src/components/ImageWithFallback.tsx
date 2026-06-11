import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  gradient?: string;
}

const GRADIENTS: Record<string, string> = {
  default: "linear-gradient(135deg, #0f2b3d 0%, #1a4563 100%)",
  berlin: "linear-gradient(135deg, #1a365d 0%, #2a4a7f 100%)",
  hamburg: "linear-gradient(135deg, #2d5016 0%, #4a7a2e 100%)",
  muenchen: "linear-gradient(135deg, #8b4513 0%, #b8860b 100%)",
};

function getGradientForAlt(alt: string): string {
  const cityMap: Record<string, string> = {
    berlin: "berlin",
    hamburg: "hamburg",
    münchen: "muenchen",
    munich: "muenchen",
  };
  const key = Object.keys(cityMap).find((k) =>
    alt.toLowerCase().includes(k)
  );
  return key ? GRADIENTS[cityMap[key]] : GRADIENTS.default;
}

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  aspectRatio = "16/9",
  gradient,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const bgGradient = gradient || getGradientForAlt(alt);

  if (failed) {
    return (
      <div
        className={`image-fallback ${className}`}
        style={{
          aspectRatio,
          background: bgGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          position: "relative",
          overflow: "hidden",
        }}
        aria-label={alt}
      >
        {/* Dekorative Kreise */}
        <svg
          viewBox="0 0 200 200"
          style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            opacity: 0.15,
          }}
        >
          <circle cx="50" cy="50" r="80" fill="white" />
          <circle cx="160" cy="120" r="60" fill="white" />
          <circle cx="30" cy="170" r="40" fill="white" />
        </svg>
        <span
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.8rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          📍 {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ aspectRatio }}
    />
  );
}
