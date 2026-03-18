import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, BarChart3, Activity, Webhook, Layout, Users } from "lucide-react";

const features = [
  {
    icon: Code, title: "Transactional API",
    desc: "Send emails with a single API call. Reliable, fast, developer-first.",
    detail: "RESTful API with SDKs for Node.js, Python, Ruby, Go, and PHP. Automatic retries, rate limiting, and detailed delivery logs out of the box.",
    tall: true,
  },
  {
    icon: BarChart3, title: "Marketing Campaigns",
    desc: "Design, schedule, and automate campaigns with powerful segmentation.",
    detail: "Visual drag-and-drop campaign builder with A/B testing, dynamic content blocks, and audience segmentation based on user behavior.",
    tall: false,
  },
  {
    icon: Activity, title: "Analytics Dashboard",
    desc: "Real-time metrics. Opens, clicks, bounces — all in one place.",
    detail: "Live dashboards with exportable reports. Track deliverability trends, engagement heatmaps, and per-recipient activity timelines.",
    tall: false,
  },
  {
    icon: Webhook, title: "Webhooks & Events",
    desc: "Get notified instantly. Track every event in your pipeline.",
    detail: "Subscribe to 20+ event types including opens, clicks, bounces, complaints, and unsubscribes. Webhook signatures for security.",
    tall: true,
  },
  {
    icon: Layout, title: "Template Engine",
    desc: "Build beautiful emails with a drag-and-drop editor or pure code.",
    detail: "Handlebars-compatible template syntax with reusable partials, dynamic variables, and version history. Preview across 90+ email clients.",
    tall: false,
  },
  {
    icon: Users, title: "Team Collaboration",
    desc: "Invite your team. Role-based access with audit logs.",
    detail: "Granular permissions for teams of any size. SSO/SAML support, audit trail, and approval workflows for campaign sends.",
    tall: false,
  },
];

const Features = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (title: string) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <section className="py-16 md:py-24 px-5 md:px-12">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold font-heading text-foreground text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built for scale
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-12 md:mb-16 max-w-lg mx-auto font-nav text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Everything you need to send, track, and optimize email at any scale.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => {
            const isExpanded = expanded === f.title;
            return (
              <motion.div
                key={f.title}
                className={`glass-card glass-card-hover p-6 md:p-8 flex flex-col gap-4 cursor-pointer ${f.tall ? "md:row-span-2" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => toggle(f.title)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(f.title); } }}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                layout
              >
                <f.icon className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                <h3 className="text-lg md:text-xl font-bold font-heading text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-nav">{f.desc}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      className="text-sm text-foreground/60 leading-relaxed font-nav"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {f.detail}
                    </motion.p>
                  )}
                </AnimatePresence>

                {f.tall && (
                  <div className="flex-1 flex items-end">
                    <div className="w-full h-24 rounded-md bg-secondary/50 flex items-end gap-1 p-2">
                      {[40, 65, 45, 80, 55, 70, 90, 60].map((h, j) => (
                        <motion.div
                          key={j}
                          className="flex-1 rounded-sm bg-primary"
                          style={{ height: `${h}%` }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + j * 0.05, duration: 0.4 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
