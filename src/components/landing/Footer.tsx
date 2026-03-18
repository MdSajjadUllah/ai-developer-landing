const Footer = () => {
  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "API Status"] },
    { title: "Developers", links: ["Documentation", "SDKs", "API Reference", "Guides"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] },
  ];

  return (
    <footer className="border-t border-border py-12 md:py-16 px-5 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <span className="text-xl font-bold font-heading tracking-widest text-foreground">MCODE</span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-nav">
              Email infrastructure for modern developers.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4 font-nav">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-nav min-h-[44px] inline-flex items-center">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 md:mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground italic font-nav">
            Built for developers. Trusted at scale.
          </p>
          <p className="text-xs text-muted-foreground/50 font-nav">
            © 2026 MCODE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
