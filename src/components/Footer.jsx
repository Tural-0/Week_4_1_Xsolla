import "../styles/footer.css";

export default function Footer({ theme, onToggleTheme }) {
  return (
    <footer className="footer">
      <p>© 2026 GameStore</p>

      <button
        className="theme-button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
      </button>
    </footer>
  );
}