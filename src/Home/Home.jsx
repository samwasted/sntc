import { useEffect, useRef } from 'react';
import RevealLayer from './RevealLayer';
import TextStretch from './TextStretch';
import './Home.css';

const BG_IMAGE_1 = '/img/bg2.png';
const BG_IMAGE_2 = '/img/bg1.png';

export default function Home() {
  const heroWaveRef = useRef(null);

  useEffect(() => {
    const canvas = heroWaveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let startTime = null;

    const SPACING = 22;
    const DOT_R   = 1.4;
    const AMP_A   = 9;
    const AMP_B   = 5;
    const FREQ_A  = 0.014;
    const FREQ_B  = 0.018;
    const SPD_A   = 1.1;
    const SPD_B   = 0.7;

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
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="lithos-hero">
        <div className="lithos-bg hero-zoom" style={{ backgroundImage: `url(${BG_IMAGE_1})` }} />
        <RevealLayer image={BG_IMAGE_2} />

        {/* top-left brand */}
        <div className="lithos-brand-wrap">
          <img
            src="/img/sntc-logo.png"
            alt="SNTC logo"
            className="lithos-brand-logo hero-anim hero-reveal"
            style={{ animationDelay: '0.20s' }}
          />
          <p className="lithos-brand-name hero-anim hero-reveal" style={{ animationDelay: '0.36s' }}>
            Science and Technology Council
          </p>
          <p className="lithos-brand-sub hero-anim hero-reveal" style={{ animationDelay: '0.50s' }}>
            IIT(BHU) Varanasi
          </p>
        </div>
      {/* wave dots — mobile only, fades upward from bottom */}
        <canvas ref={heroWaveRef} className="hero-wave-canvas" />
      </section>

      {/* ── Scrollytelling sections ───────────────────────────────── */}
      <TextStretch />
    </>
  );
}
