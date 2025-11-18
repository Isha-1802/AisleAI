import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>AisleAI — Your personal AI stylist</h1>
            <p className="lead">
              Discover perfect outfits with conversational chat, image search, and smart brand comparisons.
            </p>
            <div className="cta">
              <Link to="/signup" className="btn primary">Get started — Sign up</Link>
              <Link to="/login" className="btn ghost">Log in</Link>
            </div>
            <p className="hint">Try uploading a photo or asking the stylist for outfit ideas.</p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-placeholder">AisleAI</div>
          </div>
        </div>
      </header>

      <section className="features">
        <h2>What AisleAI does</h2>
        <ul className="feature-list">
          <li>
            <strong>Conversational Styling</strong>
            <p>Chat with an AI stylist to refine your look step-by-step.</p>
          </li>
          <li>
            <strong>Image-based Search</strong>
            <p>Upload photos to find similar items and outfit matches.</p>
          </li>
          <li>
            <strong>Brand & Price Comparisons</strong>
            <p>Compare recommendations across brands and budgets.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}