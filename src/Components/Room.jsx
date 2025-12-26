import React from "react"
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import "./room.css"
const Roompage = () => {

 const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([
    { id: '4agxv', participants: 3, isPrivate: false },
    { id: '8bk7z', participants: 5, isPrivate: true },
    { id: '3cd9w', participants: 2, isPrivate: false },
    { id: '7de2x', participants: 1, isPrivate: false }
  ]);
  const [animateBg, setAnimateBg] = useState(true);
  const [codeChars, setCodeChars] = useState(['', '', '', '', '']);
  const [showGuide, setShowGuide] = useState(true);
  const [copied, setCopied] = useState(false);

  const inputRefs = useRef([]);
  const guideTimeoutRef = useRef(null);

  useEffect(() => {
    // Generate random code for placeholder
    const generateRandomCode = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };
    const randomCode = generateRandomCode();
    setRoomCode(randomCode);
    
    // Focus first input
    if (inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0].focus(), 100);
    }

    // Auto hide guide after 10 seconds
    guideTimeoutRef.current = setTimeout(() => {
      setShowGuide(false);
    }, 10000);

    return () => {
      if (guideTimeoutRef.current) {
        clearTimeout(guideTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const codeArray = roomCode.split('');
    const newCodeChars = [...Array(5)].map((_, i) => codeArray[i] || '');
    setCodeChars(newCodeChars);
  }, [roomCode]);

  const handleCreateRoom = () => {
    setIsCreating(true);
    
    // Generate new room code
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const newCode = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      setRoomCode(newCode);
      setActiveRoom({ id: newCode, isNew: true });
      setAnimateBg(false);
      
      // Add to rooms list
      setRooms(prev => [...prev, { id: newCode, participants: 1, isPrivate: true }]);
    }, 1500);
  };

  const handleJoinRoom = () => {
    if (roomCode.length !== 5) {
      // Shake animation
      document.querySelector('.room-input-container').classList.add('shake');
      setTimeout(() => {
        document.querySelector('.room-input-container').classList.remove('shake');
      }, 500);
      return;
    }

    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      setActiveRoom({ id: roomCode, isNew: false });
      setAnimateBg(false);
      alert(`Joining room: ${roomCode}`);
    }, 1500);
  };

  const handleCodeChange = (index, value) => {
    // Only allow alphanumeric
    const char = value.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (char.length > 1) return;

    const newCodeChars = [...codeChars];
    newCodeChars[index] = char;
    setCodeChars(newCodeChars);
    
    const newCode = newCodeChars.join('');
    setRoomCode(newCode);

    // Auto-focus next input
    if (char && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codeChars[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 5).toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const newCodeChars = [...Array(5)].map((_, i) => pasteData[i] || '');
    setCodeChars(newCodeChars);
    setRoomCode(pasteData.slice(0, 5));
    
    // Focus appropriate input
    const focusIndex = Math.min(pasteData.length, 4);
    inputRefs.current[focusIndex]?.focus();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:5173/room/${roomCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const joinExistingRoom = (code) => {
    setRoomCode(code);
    setTimeout(() => {
      handleJoinRoom();
    }, 300);
  };

  const resetRoom = () => {
    setActiveRoom(null);
    setAnimateBg(true);
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const newCode = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setRoomCode(newCode);
  };

  const QuickActionButton = ({ icon, label, onClick, color }) => (
    <button className="quick-action-btn" onClick={onClick} style={{ '--btn-color': color }}>
      <span className="action-icon">{icon}</span>
      <span className="action-label">{label}</span>
    </button>
  );


    const [roomcode,setroomcode] = useState("")
    const navigate = useNavigate()
    const handlesubmit = (e) => {
        let finalcode = []
        codeChars.map((char)=>{
            finalcode.push(char)
        })
        let roomfinalcode = finalcode.toString()
        let roomfinalcode2 = roomfinalcode.replaceAll(",", "")
        e.preventDefault()
        navigate(`/room/${roomfinalcode2}`)
    }
    return(
        <>
         <div className={`room-container ${animateBg ? 'animated' : ''}`}>
      {/* Animated Background */}
      <div className="background-grid">
        {[...Array(64)].map((_, i) => (
          <div 
            key={i} 
            className="grid-cell"
            style={{
              animationDelay: `${(i % 8) * 0.1}s`,
              '--cell-opacity': Math.random() * 0.1 + 0.05
            }}
          />
        ))}
      </div>

      {/* Floating Connection Nodes */}
      <div className="connection-nodes">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="room-nav">
        <div className="nav-brand">
          <div className="logo-spin">
            <span className="logo-icon">💙</span>
          </div>
          <h1>LuvToMeet</h1>
          <span className="nav-tagline">Room Portal</span>
        </div>
        <div className="nav-actions">
          <button className="nav-btn guide-btn" onClick={() => setShowGuide(!showGuide)}>
            {showGuide ? '❌' : '❓'} Guide
          </button>
          <button className="nav-btn settings-btn">⚙️</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="room-main">
        {/* Left Panel - Room Actions */}
        <div className="action-panel">
          <div className="panel-header">
            <h2 className="panel-title">Enter Room</h2>
            <p className="panel-subtitle">Join existing or create new meeting space</p>
          </div>

          {/* Room Code Input */}
          <div className="room-input-section">
            <div className="input-label">
              <span className="label-text">Room Code</span>
              <span className="label-hint">5-character code</span>
            </div>
            
            <div className="room-input-container">
              <div className="code-inputs">
                {codeChars.map((char, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={char}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="code-input"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    autoComplete="off"
                    spellCheck="false"
                  />
                ))}
              </div>
              
              <div className="input-actions">
                <button 
                  className={`action-btn copy-btn ${copied ? 'copied' : ''}`}
                  onClick={copyToClipboard}
                >
                  {copied ? '✓ Copied!' : '📝 Copy'}
                </button>
              </div>
            </div>

            <div className="room-actions">
                   <button onClick={handlesubmit}
                className={`action-btn-secondary create-btn ${isCreating ? 'loading' : ''}`}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <span className="btn-spinner"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✨</span>
                    Create New Room
                  </>
                )}
              </button>
              <div className="divider">
                <span className="divider-text">or</span>
              </div>
              <button onClick={handlesubmit}
                className={`action-btn-primary join-btn ${isJoining ? 'loading' : ''}`}
                disabled={isJoining}
              >
                {isJoining ? (
                  <>
                    <span className="btn-spinner"></span>
                    Joining...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚪</span>
                    Join Room
                  </>
                )}
              </button>
              
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="actions-grid">
              <QuickActionButton 
                icon="📅"
                label="Schedule"
                color="#6366f1"
                onClick={() => alert('Schedule Meeting')}
              />
              <QuickActionButton 
                icon="👥"
                label="Invite"
                color="#8b5cf6"
                onClick={() => alert('Invite People')}
              />
              <QuickActionButton 
                icon="⚡"
                label="Instant"
                color="#ec4899"
                onClick={handleCreateRoom}
              />
              <QuickActionButton 
                icon="📁"
                label="History"
                color="#10b981"
                onClick={() => alert('Meeting History')}
              />
            </div>
          </div>
        </div>


        <div className="preview-panel">
          {/* Active Room Display */}
          {activeRoom ? (
            <div className="active-room-display">
              <div className="success-animation">
                <div className="success-icon">🎉</div>
                <div className="success-rings">
                  <div className="ring"></div>
                  <div className="ring"></div>
                  <div className="ring"></div>
                </div>
              </div>
              
              <h2 className="room-success-title">
                {activeRoom.isNew ? 'Room Created!' : 'Room Joined!'}
              </h2>
              
              <div className="room-details">
                <div className="room-code-display">
                  <span className="code-label">Room Code:</span>
                  <div className="code-badge">
                    <span className="code-value">{activeRoom.id}</span>
                    <button className="copy-code-btn" onClick={copyToClipboard}>
                      {copied ? '✓' : '📋'}
                    </button>
                  </div>
                </div>
                
                <div className="share-section">
                  <p className="share-label">Share this code with participants</p>
                  <div className="share-buttons">
                    <button className="share-btn whatsapp">📱 WhatsApp</button>
                    <button className="share-btn email">✉️ Email</button>
                    <button className="share-btn link">🔗 Copy Link</button>
                  </div>
                </div>
                
                <div className="room-actions-final">
                  <button className="enter-room-btn">
                    🚀 Enter Room
                  </button>
                  <button className="configure-btn">
                    ⚙️ Configure Settings
                  </button>
                  <button className="back-btn" onClick={resetRoom}>
                    ↩️ Back to Lobby
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Room Preview */}
              <div className="room-preview">
                <div className="preview-header">
                  <h3 className="preview-title">Room Preview</h3>
                  <div className="preview-status">
                    <div className="status-dot"></div>
                    <span>Ready to Connect</span>
                  </div>
                </div>
                
                <div className="preview-content">
                  <div className="preview-grid">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="preview-tile">
                        <div className="tile-placeholder">
                          {i === 0 ? '👤' : i === 1 ? '👩' : i === 2 ? '👨' : '👤'}
                        </div>
                        <div className="tile-name">User {i + 1}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="preview-controls">
                    <div className="control-item">
                      <div className="control-icon">🎥</div>
                      <span>Video Ready</span>
                    </div>
                    <div className="control-item">
                      <div className="control-icon">🎤</div>
                      <span>Audio Ready</span>
                    </div>
                    <div className="control-item">
                      <div className="control-icon">🖥️</div>
                      <span>Screen Share</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="features-preview">
                <h3 className="preview-title">Room Features</h3>
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">🔐</div>
                    <div className="feature-text">
                      <h4>Secure</h4>
                      <p>End-to-end encryption</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">⚡</div>
                    <div className="feature-text">
                      <h4>Fast</h4>
                      <p>Low latency streaming</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🌐</div>
                    <div className="feature-text">
                      <h4>Global</h4>
                      <p>Worldwide access</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🎨</div>
                    <div className="feature-text">
                      <h4>Custom</h4>
                      <p>Virtual backgrounds</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Guide Panel */}
      {showGuide && (
        <div className="guide-panel">
          <div className="guide-header">
            <h3>📚 Quick Guide</h3>
            <button className="close-guide" onClick={() => setShowGuide(false)}>
              ×
            </button>
          </div>
          <div className="guide-content">
            <div className="guide-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Enter Room Code</h4>
                <p>Type or paste a 5-character code to join existing room</p>
              </div>
            </div>
            <div className="guide-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Create New Room</h4>
                <p>Generate a unique room code for a new meeting</p>
              </div>
            </div>
            <div className="guide-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Share & Invite</h4>
                <p>Share your room code with participants to join</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="room-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#help">Help Center</a>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="connection-status">
            <div className="status-indicator connected"></div>
            <span>Connected to LuvToMeet Servers</span>
          </div>
        </div>
      </footer>

      {/* Floating Notification */}
      {roomCode.length === 5 && !activeRoom && (
        <div className="floating-notification">
          <div className="notification-content">
            <span className="notification-icon">👆</span>
            <span>Room code complete! Click "Join Room" or press Enter</span>
          </div>
        </div>
      )}
    </div>
        </>
    )
}
export default Roompage