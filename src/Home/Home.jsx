import { useEffect, useRef } from 'react';
import RevealLayer from './RevealLayer';
import './Home.css';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

export default function Home() {
  /* scroll exit — drive with refs for perf */
  const overlayRef  = useRef(null);
  const headingRef  = useRef(null);
  const rightRef    = useRef(null);

  useEffect(() => {
    const update = () => {
      const vh  = window.innerHeight;
      const raw = Math.min(1, Math.max(0, window.scrollY / (vh * 0.72)));
      // ease-in cubic
      const e = raw * raw * raw;

      /* background overlay darkens to black */
      if (overlayRef.current)  overlayRef.current.style.opacity  = `${e}`;

      /* heading: blur + slide up */
      if (headingRef.current) {
        headingRef.current.style.opacity   = `${1 - e}`;
        headingRef.current.style.transform = `translateY(${e * -40}px)`;
        headingRef.current.style.filter    = `blur(${e * 12}px)`;
      }

      /* right copy: fade + slide up */
      if (rightRef.current) {
        rightRef.current.style.opacity   = `${1 - e}`;
        rightRef.current.style.transform = `translateY(${e * -28}px)`;
      }
    };

    update(); // set initial state
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="lithos-scroll-wrap">
      <section className="lithos-hero">
        {/* base image */}
        <div className="lithos-bg hero-zoom" style={{ backgroundImage: `url(${BG_IMAGE_1})` }} />

        {/* cursor-reveal image */}
        <RevealLayer image={BG_IMAGE_2} />

        {/* scroll exit overlay — fades bg to black */}
        <div ref={overlayRef} className="lithos-exit-overlay" />

        {/* heading scroll wrapper */}
        <div ref={headingRef} className="lithos-heading-wrap">
          <h1 className="lithos-h1">
            <span className="lithos-line1 hero-anim hero-reveal" style={{ animationDelay: '0.25s' }}>
              Layers hold
            </span>
            <span className="lithos-line2 hero-anim hero-reveal" style={{ animationDelay: '0.42s' }}>
              tales of time
            </span>
          </h1>
        </div>

      </section>

      {/* gives sticky section scroll room */}
      <div className="lithos-spacer" />
    </div>
  );
}
