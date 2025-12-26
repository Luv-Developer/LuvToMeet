import React, { useState, useEffect } from "react"
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./signin.css"
const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeInfo, setActiveInfo] = useState(0);
  const [shake, setShake] = useState(false);
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInfo(prev => (prev + 1) % appInfo.length);
    }, 4000);
    
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);
    const appInfo = [
    {
      icon: "🎯",
      title: "Connect Instantly",
      description: "Join meetings with a single click, no downloads required"
    },
    {
      icon: "🔒",
      title: "Military-Grade Security",
      description: "End-to-end encryption for all your conversations"
    },
    {
      icon: "🌐",
      title: "Global Access",
      description: "Connect with anyone, anywhere in the world"
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "Crystal clear 4K video and studio-quality audio"
    }
  ];

    const navigate = useNavigate()
      const isloggedin = async(name,email) => {
    let trops = {name,email}
    try{
      const res = await axios.post("https://luvtomeetbackend.onrender.com/signin",trops,{
        headers:{
          "content-type":"application/json"
        },
        withCredentials:true
      }) 
      if (res?.data?.success) {
        navigate('/room')
      }
    }
    catch(err){
      console.log(err)
    }
  }
    return(
        <>
        <div className="signin-container">
      {/* Animated Background Elements */}
      <div className="background-elements">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="floating-shape"
            style={{
              animationDelay: `${i * 0.3}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: `linear-gradient(45deg, 
                rgba(99, 102, 241, ${Math.random() * 0.3}), 
                rgba(139, 92, 246, ${Math.random() * 0.3}))`
            }}
          />
        ))}
        
        {/* Connection Lines */}
        <div className="connection-lines">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="connection-line"
              style={{
                animationDelay: `${i * 0.5}s`,
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="signin-content">
        {/* Left Panel - App Information */}
        <div className="info-panel">
          <div className="brand-header">
            <div className="logo-container">
              <div className="logo-pulse">
                <span className="logo-icon">💙</span>
              </div>
              <h1 className="logo-text">LuvToMeet</h1>
            </div>
            <p className="tagline">Where conversations become connections</p>
          </div>

          <div className="app-info-container">
            <div className="info-carousel">
              {appInfo.map((info, index) => (
                <div 
                  key={index}
                  className={`info-card ${index === activeInfo ? 'active' : ''}`}
                  onClick={() => setActiveInfo(index)}
                >
                  <div className="info-icon">{info.icon}</div>
                  <h3>{info.title}</h3>
                  <p>{info.description}</p>
                </div>
              ))}
            </div>
            
            <div className="info-indicators">
              {appInfo.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeInfo ? 'active' : ''}`}
                  onClick={() => setActiveInfo(index)}
                />
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">50M+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Countries</div>
            </div>
          </div>

          <div className="testimonial">
            <div className="testimonial-content">
              "LuvToMeet transformed how our remote team collaborates. The quality is unmatched!"
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍💼</div>
              <div className="author-info">
                <div className="author-name">Alex Chen</div>
                <div className="author-role">CTO, TechForward Inc.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Signin Form */}
        <div className="signin-panel">
          <div className={`form-container ${shake ? 'shake' : ''}`}>
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue to your meetings</p>
            </div>

            <button 
              className={`google-signin-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <span className="google-icon">
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
              </span>
              <span className="btn-text">
                <GoogleLogin style={{width:"100%"}}
  onSuccess={credentialResponse => {
    let credentialResponsedecoded = jwtDecode(credentialResponse.credential)
    isloggedin(credentialResponsedecoded.name,credentialResponsedecoded.email)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
              </span>
            </button>

            <div className="download-section">
              <p className="download-title">Get the app</p>
              <div className="download-buttons">
                <button className="download-btn app-store">
                  <span className="download-icon">🍎</span>
                  <div className="download-text">
                    <div className="download-label">Download on the</div>
                    <div className="download-store">App Store</div>
                  </div>
                </button>
                <button className="download-btn play-store">
                  <span className="download-icon">🤖</span>
                  <div className="download-text">
                    <div className="download-label">Get it on</div>
                    <div className="download-store">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="form-footer">
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/help">Help Center</a>
              <a href="/contact">Contact Us</a>
            </div>
            <div className="copyright">
              © 2025 LuvToMeet. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      <div className={`floating-notification ${pulse ? 'pulse' : ''}`}>
        <div className="notification-icon">✨</div>
        <div className="notification-text">
          <strong>Pro Tip:</strong> Use Google Sign-In for faster access
        </div>
      </div>
    </div>
        </>
          )
}
export default Signin