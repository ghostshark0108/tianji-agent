import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Tagline from "@/components/Tagline";
import ThreeSystems from "@/components/ThreeSystems";
import Capabilities from "@/components/Capabilities";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <PainPoints />
      <Tagline />
      <ThreeSystems />
      <Capabilities />
      <FAQ />
      <Footer />
    </main>
  );
}
