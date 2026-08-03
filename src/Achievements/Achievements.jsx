import { useState, useEffect } from "react";
import "./Achievements.css";

/* ─── Data ─────────────────────────────────────────────── */
const achievements = [
  {
    title: "INTER-IIT TECH MEET",
    subtitle: "4th Rank overall",
    tier: "bronze",
    size: "wide",
    type: "image",
    image: "/img/techMeet14.jpeg",
    filterColor: "#0055ff",
    filterOpacity: 0.4,
  },
  {
    type: "text",
    size: "small",
    header: "CYBER & OPEN SOURCE",
    accentColor: "#00ffaa",
    bgImage: "https://cms.buoy.work/wp-content/uploads/gallery-Dispel.jpg.webp",
    bullets: [
      "Achieved Global Rank 6 and India Rank 1 at Spooky CTF.",
      "Qualified two teams for the CSAW CTF Global Finals, securing 5th and 40th positions globally.",
      "Reached All India Rank 20 on CTFtime.",
      "Multiple students secured selections in prestigious international open-source programs including Google Summer of Code (GSoC), LFX Mentorship, and Summer of Bitcoin.",
    ],
  },
  {
    type: "text",
    size: "small",
    header: "COMPETITIONS & SUMMITS",
    accentColor: "#0055ff",
    bgImage: "https://cms.buoy.work/wp-content/uploads/gallery-smmr.jpg",
    bullets: [
      "Secured multiple Gold Medals at Techkriti '26 IIT Kanpur.",
      "Secured the Championship Title at IIM Calcutta's CEO Turnaround competition.",
      "Attained Finalist Status at IIM Ahmedabad's Red Brick Summit.",
      "Reached the IICPC QuantFest Finals 2025.",
    ],
  },
  {
    title: "icpc asia west 2026",
    subtitle: "1st rank",
    tier: "gold",
    size: "wide",
    type: "image",
    image: "/img/interiit2.jpg",
    filterColor: "#00ffaa",
    filterOpacity: 0.4,
  },
  {
    title: "Nidar 2025 drone championship",
    subtitle: "4th Overall rank",
    tier: "bronze",
    size: "wide",
    type: "image",
    image: "/img/interiit3.jpg",
    filterColor: "#0055ff",
    filterOpacity: 0.45,
  },
  {
    type: "text",
    size: "small",
    header: "CP & HACKATHONS",
    accentColor: "#00ffaa",
    bgImage: "https://cms.buoy.work/wp-content/uploads/gallery-location.jpg.webp",
    bullets: [
      "Achieved 2nd Place at ICPC-de-tryst (IIT Delhi).",
      "Secured 1st and 3rd positions at the BNY Hackathon.",
      "Achieved 4th Place at BitShift 2026 (IIT Madras).",
      "Achieved a Top 10 Finish at IIT Kanpur's Eightfold.ao Hackathon.",
    ],
  },
];

/* ─── Achievement Card ────────────────────────────────── */
function AchievementCard(props) {
  const {
    type = "image",
    title,
    subtitle,
    tier = "gold",
    image,
    size = "small",
    index = 0,
    filterColor = "none",
    filterOpacity = 0.5,
    header,
    bullets = [],
    accentColor = "#00ffaa",
    bgImage,
  } = props;

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

  if (type === "text") {
    return (
      <figure
        className={`item item--${size} item--text`}
        style={{ "--card-index": index, "--accent-color": accentColor }}
        onMouseEnter={handleMouseMove}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image with Blur */}
        {bgImage && (
          <div
            className="item__text-bg"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
        )}

        {/* Dark Dim Overlay */}
        <div className="item__text-overlay"></div>

        {/* Blue Curtain Wall Reveal */}
        <div className="item__reveal-curtain"></div>

        {/* Text Card Content Container */}
        <div className="item__text-container">
          {header && (
            <div className="item__text-header">
              <span className="item__text-header-tag">{header}</span>
            </div>
          )}

          <ul className="item__bullets-list">
            {bullets.map((bullet, i) => (
              <li key={i} className="item__bullet-item">
                <span
                  className="item__bullet-dot"
                  style={{
                    backgroundColor: accentColor,
                  }}
                ></span>
                <span className="item__bullet-text">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </figure>
    );
  }

  const imgUrl = image;

  return (
    <figure
      className={`item item--${size} item--${tier}`}
      style={{ "--card-index": index }}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blue Curtain Wall Reveal */}
      <div className="item__reveal-curtain"></div>

      {/* Media container for zoom-out reveal */}
      <div className="item__media">
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

        {/* Color Filter Overlay */}
        {filterColor !== "none" && (
          <div
            className="item__color-filter"
            style={{
              backgroundColor: filterColor,
              opacity: filterOpacity,
            }}
          ></div>
        )}

        {/* Dark shadow overlay under curtain */}
        <div className="item__overlay-shadow"></div>
      </div>

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
      {/* Removed intro title per user request */}

      <div className="content">
        {achievements.map((a, i) => (
          <AchievementCard key={i} index={i} {...a} />
        ))}
      </div>
    </main>
  );
}