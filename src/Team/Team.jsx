import React, { useState } from 'react';
import './Team.css';

const currentHelm = [
  {
    name: 'ADITYA SURANA',
    role: 'Joint General Secretary',
    image: '/img/AdityaSurana.webp',
  },
  {
    name: 'ADITYA KUMAR SINGH',
    role: 'General Secretary',
    image: '/img/Aditya_Kumar_Singh.webp',
  },
  {
    name: 'TANISHA SINGH',
    role: 'Joint General Secretary',
    image: '/img/Tanisha_singh.webp',
  },
];

const pastHelm = [
  {
    name: 'LAKSHYA SINGH',
    role: 'Joint General Secretary',
    image: '/img/Lakshya.webp',
  },
  {
    name: 'MANISH RAI',
    role: 'General Secretary',
    image: '/img/manish.webp',
  },
  {
    name: 'PRITI SARBHA',
    role: 'Joint General Secretary',
    image: '/img/bhavna.webp',
  },
];

function TeamCard({ member, index }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty('--mouse-x', `${x * 20}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y * 20}px`);
    e.currentTarget.style.setProperty('--rotate-y', `${x * 10}deg`);
    e.currentTarget.style.setProperty('--rotate-x', `${-y * 10}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
  };

  return (
    <div
      className="team-card"
      style={{ '--card-index': index }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-top-bar" />
      <div className="team-image-container">
        <img
          src={member.image}
          alt={member.name}
          className="team-member-img"
          loading="lazy"
        />
        <div className="image-overlay-glow" />
      </div>
      <div className="team-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <main className="team-page">
      {/* Page Header */}
      <section className="team-header-section">
        <h1 className="team-page-title">
          <span>SNTC</span> Team
        </h1>
        <p className="team-page-subtitle">
          Meet the minds behind Science and Technology Council, IIT BHU
        </p>
      </section>

      {/* Current Helm */}
      <section className="helm-section">
        <h2 className="helm-title">Current Helm</h2>
        <div className="team-grid">
          {currentHelm.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* Past Helm */}
      <section className="helm-section">
        <h2 className="helm-title">Past Helm</h2>
        <div className="team-grid">
          {pastHelm.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <h3 className="newsletter-title">Subscribe to our upcoming newsletter!</h3>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">
            {subscribed ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </form>
      </section>
    </main>
  );
}
