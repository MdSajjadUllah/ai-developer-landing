import { useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { LOADING_DURATION } from "./LoadingScreen";
import { useIsMobile } from "@/hooks/use-mobile";
import robotFallback from "@/assets/robot-fallback.png";

const RobotScene = lazy(() => import("./RobotScene"));

const heroWords = ["EMAIL", "FOR", "DEVELOPERS"];
const BASE_DELAY = (LOADING_DURATION + 400) / 1000;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="hero-glow" />

      <div className="container mx-auto px-5 md:px-12 flex flex-col lg:flex-row items-center gap-8 relative z-10">
        {/* Left text */}
        <div className="w-full lg:w-[45%] flex flex-col gap-5 md:gap-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-nav w-fit animate-pulse-glow"
            style={{
              border: "1px solid hsl(263 70% 50% / 0.5)",
              background: "linear-gradient(135deg, hsl(263 70% 50% / 0.1), hsl(270 95% 65% / 0.05))",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE_DELAY }}
          >
            <span className="text-muted-foreground">INTRODUCING</span>
            <span className="text-accent">Δ</span>
          </motion.div>

          <h1 className="text-[48px] md:text-7xl font-extrabold font-heading uppercase leading-[0.95] tracking-tight">
            {heroWords.map((word, i) => (
              <motion.span
                key={word}
                className="block text-foreground"
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                transition={{ delay: BASE_DELAY + 0.1 + i * 0.15, duration: 0.6, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-muted-foreground text-sm md:text-lg max-w-md leading-relaxed font-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: BASE_DELAY + 0.6, duration: 0.6 }}
          >
            The best way to reach humans instead of spam folders. Clever transactional and marketing emails at scale.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE_DELAY + 0.8, duration: 0.5 }}
          >
            <button className="px-6 py-3 rounded-lg border border-primary text-primary text-sm font-nav transition-all duration-300 hover:bg-primary hover:text-primary-foreground min-h-[44px]">
              Documentation →
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-foreground text-background text-sm font-nav font-medium transition-all duration-300 hover:scale-[1.02] min-h-[44px]"
              style={{ boxShadow: "0 0 0 0 transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 30px hsl(263 70% 50% / 0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 0 transparent")
              }
            >
              Get Started →
            </button>
          </motion.div>
        </div>

        {/* Right: 3D scene on desktop, static image on mobile */}
        <div className="w-full lg:w-[55%] h-[300px] sm:h-[400px] md:h-[550px]">
          {isMobile ? (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: BASE_DELAY + 0.3, duration: 0.6 }}
            >
              <img
                src={robotFallback}
                alt="MCODE Robot"
                className="h-full max-h-[280px] sm:max-h-[350px] object-contain drop-shadow-[0_0_40px_hsl(263_70%_50%_/_0.4)]"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full touch-auto">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-nav animate-pulse">Loading 3D...</span>
                  </div>
                }
              >
                <RobotScene />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
