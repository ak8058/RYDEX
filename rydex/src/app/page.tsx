import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Nav from "@/components/Nav";
import PublicHome from "@/components/PublicHome";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Nav />
      <PublicHome />
      <Footer />
    </div>
  );
}
