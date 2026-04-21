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
            Upload an image, let AI analyze it instantly, and get a creative caption that fits your moment perfectly.
          </p>

          <div className="home__actions">
            <Link to="/create" className="home__button">
              Try Now
            </Link>
            <Link to="/how-it-works" className="home__button home__button--secondary">
              How It Works
            </Link>
          </div>
        </div>

        <div className="home__hero-card">
          <div className="home__mock">
            <div className="home__mock-dot" />
            <div className="home__mock-dot" />
            <div className="home__mock-dot" />
          </div>
          <div className="home__mock-image">
            <span>Image Preview</span>
          </div>
          <p className="home__mock-caption">
            “A beautiful sunset over the mountains. #nature #goldenhour ✨”
          </p>
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
    </main>
  );
}