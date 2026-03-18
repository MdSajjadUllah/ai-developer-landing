import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const codeExamples: Record<string, { code: string; lang: string }> = {
  "Node.js": {
    lang: "javascript",
    code: `import { Mcode } from '@mcode/sdk';

const mcode = new Mcode('mc_live_key_xxxx');

await mcode.emails.send({
  from: 'hello@yourapp.com',
  to: 'user@example.com',
  subject: 'Welcome aboard!',
  html: '<h1>Hello World</h1>',
});`,
  },
  Python: {
    lang: "python",
    code: `from mcode import Mcode

client = Mcode(api_key="mc_live_key_xxxx")

client.emails.send(
    from_email="hello@yourapp.com",
    to="user@example.com",
    subject="Welcome aboard!",
    html="<h1>Hello World</h1>",
)`,
  },
  Ruby: {
    lang: "ruby",
    code: `require 'mcode'

client = Mcode::Client.new(api_key: 'mc_live_key_xxxx')

client.emails.send(
  from: 'hello@yourapp.com',
  to: 'user@example.com',
  subject: 'Welcome aboard!',
  html: '<h1>Hello World</h1>'
)`,
  },
  curl: {
    lang: "bash",
    code: `curl -X POST https://api.mcode.dev/v1/emails \\
  -H "Authorization: Bearer mc_live_key_xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "hello@yourapp.com",
    "to": "user@example.com",
    "subject": "Welcome aboard!",
    "html": "<h1>Hello World</h1>"
  }'`,
  },
};

// Simple syntax highlighter using spans with semantic colors
function highlightCode(code: string, lang: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, li) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    const push = (text: string, className: string) => {
      tokens.push(<span key={key++} className={className}>{text}</span>);
    };

    // Process line character by character with regex
    while (remaining.length > 0) {
      let match: RegExpMatchArray | null;

      // Comments
      if ((match = remaining.match(/^(#.*|\/\/.*)$/))) {
        push(match[0], "text-muted-foreground/60");
        remaining = "";
      }
      // Strings (double/single/backtick quoted)
      else if ((match = remaining.match(/^(['"`])(?:(?!\1|\\).|\\.)*\1/))) {
        push(match[0], "text-accent");
        remaining = remaining.slice(match[0].length);
      }
      // Keywords
      else if ((match = remaining.match(/^(import|from|const|let|var|await|async|def|class|require|return|function|new)\b/))) {
        push(match[0], "text-primary");
        remaining = remaining.slice(match[0].length);
      }
      // Flags / options (curl -H, -X, -d)
      else if (lang === "bash" && (match = remaining.match(/^-[A-Za-z]+/))) {
        push(match[0], "text-primary");
        remaining = remaining.slice(match[0].length);
      }
      // URLs
      else if ((match = remaining.match(/^https?:\/\/[^\s'"\\]+/))) {
        push(match[0], "text-accent");
        remaining = remaining.slice(match[0].length);
      }
      // Property keys (before colon)
      else if ((match = remaining.match(/^([a-zA-Z_]\w*)\s*[:=]/))) {
        push(match[1], "text-foreground");
        remaining = remaining.slice(match[1].length);
      }
      // Method calls (.send, .new etc)
      else if ((match = remaining.match(/^\.([a-zA-Z_]\w*)/))) {
        push(match[0], "text-foreground/90");
        remaining = remaining.slice(match[0].length);
      }
      // Default: single character
      else {
        push(remaining[0], "text-foreground/70");
        remaining = remaining.slice(1);
      }
    }

    return (
      <span key={li}>
        {tokens}
        {li < lines.length - 1 ? "\n" : ""}
      </span>
    );
  });
}

const langs = Object.keys(codeExamples);

function TypedCode({ code, lang }: { code: string; lang: string }) {
  const [charCount, setCharCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const ref = useRef<HTMLPreElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    setCharCount(0);
    setTypingDone(false);
  }, [code]);

  useEffect(() => {
    if (!inView) return;
    if (charCount >= code.length) {
      setTypingDone(true);
      return;
    }
    const timer = setTimeout(() => setCharCount((c) => c + 1), 10);
    return () => clearTimeout(timer);
  }, [inView, charCount, code]);

  const displayed = code.slice(0, charCount);
  const highlighted = useMemo(() => highlightCode(displayed, lang), [displayed, lang]);

  return (
    <pre ref={ref} className="text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap min-h-[180px] md:min-h-[200px]">
      {highlighted}
      {!typingDone && <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-0.5 align-middle" />}
    </pre>
  );
}

const CodeShowcase = () => {
  const [active, setActive] = useState("Node.js");
  const tabIndex = langs.indexOf(active);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive(langs[(tabIndex + 1) % langs.length]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(langs[(tabIndex - 1 + langs.length) % langs.length]);
    }
  }, [tabIndex]);

  return (
    <section className="py-16 md:py-24 px-5 md:px-12">
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          className="text-3xl md:text-5xl font-bold font-heading text-foreground text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Drop-in ready
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-10 md:mb-12 text-sm md:text-base font-nav"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Send your first email in under 5 minutes.
        </motion.p>

        <motion.div
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30 overflow-x-auto"
            role="tablist"
            aria-label="Code language"
            onKeyDown={handleKeyDown}
          >
            <span className="w-3 h-3 rounded-full bg-destructive/60 flex-shrink-0" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60 flex-shrink-0" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-green-500/60 flex-shrink-0" aria-hidden="true" />
            <span className="flex-1" />
            {langs.map((lang) => (
              <button
                key={lang}
                role="tab"
                aria-selected={active === lang}
                tabIndex={active === lang ? 0 : -1}
                onClick={() => setActive(lang)}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 whitespace-nowrap min-h-[36px] ${
                  active === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="p-4 md:p-6" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <TypedCode code={codeExamples[active].code} lang={codeExamples[active].lang} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeShowcase;
