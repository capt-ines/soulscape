import { Nunito } from "next/font/google"; //next module. It downloads font files at build time and hosts them with your other static assets.
export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});
