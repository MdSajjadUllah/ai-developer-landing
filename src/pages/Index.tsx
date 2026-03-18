import LoadingScreen from "@/components/landing/LoadingScreen";
import CustomCursor from "@/components/landing/CustomCursor";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import Features from "@/components/landing/Features";
import CodeShowcase from "@/components/landing/CodeShowcase";
import SocialProof from "@/components/landing/SocialProof";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="stats">
          <StatsBar />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="code">
          <CodeShowcase />
        </section>
        <section id="social">
          <SocialProof />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Index;
