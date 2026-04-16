export const GOOGLE_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Source Sans Pro",
  "Raleway",
  "Nunito",
  "Ubuntu",
  "Merriweather",
  "Playfair Display",
  "PT Sans",
  "Noto Sans",
  "Rubik",
  "Work Sans",
  "DM Sans",
  "Outfit",
  "Space Grotesk",
  "Plus Jakarta Sans",
  "Manrope",
  "Sora",
  "Urbanist",
  "Figtree",
  "Geist",
  "Bricolage Grotesque",
  "Bitter",
  "Crimson Text",
  "Libre Baskerville",
  "Cormorant Garamond",
] as const;

export function googleFontUrl(families: string[]): string {
  const params = families
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@300;400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
