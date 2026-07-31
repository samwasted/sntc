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

  /* ── Section 2: Technex + Team + Footer (all-in-one pin) ─── */
  const s2Ref              = useRef(null);
  const techLabelRef       = useRef(null);
  const techH2Ref          = useRef(null);
  const techDescRef        = useRef(null);
  const techTextWrapperRef = useRef(null);
  const teamImgWrapperRef  = useRef(null);
  const craftGridRef       = useRef(null);
  const footerBrandRef     = useRef(null);
  const footerLinksRef     = useRef(null);

  // Craft scroll section refs
  const craftImagesRef = useRef([]);
  craftImagesRef.current = [];

  const addToCraftImages = (el) => {
    if (el && !craftImagesRef.current.includes(el)) {
      craftImagesRef.current.push(el);
    }
  };

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

      tl1.to(eTopRef.current, { attr: { width: 670 }, duration: 0.6, ease: 'power2.inOut' }, 0);
      tl1.to(eBotRef.current, { attr: { width: 42 * 2.5 }, duration: 0.4, ease: 'power2.inOut' }, 0);
      tl1.to(eMidRef.current, { attr: { width: 32 * 2.5 }, duration: 0.4, ease: 'power2.inOut' }, 0);
      tl1.to(lastsRef.current, { scaleX: 1.1, letterSpacing: '0.02em', duration: 0.6, ease: 'power2.inOut' }, 0);
      tl1.to(thatRef.current, { scaleX: 0.7, letterSpacing: '-0.15em', transformOrigin: 'left center', duration: 0.6, ease: 'power2.inOut' }, 0);
      tl1.fromTo(subRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.5);
      tl1.to(igniteRef.current, { attr: { x: 280 }, duration: 0.6, ease: 'power2.inOut' }, 0);
      tl1.to(igniteRef.current, { fontSize: '80px', duration: 0.25, ease: 'power3.out' }, 0);

      /* ────────────────────────────────────────────────────────────
       * SECTION 2  — one giant pin that does:
       *   phase A (0–1.6): Technex text in + images drop one by one
       *   phase B (1.6–3):  craft-grid shrinks, team img slides up,
       *                     SNTC TEAM + footer links fade in
       * ──────────────────────────────────────────────────────── */
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: s2Ref.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=500%',
          anticipatePin: 1,
        },
      });

      // ── Phase A: Technex text ──────────────────────────────────
      tl2.fromTo(techLabelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }, 0);

      tl2.fromTo(techH2Ref.current,
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.4, ease: 'power3.out' }, 0.1);

      tl2.fromTo(techDescRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.4);

      // ── Phase A: Images drop one by one ───────────────────────
      const images = craftImagesRef.current;
      if (images.length > 0) {
        tl2.from(images, {
          stagger: 0.65,
          y: -window.innerHeight,
          rotation: () => gsap.utils.random(-25, 25),
          transformOrigin: '50% 0%',
          duration: 1.5,
          ease: 'power3.out'
        }, 0);

        tl2.fromTo(images, {
          filter: 'brightness(100%)'
        }, {
          ease: 'none',
          stagger: 0.65,
          duration: 1.5,
          filter: pos => pos < images.length - 1 ? 'brightness(20%)' : 'brightness(100%)'
        }, 0);
      }

      // ── Phase B (at tl time 2.8): transition to team layout ───
      // 1. Fade out Technex text
      tl2.to(techTextWrapperRef.current, {
        opacity: 0, y: -40,
        duration: 0.4, ease: 'power2.inOut'
      }, 2.8);

      // 2. Team image slides up from bottom
      tl2.fromTo(teamImgWrapperRef.current,
        { y: '100vh', opacity: 1 },
        { y: 0, duration: 1.2, ease: 'power3.out' },
        2.8);

      // 3. Craft grid shrinks to final footer height
      tl2.to(craftGridRef.current, {
        height: 'calc(62vh - 52px)',
        duration: 1.2,
        ease: 'power3.out'
      }, 2.8);

      // 4. SNTC TEAM text and footer links fade in
      tl2.fromTo(footerBrandRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        3.5);

      tl2.fromTo(footerLinksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        3.7);

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

          <div className="ts-line ts-line--2 ts-pixel">INNOVATION</div>

          <div className="ts-line ts-line--3">
            <span ref={thatRef} className="ts-that">THAT</span>{' '}
            <span ref={lastsRef} className="ts-lasts">LASTS</span>
          </div>

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
       *  SECTION 2 — Technex → Team → Footer (single pin)
       *  Layout is a flex column: [images row] [brand] [links]
       *  Phase A shows Technex text; Phase B reveals team image
       *  and footer brand all within the same pinned viewport.
       * ══════════════════════════════════════════════════════════ */}
      <section ref={s2Ref} className="ts-section ts-section--combined" style={{ overflow: 'hidden' }}>

        {/* ── Top image row ─────────────────────────────────── */}
        <div className="ts-combined-images">

          {/* Left: Technex text OR team image */}
          <div className="ts-combined-left">

            {/* Technex text (fades out in phase B) */}
            <div ref={techTextWrapperRef} className="ts-tech-text-wrapper">
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

            {/* Team image (slides up in phase B) */}
            <div ref={teamImgWrapperRef} className="ts-team-img-wrapper">
              <div className="ts-team-img" style={{ backgroundImage: 'url(https://picsum.photos/1200/800?grayscale&random=20)' }} />
            </div>

          </div>

          {/* Right: craft images (drop in phase A, shrink in phase B) */}
          <div ref={craftGridRef} className="ts-combined-right craft-grid">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                ref={addToCraftImages}
                className="craft-img"
                style={{ backgroundImage: `url(https://picsum.photos/400/600?random=${item})` }}
              />
            ))}
          </div>

        </div>

        {/* ── SNTC TEAM brand (fades in phase B) ──────────── */}
        <div ref={footerBrandRef} className="ts-footer-brand" style={{ opacity: 0 }}>
          <svg viewBox="0 0 1000 100" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="50%" y="88" textAnchor="middle" fontFamily="Inter" fontWeight="900" fontSize="110" fill="white" letterSpacing="-0.02em" textLength="1000" lengthAdjust="spacingAndGlyphs">
              SNTC TEAM
            </text>
          </svg>
        </div>

        {/* ── Footer links (fades in phase B) ─────────────── */}
        <div ref={footerLinksRef} className="ts-footer-links" style={{ opacity: 0 }}>
          <div className="ts-col">
            <h4>SOCIAL MEDIA</h4>
            <p>TWITTER — INSTAGRAM — GITHUB — DRIBBBLE</p>
          </div>
          <div className="ts-col">
            <h4>GET IN TOUCH</h4>
            <p>HELLO@SNTC.IITBHU.AC.IN</p>
          </div>
          <div className="ts-col ts-col-right">
            <h4>@SNTC IIT BHU 2026</h4>
            <p>ALL RIGHTS RESERVED</p>
          </div>
        </div>

      </section>
    </>
  );
}