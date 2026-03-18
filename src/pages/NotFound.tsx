import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(263 70% 50% / 0.2) 0%, hsl(270 95% 65% / 0.08) 40%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[120px] md:text-[180px] font-extrabold font-heading text-foreground leading-none tracking-tight">
            4
            <span className="text-primary">0</span>
            4
          </h1>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl font-bold font-heading text-foreground mt-4 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Lost in the void
        </motion.h2>

        <motion.p
          className="text-muted-foreground font-nav text-sm md:text-base max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          This route doesn't exist — like an email that never left the outbox.
          <br />
          <span className="font-mono text-xs text-muted-foreground/50 mt-2 block">
            {location.pathname}
          </span>
        </motion.p>

        <motion.a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-sm font-nav font-medium transition-all duration-300 hover:scale-[1.02] min-h-[44px]"
          style={{ boxShadow: "0 0 30px hsl(263 70% 50% / 0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to MCODE
        </motion.a>
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </div>
  );
};

export default NotFound;
