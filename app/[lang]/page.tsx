import CinematicScroll from "@/components/sections/CinematicScroll";
import Hero from "@/components/sections/Hero";
import ScrollTextOverlay from "@/components/sections/ScrollTextOverlay";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import EngineeringPrinciples from "@/components/sections/EngineeringPrinciples";
import SelectedWork from "@/components/sections/SelectedWork";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Preloader from "@/components/shared/Preloader";

export default function Home() {
  // The preloader streams the hero frames — home page only
  return (
    <Preloader>
      {/* Hero block: cinematic canvas + overlaid text */}
      {/* The portrait sequence is shot on a dark stage — it stays dark in both themes */}
      <div className="relative stage-dark">
        <CinematicScroll />
        <Hero />
        <ScrollTextOverlay />
        <div aria-hidden="true" className="stage-fade absolute bottom-0 inset-x-0 h-[45vh] pointer-events-none z-30" />
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
    </Preloader>
  );
}
