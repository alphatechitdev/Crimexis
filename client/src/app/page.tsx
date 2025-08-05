import Intro from "@/components/Intro/Intro";
import 'leaflet/dist/leaflet.css';
import GeneralHeader from "@/components/Header/GeneralHeader";
import { Metadata } from "next";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Crimexis | Smart Crime Monitoring by AlphaTech",
  description:
    "Crimexis by AlphaTech is an advanced smart crime monitoring and prediction platform. Harnessing IoT, AI, and real-time data visualization to make cities safer and smarter.",
  keywords: [
    "Crimexis",
    "AlphaTech",
    "Crime Monitoring System",
    "Smart Surveillance",
    "IoT Security",
    "Crime Prediction",
    "Pakistan Crime Tech",
    "AI in Policing",
    "Real-time Crime Map",
    "Smart City Security",
  ],
  icons: {
    icon: "/favicon.ico", // use / instead of ./ for public path
  },
  authors: [{ name: "AlphaTech", url: "https://alphatechit.dev" }],
  creator: "AlphaTech",
  publisher: "AlphaTech",
  metadataBase: new URL("https://crimexis.alphatechit.dev"),

  openGraph: {
    title: "Crimexis | Smart Crime Monitoring by AlphaTech",
    description:
      "Explore Crimexis, a cutting-edge solution from AlphaTech that leverages IoT, AI, and real-time data to fight crime efficiently and intelligently.",
    url: "https://crimexis.alphatechit.dev",
    siteName: "Crimexis",
    images: [
      {
        url: "https://crimexis.alphatechit.dev/CrimexisPic.png", // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Crimexis Hotspots Results/Dashboard Pic By AlphaTech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div>
      <GeneralHeader />
      <Intro />
      <Footer />
    </div>
  );
}
