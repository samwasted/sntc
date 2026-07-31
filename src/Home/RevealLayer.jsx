import { useEffect, useRef } from 'react';

const SPOTLIGHT_R = 260;

export default function RevealLayer({ image }) {
  const divRef    = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    let rafId;

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;
      const { x, y } = smoothRef.current;

      // CSS radial-gradient mask — no canvas, no toDataURL, zero overhead
      const mask = [
        `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px,`,
        `  white 0%,`,
        `  white 40%,`,
        `  rgba(255,255,255,0.75) 60%,`,
        `  rgba(255,255,255,0.4)  75%,`,
        `  rgba(255,255,255,0.12) 88%,`,
        `  transparent            100%`,
        `)`,
      ].join('');

      div.style.maskImage        = mask;
      div.style.webkitMaskImage  = mask;

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 30,
        pointerEvents: 'none',
        // hidden until cursor enters viewport
        maskImage: 'none',
        WebkitMaskImage: 'none',
      }}
    />
  );
}
