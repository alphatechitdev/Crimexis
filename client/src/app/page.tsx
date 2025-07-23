import Image from "next/image";
import styles from "./page.module.css";
import Home from "@/components/Home/Home";
import Header from "@/components/Header/Header";
import Intro from "@/components/Intro/Intro";
import 'leaflet/dist/leaflet.css';
import GeneralHeader from "@/components/Header/GeneralHeader";
export default function HomePage() {
  return (
    <div>
      <GeneralHeader/>
      <Intro/>
    </div>
  );
}
