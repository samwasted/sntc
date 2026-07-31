import { useEffect, useRef, useState } from 'react';
import RevealLayer from './components/RevealLayer';

/* ─── Asset URLs ──────────────────────────────────────────────── */
const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

/* ─── Lithos SVG Logo ─────────────────────────────────────────── */
function LithosLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/* ─── Navigation ──────────────────────────────────────────────── */
const NAV_LINKS = ['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour'] as const;

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* Left — logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <LithosLogo />
          <span className="text-white text-2xl font-playfair italic">Lithos</span>
        </div>

        {/* Center pill — desktop only */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
              className={
                label === 'Course'
                  ? 'px-4 py-1.5 rounded-full text-sm font-medium text-white bg-white/30 transition-colors'
                  : 'px-4 py-1.5 rounded-full text-sm font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors'
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right — desktop sign up + mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            id="nav-signup"
            className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </button>

          {/* Hamburger — mobile only */}
          <button
            id="nav-hamburger"
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Open menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="fixed top-16 left-4 right-4 z-[99] bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col gap-1">
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              className="text-white/90 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/10 text-left transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="border-t border-white/20 mt-2 pt-2">
            <button className="w-full bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
export default function App() {
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;
      setCursorPos({ x: smoothRef.current.x, y: smoothRef.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navigation />

      <section
        className="relative w-full overflow-hidden bg-black h-screen"
        style={{ height: '100dvh' }}
      >
        {/* Layer 1 — Base image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Layer 2 — Cursor-reveal image (z-30, handled inside RevealLayer) */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Layer 3 — Heading */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Layers hold
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        {/* Layer 4 — Bottom-left paragraph */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to
            drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        {/* Layer 5 — Bottom-right CTA block */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >

        </div>
      </section>
    </div>
  );
}
