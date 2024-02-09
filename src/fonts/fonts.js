import { Chonburi, Mulish } from "next/font/google";

export const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-mulish",
  style: ["normal", "italic"],
});

export const chonburi = Chonburi({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-chonburi",
  style: ["normal"],
});
