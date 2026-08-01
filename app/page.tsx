import CinematicScroll from "@/components/sections/CinematicScroll";
import Hero from "@/components/sections/Hero";
import ScrollTextOverlay from "@/components/sections/ScrollTextOverlay";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import EngineeringPrinciples from "@/components/sections/EngineeringPrinciples";
import SelectedWork from "@/components/sections/SelectedWork";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Hero block: cinematic canvas + overlaid text */}
      <div className="relative">
        <CinematicScroll />
        <Hero />
        <ScrollTextOverlay />
      </div>

      {/* Content sections */}
      <About />
      <div className="section-separator" />
      <Experience />
      <div className="section-separator" />
      <EngineeringPrinciples />
      <div className="section-separator" />
      <SelectedWork />
      <div className="section-separator" />
      <TechStack />
      <div className="section-separator" />
      <Contact />
    </>
  );
}
