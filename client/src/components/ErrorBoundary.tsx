import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", minHeight: "100vh", padding: "2rem",
          textAlign: "center", background: "var(--color-bg, #f8f6f2)",
          color: "var(--color-text, #1a1a2e)", gap: "1rem"
        }}>
          <span style={{ fontSize: "3rem" }}>⚠️</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Oops! Etwas ist schiefgelaufen.</h2>
          <p style={{ color: "var(--color-text-muted, #6b7280)", maxWidth: "400px" }}>
            {this.state.error?.message || "Ein unerwarteter Fehler ist aufgetreten."}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.75rem 2rem", borderRadius: "8px",
              background: "var(--color-accent, #d4a853)",
              color: "var(--color-primary, #0f2b3d)",
              fontWeight: 600, border: "none", cursor: "pointer",
              fontSize: "0.95rem"
            }}
          >
            Neu laden
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
