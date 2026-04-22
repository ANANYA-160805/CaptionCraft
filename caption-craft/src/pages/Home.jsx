import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <p className="home__eyebrow">AI-Powered Image Captions</p>
          <h1 className="home__title">Generate AI Captions in Seconds</h1>
          <p className="home__subtitle">
            Upload any image and get a smart, creative caption instantly — perfect for social posts, memories, and brand content.
          </p>

          <div className="home__trust">
            <span>⚡ Instant results</span>
            <span>🎯 Smart caption style</span>
            <span>📸 Built for creators</span>
          </div>

          <div className="home__actions">
            <Link to="/create" className="home__button">
              Try Now
            </Link>
            <a href="#how-it-works" className="home__button home__button--secondary">
              See How It Works
            </a>
          </div>
        </div>

        <div className="home__hero-card">
          <div className="home__mock">
            <span className="home__mock-dot"></span>
            <span className="home__mock-dot"></span>
            <span className="home__mock-dot"></span>
          </div>
          <div className="home__mock-image">
            <div className="home__mock-placeholder">
              AI Preview
              <span>Upload an image to generate a caption</span>
            </div>
          </div>
          <p className="home__mock-caption">
            Create captions that feel polished, trendy, and ready to post.
          </p>
        </div>
      </section>

      <section className="home__stats">
        <div className="home__stat">
          <strong>3x</strong>
          <span>faster caption creation</span>
        </div>
        <div className="home__stat">
          <strong>100%</strong>
          <span>creative AI output</span>
        </div>
        <div className="home__stat">
          <strong>1 click</strong>
          <span>to start generating</span>
        </div>
      </section>

      <section className="home__steps" id="how-it-works">
        <div className="home__section-header">
          <p className="home__eyebrow">How It Works</p>
          <h2 className="home__section-title">Three simple steps</h2>
        </div>

        <div className="home__grid">
          <article className="home__card">
            <div className="home__card-number">1</div>
            <h3 className="home__card-title">Upload Image</h3>
            <p className="home__card-text">
              Choose any photo from your device and upload it in a few clicks.
            </p>
          </article>

          <article className="home__card">
            <div className="home__card-number">2</div>
            <h3 className="home__card-title">AI Processes Image</h3>
            <p className="home__card-text">
              Our AI analyzes the image and generates a caption based on what it sees.
            </p>
          </article>

          <article className="home__card">
            <div className="home__card-number">3</div>
            <h3 className="home__card-title">Get Caption</h3>
            <p className="home__card-text">
              Receive a ready-to-use caption with style, tone, and hashtags.
            </p>
          </article>
        </div>
      </section>

      <section className="home__cta">
        <h2>Ready to create something people notice?</h2>
        <p>Turn any image into a caption worth posting.</p>
        <Link to="/create" className="home__button">
          Start Creating
        </Link>
      </section>
    </main>
  );
}