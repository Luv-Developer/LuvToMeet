import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./homepage.css"

const LuvToMeet = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const navigate = useNavigate()
  const features = [
    {
      title: "Crystal Clear Video",
      description: "HD video calls with advanced noise cancellation",
      icon: "📹"
    },
    {
      title: "Secure Rooms",
      description: "End-to-end encrypted private meeting rooms",
      icon: "🔒"
    },
    {
      title: "Screen Sharing",
      description: "Share your screen with all participants",
      icon: "🖥️"
    },
    {
      title: "Real-time Chat",
      description: "Chat alongside your video conference",
      icon: "💬"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateMeeting = () => {
    navigate("/signin")
  };
  const joinMeeting = () => {
    navigate("/signin")
  }
  const signin = () => {
    navigate("/signin")
  }

  return (
    <div className="luvtomeet-container">
      {/* Animated Background */}
      <div className="background-animation">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="floating-circle" style={{
            animationDelay: `${i * 0.5}s`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`
          }}></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-icon">💙</span>
          <h1>LuvToMeet</h1>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <button onClick={signin} className="nav-button">Sign In</button>
        </div>
        <button className="mobile-menu">☰</button>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            Connect <span className="gradient-text">Beautifully</span>
            <br />
            Meet <span className="gradient-text">Effortlessly</span>
          </h2>
          
          <p className="hero-subtitle">
            High-quality video meetings with friends, family, and colleagues.
            Join or host secure meetings in seconds.
          </p>

          {/* Meeting Controls */}
          <div className={`meeting-controls ${isAnimating ? 'shake' : ''}`}>            
            <div className="action-buttons">
              <button onClick={handleCreateMeeting} className="create-button">
                Create New Meeting
              </button>
              <button onClick={joinMeeting} className="schedule-button">
                Join new Meeting
              </button>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="feature-showcase">
            <div className="feature-display">
              <div className="feature-icon">{features[featureIndex].icon}</div>
              <div className="feature-text">
                <h3>{features[featureIndex].title}</h3>
                <p>{features[featureIndex].description}</p>
              </div>
            </div>
            
            <div className="feature-indicators">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === featureIndex ? 'active' : ''}`}
                  onClick={() => setFeatureIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="video-preview">
          <div className="video-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="video-tile">
                <div className="user-avatar">
                  <span>👤</span>
                </div>
                <div className="user-name">User {i + 1}</div>
              </div>
            ))}
          </div>
          <div className="floating-notification">
            <div className="notification-icon">🔔</div>
            <span>User joined the meeting</span>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Why Choose LuvToMeet?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <h2>How LuvToMeet Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create/Join Meeting</h3>
            <p>Create a new room or join with an existing meeting ID</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Invite Participants</h3>
            <p>Share the meeting link with your team or friends</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Start Collaborating</h3>
            <p>Use video, audio, screen sharing, and chat features</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-icon">💙</span>
            <h2>LuvToMeet</h2>
            <p>Making virtual meetings delightful</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#support">Support</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="social-links">
            <button>🐦</button>
            <button>📘</button>
            <button>📷</button>
            <button>💼</button>
          </div>
        </div>
        <p className="copyright">© 2025 LuvToMeet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LuvToMeet;