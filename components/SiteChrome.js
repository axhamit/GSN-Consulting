"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return children;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingButtons />
    </>
  );
}
