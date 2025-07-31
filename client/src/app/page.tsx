import Intro from "@/components/Intro/Intro";
import 'leaflet/dist/leaflet.css';
import GeneralHeader from "@/components/Header/GeneralHeader";
import { Metadata } from "next";
import Footer from "@/components/Footer/Footer";


export const metadata : Metadata = {
    title: "Crimexis By Alpha Tech",
    icons: {
        icon:'./favicon.ico'
    }
}
export default function HomePage() {
  return (
    <div>
      <GeneralHeader/>
      <Intro/>
      <Footer/>
    </div>
  );
}
