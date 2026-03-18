import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Mail, Clock } from "lucide-react";

const stats = [
  { icon: Zap, value: 99.9, suffix: "%", label: "Delivery Rate", decimals: 1 },
  { icon: Mail, value: 2, suffix: "M+", label: "Emails/day", decimals: 0 },
  { icon: Clock, value: 200, suffix: "ms", prefix: "< ", label: "API Response", decimals: 0 },
];

function AnimatedCounter({ value, suffix, prefix, decimals }: { value: number; suffix: string; prefix?: string; decimals: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-foreground">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

const StatsBar = () => {
  return (
    <section className="py-12 md:py-16 px-5 md:px-12">
      <div className="container mx-auto">
        <div className="glass-card p-6 md:p-12 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center gap-2 md:gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" style={{ filter: "drop-shadow(0 0 8px hsl(270 95% 65% / 0.5))" }} />
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} />
              <span className="text-xs md:text-sm text-muted-foreground font-nav">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
