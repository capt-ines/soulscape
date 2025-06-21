export type Theme = {
  key: string;
  label: string;
  swatch: string;
  type: "light" | "dark";
  palette: string[];
};

export type ThemeState = {
  currentTheme: null | Theme;
  storedThemes: Theme[];
  setTheme: (theme: Theme) => void;
  getThemeFromCookie: () => void;
};
