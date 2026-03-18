import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    monthly: { price: "$0", period: "/mo" },
    yearly: { price: "$0", period: "/yr" },
    desc: "For side projects and testing.",
    features: ["1,000 emails/mo", "Transactional API", "Basic analytics", "Community support"],
    popular: false,
  },
  {
    name: "Pro",
    monthly: { price: "$29", period: "/mo" },
    yearly: { price: "$290", period: "/yr" },
    desc: "For growing products.",
    features: ["50,000 emails/mo", "Marketing campaigns", "Advanced analytics", "Webhooks", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: { price: "Custom", period: "" },
    yearly: { price: "Custom", period: "" },
    desc: "For teams at scale.",
    features: ["Unlimited emails", "Dedicated IP", "SLA guarantee", "Custom integrations", "24/7 support"],
    popular: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-16 md:py-24 px-5 md:px-12">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold font-heading text-foreground text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple pricing
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-8 font-nav text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Start free. Scale as you grow.
        </motion.p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
          <span className={`text-sm font-nav transition-colors duration-200 ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative w-14 h-7 rounded-full bg-secondary border border-border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] min-w-[56px] flex items-center"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly pricing"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setYearly(!yearly); } }}
          >
            <motion.div
              className="absolute top-1 w-5 h-5 rounded-full"
              style={{ background: "linear-gradient(135deg, hsl(263 70% 50%), hsl(270 95% 65%))" }}
              animate={{ left: yearly ? "calc(100% - 24px)" : "4px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-nav transition-colors duration-200 ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly <span className="text-accent text-xs">(save 17%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => {
            const tier = yearly ? plan.yearly : plan.monthly;
            return (
              <motion.div
                key={plan.name}
                className="glass-card glass-card-hover p-6 md:p-8 flex flex-col gap-5 md:gap-6 relative"
                style={
                  plan.popular
                    ? { border: "1px solid hsl(263 70% 50% / 0.5)", boxShadow: "0 0 40px hsl(263 70% 50% / 0.15)" }
                    : undefined
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold font-nav bg-primary text-primary-foreground rounded-full">
                    POPULAR
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold font-heading text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-nav">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={tier.price}
                      className="text-3xl md:text-4xl font-bold font-heading text-foreground"
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: 90, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ display: "inline-block", transformOrigin: "bottom" }}
                    >
                      {tier.price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-muted-foreground text-sm font-nav">{tier.period}</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80 font-nav">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-auto py-3 rounded-lg text-sm font-nav font-medium transition-all duration-300 min-h-[44px] ${
                    plan.popular
                      ? "bg-foreground text-background hover:scale-[1.02]"
                      : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  Get started
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
