import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextStretch.css';

gsap.registerPlugin(ScrollTrigger);

export default function TextStretch() {
  /* ── Section 1: "WE IGNITE …" ──────────────────────────────── */
  const s1Ref     = useRef(null);
  const eTopRef   = useRef(null);
  const eMidRef   = useRef(null);
  const eBotRef   = useRef(null);
  const igniteRef = useRef(null);
  const thatRef   = useRef(null);
  const lastsRef  = useRef(null);
  const subRef    = useRef(null);

  /* ── Section 2: Technex reveal ──────────────────────────────── */
  const s2Ref        = useRef(null);
  const techLabelRef = useRef(null);
  const techH2Ref    = useRef(null);
  const techDescRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ────────────────────────────────────────────────────────────
       * SECTION 1  — pinned for ~300vh
       * ──────────────────────────────────────────────────────── */
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: s1Ref.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=300%',
          anticipatePin: 1,
        },
      });

      // E's top bar — one continuous tween, ends exactly at the viewBox edge
      tl1.to(eTopRef.current, {
        attr: { width: 670 }, // 800 (viewBox width) − 130 (g translate + rect x offset)
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0);

      tl1.to(eBotRef.current, {
        attr: { width: 42 * 2.5 },
        duration: 0.4,
        ease: 'power2.inOut',
      }, 0);

      tl1.to(eMidRef.current, {
        attr: { width: 32 * 2.5 },
        duration: 0.4,
        ease: 'power2.inOut',
      }, 0);

      // LASTS grows from its right edge (fixed endpoint), THAT shrinks from its left edge (fixed start)
      tl1.to(lastsRef.current, {
        scaleX: 1.1,
        letterSpacing: '0.02em',
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0);

      tl1.to(thatRef.current, {
        scaleX: 0.7,
        letterSpacing: '-0.15em',
        transformOrigin: 'left center',
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0);

      tl1.fromTo(subRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.5,
      );

      tl1.to(igniteRef.current, {
        attr: { x: 280 }, // Move back smoothly
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0);

      tl1.to(igniteRef.current, {
        fontSize: '80px', // Shrink much faster
        duration: 0.25,
        ease: 'power3.out',
      }, 0);
      /* ────────────────────────────────────────────────────────────
       * SECTION 2  — Technex reveal (pinned for ~200vh)
       * ──────────────────────────────────────────────────────── */
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: s2Ref.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=200%',
          anticipatePin: 1,
        },
      });

      tl2.fromTo(techLabelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' },
        0,
      );

      tl2.fromTo(techH2Ref.current,
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.4, ease: 'power3.out' },
        0.1,
      );

      tl2.fromTo(techDescRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.4,
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
       *  SECTION 1 — WE IGNITE INNOVATION THAT LASTS
       * ══════════════════════════════════════════════════════════ */}
      <section ref={s1Ref} className="ts-section">
        <div className="ts-inner">

          {/* Row 1 — WE   IGNITE */}
          <div className="ts-line ts-line--1">
            <svg
              className="ts-svg-we"
              viewBox="0 0 800 120"
              preserveAspectRatio="xMinYMid meet"
              style={{ overflow: 'visible', width: '100%', height: '1em' }}
            >
              <text x="-5" y="105" fontFamily="Inter" fontWeight="900" fontSize="120" fill="white" letterSpacing="-0.04em">W</text>
              <g transform="translate(108, 17)">
                <rect x="0" y="0" width="23" height="88" fill="white" />
                <rect ref={eTopRef} x="22" y="0" width="42" height="21" fill="white" />
                <rect ref={eMidRef} x="22" y="34" width="32" height="21" fill="white" />
                <rect ref={eBotRef} x="22" y="67" width="42" height="21" fill="white" />
              </g>
              <text ref={igniteRef} x="200" y="105" fontFamily="Inter" fontWeight="900" fill="white" letterSpacing="-0.04em" style={{ fontSize: '120px' }}>IGNITE</text>
            </svg>
          </div>

          {/* Row 2 — INNOVATION (pixelated font, slanted) */}
          <div className="ts-line ts-line--2 ts-pixel">INNOVATION</div>

          {/* Row 3 — THAT LASTS */}
          <div className="ts-line ts-line--3">
            <span ref={thatRef} className="ts-that">THAT</span>{' '}
            <span ref={lastsRef} className="ts-lasts">LASTS</span>
          </div>

          {/* Sub copy */}
          <div ref={subRef} className="ts-sub">
            <p className="ts-sub-text">
              We're IIT(BHU)'s council of ambitious creators working at the edge of technology and innovation, pushing projects from idea to reality through engineering of the highest quality.
            </p>
            <span className="ts-arrow">→</span>
            <p className="ts-sub-text">
              We don't settle, we are intentional about building with precision and creating extraordinary experiences. We go the extra mile, and then walk a couple more, just for fun.
            </p>
            <p className="ts-sub-text">
              Flagship events, cutting-edge clubs, and an unstoppable community. Here's love for all the builders.
            </p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
       *  SECTION 2 — Technex reveal
       * ══════════════════════════════════════════════════════════ */}
      <section ref={s2Ref} className="ts-section ts-section--tech">
        <div className="ts-inner">

          <span ref={techLabelRef} className="ts-tech-label">
            <span className="ts-label-dot" />
            TECHNEX
          </span>

          <h2 ref={techH2Ref} className="ts-tech-heading">
            A PEEK INTO<br />
            THE LATEST<br />
            IN TECH
          </h2>

          <div ref={techDescRef} className="ts-tech-desc">
            <div className="ts-tech-divider" />
            <p className="ts-tech-text">
              Technex is the annual techno-management festival of IIT(BHU) Varanasi — one of the largest technical extravaganzas in Asia. It brings together the brightest minds for innovation, competition, and pushing boundaries.
            </p>
          </div>

        </div>
      </section>
    </>
  );
} 