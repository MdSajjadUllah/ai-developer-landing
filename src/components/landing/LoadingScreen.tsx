import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LOADING_DURATION = 1200;

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), LOADING_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="text-4xl font-bold font-heading tracking-wider text-foreground"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            MCODE
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
