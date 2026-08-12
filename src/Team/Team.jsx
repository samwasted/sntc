import React, { useState, useRef, useEffect } from "react";
import "./Team.css";
import Footer from "../components/Footer";

/* ─── Member Data ─────────────────────────────────────────────────── */
const currentHelm = [
  {
    id: "c1",
    name: "Lakshya Vats",
    role: "Joint General Secretary",
    subtitle: "Science & Technology Council",
    image: "/img/team/lakshya.png",
    // bio: "Leading SNTC initiatives, driving inter-IIT technical excellence & innovation across all tech wings.",
    social: { linkedin: "https://www.linkedin.com/in/p1x3lph4nt0m/", email: "mailto:lakshya.vats.cse23@itbhu.ac.in" }
  },
  {
    id: "c2",
    name: "Sagnik Mandal",
    role: "General Secretary",
    subtitle: "Operations & Council Lead",
    image: "/img/team/sagnik.jpg",
    // bio: "Coordinating 8+ technical clubs, campus hackathons, research summits & mega competitions.",
    social: { linkedin: "https://www.linkedin.com/in/sagnikmandal/", email: "mailto:sagnik.mandal.mst23@itbhu.ac.in" }
  },
  {
    id: "c3",
    name: "Pratham Seth",
    role: "Joint General Secretary",
    subtitle: "Systems & Infrastructure",
    image: "/img/team/pratham_crop.png",
    // bio: "Spearheading central tech architecture, open-source projects & Inter-IIT contingent readiness.",
    social: { linkedin: "https://www.linkedin.com/in/prtm-sth/", email: "mailto:pratham.seth.cer23@itbhu.ac.in" }
  }
];

// const pastHelm = [
//   {
//     id: "p1",
//     name: "Lakshya Singh",
//     role: "Joint General Secretary",
//     image: "/img/team/member4.png",
//     bio: "Led SNTC to 1st Place overall triumph at Inter-IIT Tech Meet 11.0 with record medal count.",
//     social: { github: "#", linkedin: "#", email: "#" }
//   },
//   {
//     id: "p2",
//     name: "Manish Rai",
//     role: "General Secretary",
//     image: "/img/team/member5.png",
//     bio: "Expanded technical club outreach by 40% and launched national open-source hardware sprints.",
//     social: { github: "#", linkedin: "#", email: "#" }
//   },
//   {
//     id: "p3",
//     name: "Priti Sarbha",
//     role: "Joint General Secretery",
//     image: "/img/team/member6.png",
//     bio: "Architected early council server infrastructure, AI cluster pipelines & robotics research labs.",
//     social: { github: "#", linkedin: "#", email: "#" }
//   }
// ];

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
    <>
      <main className="team-page">
        {/* Background Star Canvas */}
        <canvas ref={canvasRef} className="team-star-canvas" />

        {/* Background Ambient Neon Glow Orbs */}
        <div className="ambient-glow ambient-glow--cyan" />
        <div className="ambient-glow ambient-glow--purple" />

        {/* Header Section */}
        <div className="team-intro">
          <span className="team-intro__tag">LEADERSHIP &amp; VISION</span>
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
      </main>
      <Footer withGradient />
    </>
  );
}
