import { useEffect, useRef } from 'react';

const SPOTLIGHT_R = 260;

export default function RevealLayer({ image }) {
  const divRef    = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    // Both conditions must be false for the spotlight to be active
    const mqWidth = window.matchMedia('(max-width: 767px)');
    const mqHover = window.matchMedia('(hover: none)');

    const isMobile = () => mqWidth.matches || mqHover.matches;

    const hide = () => {
      cancelAnimationFrame(rafRef.current);
      div.style.opacity       = '0';
      div.style.maskImage        = 'none';
      div.style.webkitMaskImage  = 'none';
    };

    const loop = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;
      const { x, y } = smoothRef.current;

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
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (isMobile()) { hide(); return; }
      div.style.opacity = '1';
      rafRef.current = requestAnimationFrame(loop);
    };

    const stop = () => hide();

    const onQueryChange = () => {
      if (isMobile()) { stop(); } else { start(); }
    };

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove);
    mqWidth.addEventListener('change', onQueryChange);
    mqHover.addEventListener('change', onQueryChange);

    // Initial state on mount
    start();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      mqWidth.removeEventListener('change', onQueryChange);
      mqHover.removeEventListener('change', onQueryChange);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position:            'absolute',
        inset:               0,
        backgroundImage:     `url(${image})`,
        backgroundSize:      'cover',
        backgroundPosition:  'center',
        backgroundRepeat:    'no-repeat',
        zIndex:              30,
        pointerEvents:       'none',
        opacity:             0,         // hidden until effect decides it should show
        maskImage:           'none',
        WebkitMaskImage:     'none',
      }}
    />
  );
}
