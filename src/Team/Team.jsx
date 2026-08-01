import React, { useState, useRef, useEffect } from "react";
import "./Team.css";

/* ─── Member Data ─────────────────────────────────────────────────── */
const currentHelm = [
  {
    id: "c1",
    name: "Aditya Surana",
    role: "Joint General Secretary",
    subtitle: "Science & Technology Council",
    image: "/img/team/member1.png",
    bio: "Leading SNTC initiatives, driving inter-IIT technical excellence & innovation across all tech wings.",
    social: { github: "#", linkedin: "#", email: "mailto:gsec.sntc@iit.ac.in" }
  },
  {
    id: "c2",
    name: "Aditya Kumar Singh",
    role: "General Secretary",
    subtitle: "Operations & Council Lead",
    image: "/img/team/member2.png",
    bio: "Coordinating 8+ technical clubs, campus hackathons, research summits & mega competitions.",
    social: { github: "#", linkedin: "#", email: "mailto:jsec.sntc@iit.ac.in" }
  },
  {
    id: "c3",
    name: "Tanisha Singh",
    role: "Joint General Secretary",
    subtitle: "Systems & Infrastructure",
    image: "/img/team/member3.png",
    bio: "Spearheading central tech architecture, open-source projects & Inter-IIT contingent readiness.",
    social: { github: "#", linkedin: "#", email: "mailto:tech.sntc@iit.ac.in" }
  }
];

const pastHelm = [
  {
    id: "p1",
    name: "Lakshya Singh",
    role: "Joint General Secretary",
    image: "/img/team/member4.png",
    bio: "Led SNTC to 1st Place overall triumph at Inter-IIT Tech Meet 11.0 with record medal count.",
    social: { github: "#", linkedin: "#", email: "#" }
  },
  {
    id: "p2",
    name: "Manish Rai",
    role: "General Secretary",
    image: "/img/team/member5.png",
    bio: "Expanded technical club outreach by 40% and launched national open-source hardware sprints.",
    social: { github: "#", linkedin: "#", email: "#" }
  },
  {
    id: "p3",
    name: "Priti Sarbha",
    role: "Joint General Secretery",
    image: "/img/team/member6.png",
    bio: "Architected early council server infrastructure, AI cluster pipelines & robotics research labs.",
    social: { github: "#", linkedin: "#", email: "#" }
  }
];

/* ─── Member Card Component ───────────────────────────────────────── */
function TeamCard({ member, type = "current", isFocused, onMouseEnter, onMouseLeave }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty("--mouse-x", `${x * 20}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y * 20}px`);
  };

  const handleMouseReset = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--mouse-x", "0px");
    cardRef.current.style.setProperty("--mouse-y", "0px");
  };

  let focusClass = "";
  if (isFocused === true) focusClass = "focused";
  else if (isFocused === false) focusClass = "unfocused";

  return (
    <div
      ref={cardRef}
      className={`team-card ${focusClass} team-card--${type}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseReset();
        if (onMouseLeave) onMouseLeave();
      }}
      onMouseEnter={onMouseEnter}
    >
      {/* Card Image with Glitch & Blur Reveal */}
      <div className="team-card__media">
        <img src={member.image} alt={member.name} className="team-card__img" />
        <div className="team-card__overlay-glow" />
      </div>

      {/* Content Section */}
      <div className="team-card__content">
        <span className="team-card__role">{member.role}</span>
        <h3 className="team-card__name">{member.name}</h3>

        {/* Social Icons */}
        <div className="team-card__socials">
          <a href={member.social.github} target="_blank" rel="noreferrer" title="GitHub" className="social-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href={member.social.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="social-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
          <a href={member.social.email} title="Email" className="social-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Team Page ──────────────────────────────────────────────── */
export default function Team() {
  const [hoveredCurrentId, setHoveredCurrentId] = useState(null);
  const [hoveredPastId, setHoveredPastId] = useState(null);
  const canvasRef = useRef(null);

  // Canvas Stars Animation (replicated from Clubs page)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.6,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.005 + 0.002
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 0.65 || star.alpha < 0.1) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getIsCurrentFocused = (id) => {
    if (hoveredCurrentId === null) return null;
    return hoveredCurrentId === id;
  };

  const getIsPastFocused = (id) => {
    if (hoveredPastId === null) return null;
    return hoveredPastId === id;
  };

  return (
    <main className="team-page">
      {/* Background Star Canvas */}
      <canvas ref={canvasRef} className="team-star-canvas" />

      {/* Background Ambient Neon Glow Orbs */}
      <div className="ambient-glow ambient-glow--cyan" />
      <div className="ambient-glow ambient-glow--purple" />

      {/* Header Section */}
      <div className="team-intro">
        <span className="team-intro__tag">LEADERSHIP & VISION</span>
        <h1 className="team-intro__title">
          <span>The</span>
          <em>SNTC Helm</em>
        </h1>
        <p className="team-intro__subtitle">
          The Faces behind the SNTC
        </p>
      </div>

      {/* Row 1: Current Helm */}
      <section className="team-section">
        <div className="section-header">
          <div className="section-header__title-wrap">
            <span className="section-dot section-dot--current" />
            <h2 className="section-title">Current Helm</h2>
          </div>
        </div>

        <div className="team-grid">
          {currentHelm.map((member) => (
            <div key={member.id} data-id={member.id} className="grid-item">
              <TeamCard
                member={member}
                type="current"
                isFocused={getIsCurrentFocused(member.id)}
                onMouseEnter={() => setHoveredCurrentId(member.id)}
                onMouseLeave={() => setHoveredCurrentId(null)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Row 2: Past Helm */}
      <section className="team-section">
        <div className="section-header">
          <div className="section-header__title-wrap">
            <span className="section-dot section-dot--past" />
            <h2 className="section-title">Past Helm</h2>
          </div>
        </div>

        <div className="team-grid">
          {pastHelm.map((member) => (
            <div key={member.id} data-id={member.id} className="grid-item">
              <TeamCard
                member={member}
                type="past"
                isFocused={getIsPastFocused(member.id)}
                onMouseEnter={() => setHoveredPastId(member.id)}
                onMouseLeave={() => setHoveredPastId(null)}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
