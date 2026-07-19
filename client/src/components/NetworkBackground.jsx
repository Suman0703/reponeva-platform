import { useEffect, useRef } from "react";

// Draws a drifting network of connected nodes on canvas.
// Canvas (not SVG/DOM nodes) because we're animating 40-60 points every
// frame — doing that with DOM elements would mean 40-60 style recalculations
// per frame, which gets janky fast. Canvas just repaints pixels.
export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-color-scheme: reduce)"
    ).matches;

    let width, height, nodes, animationId;
    const NODE_COUNT = 45;
    const CONNECT_DISTANCE = 150;

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Move nodes, bounce softly off edges
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw connections first (so nodes render on top)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            // Fade line opacity by distance — closer nodes = more visible link
            const opacity = 1 - dist / CONNECT_DISTANCE;
            ctx.strokeStyle = `rgba(46, 230, 166, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(46, 230, 166, 0.5)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    if (!prefersReducedMotion) {
      draw();
    } else {
      // Still render one static frame so the layout doesn't look broken
      draw();
      cancelAnimationFrame(animationId);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}