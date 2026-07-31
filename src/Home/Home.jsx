import RevealLayer from './RevealLayer';
import TextStretch from './TextStretch';
import './Home.css';

const BG_IMAGE_1 = '/img/bg2.png';
const BG_IMAGE_2 = '/img/bg1.png';

export default function Home() {
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
      </section>

      {/* ── Scrollytelling sections ───────────────────────────────── */}
      <TextStretch />
    </>
  );
}
