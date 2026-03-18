import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const handleMouse = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 8}px, ${pos.current.y - 8}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    if (dotRef.current) dotRef.current.style.display = "block";

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9998] hidden"
      style={{
        background: "hsl(263 70% 50%)",
        boxShadow: "0 0 16px hsl(263 70% 50% / 0.6), 0 0 40px hsl(270 95% 65% / 0.3)",
        mixBlendMode: "screen",
        display: "none",
      }}
    />
  );
};

export default CustomCursor;
