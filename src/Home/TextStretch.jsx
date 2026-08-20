import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextStretch.css';

gsap.registerPlugin(ScrollTrigger);

export default function TextStretch() {
  /* ── Section 1: "WE IGNITE …" ──────────────────────────────── */
  const s1Ref = useRef(null);
  const eTopRef = useRef(null);
  const eMidRef = useRef(null);
  const eBotRef = useRef(null);
  const igniteRef = useRef(null);
  const thatRef = useRef(null);
  const lastsRef = useRef(null);
  const subRef = useRef(null);

  const s2Ref = useRef(null);
  const waveCanvasRef = useRef(null);
  const techLabelRef = useRef(null);
  const techH2Ref = useRef(null);
  const techBgSvgRef = useRef(null);
  const techDescRef = useRef(null);
  const techTextWrapperRef = useRef(null);
  const teamImgWrapperRef = useRef(null);
  const craftGridRef = useRef(null);
  const footerBrandRef = useRef(null);
  const footerLinksRef = useRef(null);

  // Craft scroll section refs
  const craftImagesRef = useRef([]);
  craftImagesRef.current = [];

  const addToCraftImages = (el) => {
    if (el && !craftImagesRef.current.includes(el)) {
      craftImagesRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
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
          invalidateOnRefresh: true,
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
          invalidateOnRefresh: true,
        },
      });

      // ── Phase A: Technex text ──────────────────────────────────
      tl2.fromTo(techLabelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }, 0);

      tl2.fromTo(techBgSvgRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.6, ease: 'power2.out' }, 0.1);

      tl2.fromTo(techH2Ref.current,
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.4, ease: 'power3.out' }, 0.1);

      tl2.fromTo(techDescRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.4);

      // ── Phase A: Images drop one by one ───────────────────────
      const images = craftImagesRef.current;
      const isMobile = window.innerWidth <= 900;

      if (images.length > 0) {
        // Seed z-indices: first DOM element highest so CSS default stacking is correct
        images.forEach((img, i) => {
          gsap.set(img, { zIndex: images.length - i });
        });

        tl2.from(images, {
          stagger: {
            each: 0.65,
            onStart() {
              // Each card jumps to the top of the stack the moment it starts falling
              const el = this.targets()[0];
              gsap.set(el, { zIndex: images.length + images.indexOf(el) + 1 });
            }
          },
          // On mobile fly in from the right so cards never pass over the text
          ...(isMobile
            ? { x: window.innerWidth, rotation: () => gsap.utils.random(-10, 10), transformOrigin: 'right center' }
            : { y: -window.innerHeight, rotation: () => gsap.utils.random(-25, 25), transformOrigin: '50% 0%' }
          ),
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
      //    Mobile: keep it small so SNTC TEAM text fits below it
      tl2.to(craftGridRef.current, {
        height: isMobile ? '18vh' : 'calc(62vh - 52px)',
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

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    const pendingImages = Array.from(document.querySelectorAll('img')).filter(
      (img) => !img.complete
    );

    pendingImages.forEach((img) => {
      img.addEventListener('load', handleLoad, { once: true });
    });

    return () => {
      ctx.revert();
      window.removeEventListener('load', handleLoad);
      pendingImages.forEach((img) => {
        img.removeEventListener('load', handleLoad);
      });
    };
  }, []);

  /* ── Animated wave-dot canvas ───────────────────────────────── */
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let startTime = null;

    const SPACING  = 22;   // grid spacing in px
    const DOT_R    = 1.4;  // dot radius
    const AMP_A    = 9;    // primary wave amplitude
    const AMP_B    = 5;    // secondary wave amplitude
    const FREQ_A   = 0.014; // spatial freq — horizontal ripple
    const FREQ_B   = 0.018; // spatial freq — diagonal ripple
    const SPD_A    = 1.1;  // time speed of primary wave
    const SPD_B    = 0.7;  // time speed of secondary wave

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (ts) => {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width  / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 2;

      ctx.fillStyle = 'rgba(255,255,255,0.09)';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING;
          const by = r * SPACING;

          // Two overlapping waves offset each dot's Y position
          const dy =
            Math.sin(bx * FREQ_A + t * SPD_A) * AMP_A +
            Math.sin((bx + by) * FREQ_B - t * SPD_B) * AMP_B;

          ctx.beginPath();
          ctx.arc(bx, by + dy, DOT_R, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
       *  SECTION 1 — WE IGNITE INNOVATION THAT LASTS
       * ══════════════════════════════════════════════════════════ */}
      <section ref={s1Ref} className="ts-section">
        <canvas ref={waveCanvasRef} className="ts-wave-canvas" />
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
              <div ref={techBgSvgRef} className="ts-tech-bg-svg" style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: -1, width: '120%', maxWidth: '800px', pointerEvents: 'none' }}>
                <svg viewBox="0 0 732 301" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                  <path d="M628.193 67.9406C563.929 76.1379 499.499 80.8854 435.955 96.0051C305.698 126.998 179.75 177.007 51.0966 215.747C34.6395 220.702 18.1584 225.379 1.76567 230.636C-1.91449 231.817 8.67902 226.737 12.1913 224.946C45.404 208.006 78.9877 192.231 112.379 175.833C199.078 133.255 284.291 86.7261 369.968 41.2015C398.131 26.2371 431.344 45.0069 460 31.6905C473.381 25.4724 427.33 8.36477 413.578 13.215C358.347 32.6947 302.314 50.0199 247.976 73.0858C237.151 77.6805 246.928 71.8535 250.963 68.5643C267.595 55.0097 284.224 41.5293 302.074 30.4434C319.353 19.7126 337.563 11.1069 356.237 4.79568C359.563 3.67159 362.932 2.68719 366.344 2.0672C367.541 1.84983 370.219 0.850123 369.968 2.30107C369.551 4.71396 367.028 5.67547 365.454 7.21234C362.024 10.5639 358.396 13.605 354.965 16.9569C301.888 68.8149 252.906 130.958 223.882 207.171C216.075 227.674 201.661 266.424 209.452 290.741C215.687 310.204 244.734 293.52 252.998 289.805C346.865 247.615 434.589 183.803 521.012 122.978C525.943 119.508 530.874 116.038 535.824 112.61C539.753 109.889 550.214 100.266 547.839 104.97C544.42 111.743 537.95 115.301 532.964 120.406C518.223 135.498 511.105 143.302 494.821 157.981C465.725 184.208 434.916 206.569 401.245 222.919C375.388 235.474 345.128 247.895 316.823 247.475C296.913 247.18 306.308 232.553 317.331 222.763C366.433 179.154 426.957 148.469 482.234 120.094C546.383 87.1639 611.846 57.9003 679.939 39.8762C694.7 35.969 711.518 32.9041 726.855 31.6908C757.409 29.2734 665.67 34.8845 635.058 35.6665" stroke="#FF4D00" strokeWidth="1.15257" strokeLinecap="round" strokeDasharray="7 7"></path>
                </svg>
              </div>
              <h2 ref={techH2Ref} className="ts-tech-heading" style={{ position: 'relative', zIndex: 1 }}>
                A PEEK INTO<br />
                THE LATEST<br />
                IN TECH
              </h2>
              <div ref={techDescRef} className="ts-tech-desc">
                <div className="ts-tech-divider" />
                <p className="ts-tech-text">
                  Technex is the annual techno-management festival of IIT(BHU) Varanasi — one of the largest technical extravaganzas in Asia. It brings together the brightest minds for innovation, competition, and pushing boundaries.
                </p>
                <p className="ts-tech-text ts-tech-text--short">
                  Technex — IIT(BHU) Varanasi's annual techno-management fest and one of Asia's largest, bringing together the brightest minds for innovation and competition.
                </p>
              </div>
            </div>

            {/* Team image (slides up in phase B) */}
            <div ref={teamImgWrapperRef} className="ts-team-img-wrapper">
              <div className="ts-team-img" style={{ backgroundImage: 'url(/img/technex/technex_main.webp)' }} />
            </div>

          </div>

          {/* Right: craft images (drop in phase A, shrink in phase B) */}
          <div ref={craftGridRef} className="ts-combined-right craft-grid">
            {[
              '/img/technex/robowars_better.jpg',
              '/img/technex/flying_car.jpg',
              '/img/technex/hurdle_chall.jpg',
              '/img/technex/robowar.jpg',
              '/img/technex/guitarist_dazzle.jpg',
              '/img/technex/robot.jpg',
              '/img/technex/darshan_rawal.webp',
              '/img/technex/rawal_aurafarm.jpg',
              '/img/technex/Benedetto_Vigna.jpg',
            ].map((src, index, arr) => (
              <div
                key={index}
                ref={addToCraftImages}
                className="craft-img"
                style={{
                  backgroundImage: `url(${src})`,
                  zIndex: arr.length - index,   /* initial stacking: first card on top in CSS */
                }}
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
          <div className="ts-col ts-col-left">
            <h4>GET IN TOUCH</h4>
            <p><a href="mailto:gensec.sntc@iitbhu.ac.in" style={{ color: 'inherit', textDecoration: 'none' }}>GENSEC.SNTC@IITBHU.AC.IN</a></p>
          </div>
          <div className="ts-col ts-col-center">
            <h4>SOCIAL MEDIA</h4>
            <div className="footer-social-links">
              <a href="https://www.instagram.com/sntc.iitbhu/?hl=en" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <img src="/img/ig.png" alt="Instagram" className="footer-social-icon" />
              </a>
              <a href="https://www.linkedin.com/company/science-and-technology-council-iit-bhu-varanasi/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <img src="/img/linkedin.png" alt="LinkedIn" className="footer-social-icon" />
              </a>
              <a href="https://www.facebook.com/sntc.iitbhu/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                <img src="/img/facebook.png" alt="Facebook" className="footer-social-icon" />
              </a>
            </div>
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