import About from "./components/about";
import Advertising from "./components/advertising";
import All from "./components/all";
import Cases from "./components/cases/cases";
import Faq from "./components/faq";
import HeroSection from "./components/hero-section";
import OurEcosystem from "./components/our-ecosystem";
import StagesOfWork from "./components/stagesOfWork";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Advertising />
      <OurEcosystem />
      <StagesOfWork />
      <All />
      <Cases />
      <Faq />
    </main>
  );
}
