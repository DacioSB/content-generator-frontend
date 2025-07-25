import { About } from "../../components/About";
import { Features } from "../../components/Features";
import { Footer } from "../../components/Footer";
import { Hero } from "../../components/Hero";
import { Navbar } from "../../components/Navbar";
import { Pricing } from "../../components/Pricing";



export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
}