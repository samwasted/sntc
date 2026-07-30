import { useState, useEffect } from "react";
import "./Achievements.css";

/* ─── Data ─────────────────────────────────────────────── */
const achievements = [
  { title: "INTER-IIT TECH MEET 9.0", subtitle: "Overall Champions", tier: "gold", size: "wide", image: "/img/techMeet14.jpeg" },
  { title: "GROW SIMPLE", subtitle: "Problem Statement Winner", tier: "gold", size: "small", image: "/img/growsimple.jpeg" },
  { title: "CLOUD PHYSICIAN", subtitle: "Runner-Up", tier: "silver", size: "small", image: "/img/cloudP.jpeg" },
  { title: "INTER-IIT TECH MEET 10.0", subtitle: "Overall Champions", tier: "gold", size: "wide", image: "/img/interiit2.jpg" },
  { title: "INTER-IIT TECH MEET 11.0", subtitle: "Overall Champions", tier: "gold", size: "wide", image: "/img/interiit3.jpg" },
  { title: "SAPTANG LABS", subtitle: "Second Runner-Up", tier: "bronze", size: "small", image: "/img/saptang.jpeg" },
];

/* ─── Tier emoji & labels ─────────────────────────────── */
const TIER_EMOJI = { gold: "🥇", silver: "🥈", bronze: "🥉" };
const TIER_LABEL = { gold: "1ST PLACE", silver: "2ND PLACE", bronze: "3RD PLACE" };

/* ─── Achievement Card (Photo Background) ──────────────── */
function AchievementCard({ title, subtitle, tier, image, size = "small" }) {
  const imgUrl = image;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty("--mouse-x", `${x * 30}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y * 30}px`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty("--mouse-x", "0px");
    e.currentTarget.style.setProperty("--mouse-y", "0px");
  };

  return (
    <figure
      className={`item item--${size} item--${tier}`}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top-Right Medal Ribbon */}
      <div className={`ribbon ribbon--${tier}`}>
        <span>{TIER_EMOJI[tier]} {TIER_LABEL[tier]}</span>
      </div>

      {/* Glitch layers — using the photo */}
      <div className="item__img glitch" style={{ "--img": `url(${imgUrl})` }}>
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
      </div>

      {/* Cover — fades out on hover */}
      <div className="item__cover" style={{ backgroundImage: `url(${imgUrl})` }}></div>

      {/* Text overlay — event name top-left, category bottom-right */}
      <figcaption className="item__content item__content--image">
        <span className="item__event-name">{title}</span>
        <span className="item__category">{subtitle}</span>
      </figcaption>
    </figure>
  );
}

/* ─── Main ────────────────────────────────────────────── */
export default function Achievements() {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = 280;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      setScrollRatio(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={{ "--scroll-progress": scrollRatio }}>
      <div className="intro">
        <h2 className="intro__title">
          <span>SNTC</span>
          <em>Achievements</em>
        </h2>
      </div>

      <div className="content">
        {achievements.map((a, i) => (
          <AchievementCard key={i} {...a} />
        ))}
      </div>
    </main>
  );
}