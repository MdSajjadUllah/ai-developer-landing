import { motion } from "framer-motion";

const testimonials = [
  { name: "Sarah Chen", role: "CTO at FlowStack", text: "MCODE cut our delivery issues by 95%. The API is a dream to work with." },
  { name: "Marcus Rivera", role: "Lead Dev at Neonlabs", text: "Best developer experience I've seen in an email platform. Period." },
  { name: "Aisha Patel", role: "Founder at Mailbridge", text: "Switched from our old provider in 2 hours. Inbox rates went through the roof." },
];

const logos = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Supabase", "Prisma", "Railway"];
const logosReversed = [...logos].reverse();

const SocialProof = () => {
  return (
    <section className="py-16 md:py-24 px-5 md:px-12 overflow-hidden">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold font-heading text-foreground text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Loved by developers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass-card glass-card-hover p-6 md:p-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <p className="text-sm text-foreground/80 leading-relaxed italic font-nav">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-sm font-bold text-accent">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground font-nav">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-nav">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee logos */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10" style={{ background: "linear-gradient(to right, hsl(0 0% 0%), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10" style={{ background: "linear-gradient(to left, hsl(0 0% 0%), transparent)" }} />
          <div className="overflow-hidden">
            <div className="marquee-left flex gap-8 md:gap-12 items-center whitespace-nowrap py-4">
              {[...logos, ...logos].map((logo, i) => (
                <span key={i} className="text-lg md:text-xl font-bold font-nav text-muted-foreground/30 select-none">
                  {logo}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden mt-2">
            <div className="marquee-right flex gap-8 md:gap-12 items-center whitespace-nowrap py-4">
              {[...logosReversed, ...logosReversed].map((logo, i) => (
                <span key={i} className="text-lg md:text-xl font-bold font-nav text-muted-foreground/20 select-none">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
