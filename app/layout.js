import "./globals.css";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "GSN Consulting | IT and Non-IT Hiring & Consulting",
  description: "GSN Consulting hires engineers, analysts, sales, HR and finance talent, and consults on workforce and technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteChrome><main>{children}</main></SiteChrome>
      </body>
    </html>
  );
}
