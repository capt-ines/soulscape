import { Libre_Baskerville, Nunito } from "next/font/google"; //next module. It downloads font files at build time and hosts them with your other static assets.

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const librebaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-librebaskerville",
});
//TODO: fix FOUC !!!!! idk why optimized fonts wont work as expected
