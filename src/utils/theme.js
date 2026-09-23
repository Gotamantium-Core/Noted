const THEME_KEY = "theme";
const LIGHT_FAVICON = "/noted_icon_light.ico";
const DARK_FAVICON = "/noted_icon_dark.ico";

export function getInitialTheme() {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === "dark" || saved === "light") {
            return saved;
        }
    } catch {
        // Fall through to system preference.
    }

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    }

    return "light";
}

export function applyTheme(theme) {
    const dark = theme === "dark";

    document.documentElement.classList.toggle("dark", dark);

    const favicon = document.getElementById("favicon");
    if (favicon) {
        favicon.href = dark ? DARK_FAVICON : LIGHT_FAVICON;
    }
}

export function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch {
        // Storage unavailable; theme still applies for this session.
    }
}