import "./Achievements.css";

export default function Achievements() {
  return (
    <main>
      <div className="intro">
        <h2 className="intro__title">
          <span>SNTC</span>
          <em>Achievements</em>
        </h2>

        
      </div>

      {/* First card */}

      <div className="content">
        <figure className="item">
          <div
            className="item__img glitch"
            style={{ "--img": "url(/img/gold-medal.png)" }}
          >
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
          </div>

          <div
            className="item__cover"
            style={{ backgroundImage: "url(/img/gold-medal.avif)" }}
          ></div>

          <figcaption className="item__content">
            <h3 className="item__content-title">
              INTER-IIT-TECH-MEET 9.0</h3>

            <h4 className="item__content-label">
              GOLD
            </h4>
          </figcaption>
        </figure>
        <figure className="item">
          <div
            className="item__img glitch"
            style={{ "--img": "url(/img/gold-medal.png)" }}
          >
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
          </div>

          <div
            className="item__cover"
            style={{ backgroundImage: "url(/img/gold-medal.avif)" }}
          ></div>

          <figcaption className="item__content">
            <h3 className="item__content-title">
              GROW SIMPLE</h3>

            <h4 className="item__content-label">
              GOLD
            </h4>
          </figcaption>
        </figure>
        <figure className="item">
          <div
            className="item__img glitch"
            style={{ "--img": "url(/img/silver-medal.png)" }}
          >
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
          </div>

          <div
            className="item__cover"
            style={{ backgroundImage: "url(/img/silver-medal.avif)" }}
          ></div>

          <figcaption className="item__content">
            <h3 className="item__content-title">
              CLOUD PHYSICIAN</h3>

            <h4 className="item__content-label">
              SILVER
            </h4>
          </figcaption>
        </figure>
        <figure className="item">
          <div
            className="item__img glitch"
            style={{ "--img": "url(/img/bronze-medal.png)" }}
          >
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
          </div>

          <div
            className="item__cover"
            style={{ backgroundImage: "url(/img/bronze-medal.avif)" }}
          ></div>

          <figcaption className="item__content">
            <h3 className="item__content-title">
              SAPTANG LABS</h3>

            <h4 className="item__content-label">
              BRONZE
            </h4>
          </figcaption>
        </figure>
        <figure className="item">
          <div
            className="item__img glitch"
            style={{ "--img": "url(/img/gold-medal.png)" }}
          >
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
          </div>

          <div
            className="item__cover"
            style={{ backgroundImage: "url(/img/gold-medal.avif)" }}
          ></div>

          <figcaption className="item__content">
            <h3 className="item__content-title">
              INTER-IIT-TECH-MEET 9.0</h3>

            <h4 className="item__content-label">
              GOLD
            </h4>
          </figcaption>
        </figure>
        <figure className="item">
          <div
            className="item__img glitch"
            style={{ "--img": "url(/img/gold-medal.png)" }}
          >
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
            <div className="glitch__img"></div>
          </div>

          <div
            className="item__cover"
            style={{ backgroundImage: "url(/img/gold-medal.avif)" }}
          ></div>

          <figcaption className="item__content">
            <h3 className="item__content-title">
              INTER-IIT-TECH-MEET 9.0</h3>

            <h4 className="item__content-label">
              GOLD
            </h4>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}