import './Footer.css';

export default function Footer({ withGradient = false }) {
  return (
    <footer className={`site-footer${withGradient ? ' site-footer--gradient' : ''}`}>
      {/* SNTC TEAM brand */}
      <div className="site-footer__brand">
        <svg viewBox="0 0 1000 100" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <text
            x="50%"
            y="88"
            textAnchor="middle"
            fontFamily="Inter"
            fontWeight="900"
            fontSize="110"
            fill="white"
            letterSpacing="-0.02em"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
          >
            SNTC TEAM
          </text>
        </svg>
      </div>

      {/* Footer links */}
      <div className="site-footer__links">
        <div className="site-footer__col">
          <h4>SOCIAL MEDIA</h4>
          <div className="site-footer__socials">
            <a href="https://www.instagram.com/sntc.iitbhu/?hl=en" target="_blank" rel="noopener noreferrer" className="site-footer__social-link">INSTAGRAM</a>
            <span className="site-footer__sep">—</span>
            <a href="https://www.linkedin.com/company/science-and-technology-council-iit-bhu-varanasi/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="site-footer__social-link">LINKEDIN</a>
            <span className="site-footer__sep">—</span>
            <a href="https://www.facebook.com/sntc.iitbhu/" target="_blank" rel="noopener noreferrer" className="site-footer__social-link">FACEBOOK</a>
          </div>
        </div>
        <div className="site-footer__col">
          <h4>GET IN TOUCH</h4>
          <p><a href="mailto:gensec.sntc@iitbhu.ac.in" style={{ color: 'inherit', textDecoration: 'none' }}>GENSEC.SNTC@IITBHU.AC.IN</a></p>
        </div>
        <div className="site-footer__col site-footer__col--right">
          <h4>@SNTC IIT BHU 2026</h4>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
