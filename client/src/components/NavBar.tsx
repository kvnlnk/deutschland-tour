interface NavBarProps {
  dark: boolean;
  onToggleDark: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function NavBar({ dark, onToggleDark, onNavigate, currentPage }: NavBarProps) {
  const links = [
    { id: "home", label: "Start" },
    { id: "tours", label: "Touren" },
    { id: "custom", label: "Meine Touren" },
    { id: "pricing", label: "Preise" },
    { id: "about", label: "Über uns" },
  ];

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-content">
        <button className="navbar-logo" onClick={() => onNavigate("home")}>
          🇩🇪 <span className="navbar-logo-text">Deutschland Tour</span>
        </button>
        <div className="navbar-links">
          {links.map((link) => (
            <button
              key={link.id}
              className={`navbar-link ${currentPage === link.id ? "navbar-link--active" : ""}`}
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          className="navbar-dark-toggle"
          onClick={onToggleDark}
          title={dark ? "Helles Design" : "Dunkles Design"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {dark ? (
              <>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </>
            ) : (
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
}
