import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

interface SearchSuggestion {
  text: string;
  type: "city" | "landmark" | "category";
}

const suggestions: SearchSuggestion[] = [
  { text: "Berlin", type: "city" },
  { text: "München", type: "city" },
  { text: "Hamburg", type: "city" },
  { text: "Brandenburger Tor", type: "landmark" },
  { text: "Reichstag", type: "landmark" },
  { text: "Hofbräuhaus", type: "landmark" },
  { text: "Speicherstadt", type: "landmark" },
  { text: "Elbphilharmonie", type: "landmark" },
  { text: "Historisch", type: "category" },
  { text: "Architektur", type: "category" },
  { text: "Kulinarisch", type: "category" },
  { text: "Natur", type: "category" },
];

export default function SearchBar({
  onSearch,
  placeholder = "Wohin willst du? Stadt, Sehenswürdigkeit…",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? suggestions.filter((s) =>
        s.text.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions.slice(0, 6);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = (value: string) => {
    setQuery(value);
    setShowSuggestions(false);
    onSearch(value);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && selectedIdx >= 0) {
      handleSubmit(filtered[selectedIdx].text);
    } else if (e.key === "Enter" && query.trim()) {
      handleSubmit(query.trim());
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <div className="search-bar">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setSelectedIdx(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => {
              setQuery("");
              setShowSuggestions(true);
              inputRef.current?.focus();
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {showSuggestions && filtered.length > 0 && (
        <div className="search-suggestions">
          {filtered.map((s, i) => (
            <button
              key={s.text}
              className={`search-suggestion ${i === selectedIdx ? "search-suggestion--selected" : ""}`}
              onClick={() => handleSubmit(s.text)}
              onMouseEnter={() => setSelectedIdx(i)}
            >
              <span className="search-suggestion-icon">
                {s.type === "city" ? "🏙️" : s.type === "landmark" ? "📍" : "🏷️"}
              </span>
              <span className="search-suggestion-text">{s.text}</span>
              <span className="search-suggestion-type">
                {s.type === "city" ? "Stadt" : s.type === "landmark" ? "Ort" : "Kategorie"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
