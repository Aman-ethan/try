import { Roboto } from "next/font/google";

const fontFamily = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default fontFamily;
