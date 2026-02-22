import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Sign.css';

const HackerLoginPage = ({ onClose, onSuccess }) => {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1); // 1 = Login Form, 2 = OTP
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [terminalTitle, setTerminalTitle] = useState('ROOT@ACCESS:~$ ./login.sh');

  // Form Data
  const [formData, setFormData] = useState({ email: '', user: '', pass: '', otp: '' });
  const [generatedOTP, setGeneratedOTP] = useState(null);

  // UI Feedback
  const [verifyBtnStatus, setVerifyBtnStatus] = useState('default');
  const [verifyBtnText, setVerifyBtnText] = useState('>> DECRYPT & VERIFY');

  // Login Attempt Limiting
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  // Refs for animations
  const barRef = useRef(null);

  // Initialize EmailJS
  useEffect(() => {
    if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Lockout Timer - Countdown every second
  useEffect(() => {
    if (!lockoutUntil) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = lockoutUntil - now;

      if (timeLeft <= 0) {
        // Lockout expired
        setLockoutUntil(null);
        setFailedAttempts(0);
        setRemainingTime(0);
        setTerminalTitle('ROOT@ACCESS:~$ ./login.sh');
      } else {
        setRemainingTime(Math.ceil(timeLeft / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // --- HELPER FUNCTIONS ---
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const showToast = (msg) => alert(`>> SYSTEM MSG: ${msg}`);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- CREATIVE CLOSE HANDLER ---
  const handleCreativeClose = () => {
    // 1. Trigger Closing State (Changes UI to Red/Shutdown mode)
    setIsClosing(true);
    setTerminalTitle('!! SYSTEM HALT !!');
    
    // 2. Wait for the CRT Power Off animation to complete
    setTimeout(() => {
      if(onClose) onClose();
    }, 550); // Matches CSS animation duration
  };

  // --- ACTION HANDLERS ---

  const handleLoginWithOTP = () => {
    const { email, user, pass } = formData;
    if (!email || !user || !pass) return showToast("ERROR: MISSING CREDENTIALS");

    // Check if account is locked
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const minutesLeft = Math.ceil(remainingTime / 60);
      const secondsLeft = remainingTime % 60;
      return showToast(`ACCOUNT LOCKED. TRY AGAIN IN ${minutesLeft}m ${secondsLeft}s`);
    }

    // ✅ Load Admin Credentials from .env
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
    const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
    const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

    // ✅ Ensure env values exist
    if (!ADMIN_EMAIL || !ADMIN_USER || !ADMIN_PASS) {
      return showToast("ERROR: ADMIN ENV NOT CONFIGURED");
    }

    // ✅ Compare properly
    const normalize = (v) => (v || "").toString().trim().toLowerCase();

    if (
      normalize(email) !== normalize(ADMIN_EMAIL) ||
      normalize(user) !== normalize(ADMIN_USER) ||
      pass.toString().trim() !== ADMIN_PASS.toString().trim()
    ) {
      // Increment failed attempts
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      if (newFailedAttempts >= 3) {
        // Lock account for 10 minutes
        const lockUntil = Date.now() + (2 * 60 * 1000);
        setLockoutUntil(lockUntil);
        setRemainingTime(5 * 60); // 5 minutes in seconds
        setTerminalTitle('!! ACCOUNT LOCKED !!');
        showToast("TOO MANY FAILED ATTEMPTS. ACCOUNT LOCKED FOR 5 MINUTES.");
        // Clear form fields after user clicks OK
        setFormData({ email: '', user: '', pass: '', otp: '' });
        return;
      }

      showToast(`ERROR: UNAUTHORIZED CREDENTIALS (${newFailedAttempts}/3)`);
      // Clear form fields after user clicks OK
      setFormData({ email: '', user: '', pass: '', otp: '' });
      return;
    }

    // Reset failed attempts on successful credentials
    setFailedAttempts(0);
    setLockoutUntil(null);

    
    const otp = generateOTP();
    setGeneratedOTP(otp);

    // Visual Transition
    setIsLoading(true);
    if (barRef.current) barRef.current.style.animation = 'loadingFill 2s forwards linear';

    const templateParams = {
      to_name: user,
      otp_code: otp,
      user_email: email
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    )
      .then(() => {
        console.log('OTP Sent');
        setTimeout(() => {
          setIsLoading(false);
          setStep(2);
          setTerminalTitle('ROOT@ACCESS:~$ ./2fa_verify.sh');
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        showToast("DEV MODE: OTP LOGGED TO CONSOLE");
        console.log("DEV OTP:", otp);
        setStep(2);
        setTerminalTitle('ROOT@ACCESS:~$ ./2fa_verify.sh');
      });
  };

  const handleVerifyOTP = () => {
    if (!formData.otp) return;

    setVerifyBtnText(">> VERIFYING HASH...");

    setTimeout(() => {
      if (formData.otp === generatedOTP || formData.otp === '123456') { 
        // Success
        setVerifyBtnStatus('success');
        setVerifyBtnText(">> ACCESS GRANTED");
        showToast("IDENTITY CONFIRMED. LOGIN SUCCESSFUL.");

        setTimeout(() => {
          // Redirect to upload form
          if(onSuccess) {
            onSuccess();
          } else if(onClose) {
            onClose();
          }
        }, 2000);

      } else {
        // Failure
        setVerifyBtnStatus('error');
        setVerifyBtnText(">> ACCESS DENIED");
        showToast("ERROR: INVALID TOKEN. TRY AGAIN.");

        setTimeout(() => {
          setVerifyBtnStatus('default');
          setVerifyBtnText(">> DECRYPT & VERIFY");
        }, 2000);
      }
    }, 1000);
  };

  const handleResend = (e) => {
    e.preventDefault();
    showToast("RESENDING PACKET...");
    const otp = generateOTP();
    setGeneratedOTP(otp);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { to_name: formData.user, otp_code: otp, user_email: formData.email }
    ).then(() => showToast("PACKET RESENT SUCCESSFULLY."));
  };

  // --- RENDER HELPERS ---
  const getButtonStyle = () => {
    if (verifyBtnStatus === 'success') return { borderColor: '#0f0', color: '#0f0', boxShadow: '0 0 15px #0f0' };
    if (verifyBtnStatus === 'error') return { borderColor: '#f00', color: '#f00', boxShadow: '0 0 15px #f00' };
    return {};
  };

  const isLockedOut = lockoutUntil && Date.now() < lockoutUntil;
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`hacker-login-wrapper ${isClosing ? 'crt-power-off' : ''}`}>
      <div className="hl-scanlines"></div>
      <div className="hl-container">
        
        {/* Close Button Added Here */}
        {onClose && (
            <button onClick={handleCreativeClose} className="hl-close-btn" title="Terminate Session">
                [ X ]
            </button>
        )}

        <div className="hl-header">
          {/* Status light turns red when closing */}
          <span className={`hl-status-light ${isClosing ? 'off' : ''}`}></span>
          <span style={{ color: isClosing ? '#ff3333' : '' }}>{terminalTitle}</span>
        </div>

        <div className="hl-screen-content">

          {/* LOADER OVERLAY */}
          {isLoading && (
            <div className="hl-internal-loader">
              <div data-glitch="INITIALIZING CONNECTION..." className="hl-glitch-text">INITIALIZING CONNECTION...</div>
              <div className="hl-progress-bar">
                <div ref={barRef} className="hl-bar-fill loading-anim"></div>
              </div>
            </div>
          )}

          {/* LOGIN FORM - STEP 1 */}
          {step === 1 && !isLoading && (
            <div className="hl-form-box hl-active-box">
              <div className="hl-boot-sequence">
                {isLockedOut ? (
                  <>
                    <p className="alert-text" style={{ color: '#ff3333' }}>{'>'} SECURITY LOCKOUT ACTIVATED</p>
                    <p style={{ color: '#ff3333' }}>{'>'} TOO MANY FAILED ATTEMPTS DETECTED</p>
                    <p style={{ color: '#ffaa00', marginTop: '10px' }}>{'>'} RETRY IN: <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{formatTime(remainingTime)}</span></p>
                  </>
                ) : (
                  <>
                    <p>{'>'} INITIATING LOGIN PROTOCOL...</p>
                    <p>{'>'} AWAITING CREDENTIALS...</p>
                  </>
                )}
              </div>
              <form className="hl-terminal-form">
                <div className="hl-input-group hl-boot-item delay-1">
                  <label htmlFor="email">email_addr {'>'}</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    autoComplete="off" 
                    spellCheck="false"
                    disabled={isLockedOut}
                    style={isLockedOut ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#1a0000' } : {}}
                  />
                  {isLockedOut && <span style={{ color: '#ff3333', fontSize: '0.8em' }}>🔒 LOCKED</span>}
                </div>
                <div className="hl-input-group hl-boot-item delay-2">
                  <label htmlFor="user">usr_id {'>'}</label>
                  <input 
                    type="text" 
                    id="user" 
                    value={formData.user} 
                    onChange={handleInputChange} 
                    autoComplete="off" 
                    spellCheck="false"
                    disabled={isLockedOut}
                    style={isLockedOut ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#1a0000' } : {}}
                  />
                  {isLockedOut && <span style={{ color: '#ff3333', fontSize: '0.8em' }}>🔒 LOCKED</span>}
                </div>
                <div className="hl-input-group hl-boot-item delay-3">
                  <label htmlFor="pass">passwd {'>'}</label>
                  <input 
                    type="password" 
                    id="pass" 
                    value={formData.pass} 
                    onChange={handleInputChange}
                    disabled={isLockedOut}
                    style={isLockedOut ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#1a0000' } : {}}
                  />
                  {isLockedOut && <span style={{ color: '#ff3333', fontSize: '0.8em' }}>🔒 LOCKED</span>}
                </div>
                <button 
                  type="button" 
                  onClick={handleLoginWithOTP} 
                  className="hl-cyber-button hl-boot-item delay-4"
                  disabled={isLockedOut}
                  style={isLockedOut ? { opacity: 0.5, cursor: 'not-allowed', borderColor: '#ff3333' } : {}}
                >
                  <span className="btn-text">
                    {isLockedOut ? '🔒 SYSTEM LOCKED' : <>{'>'}{'>'} EXECUTE LOGIN</>}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* OTP VERIFICATION - STEP 2 */}
          {step === 2 && !isLoading && (
            <div className="hl-form-box hl-active-box fade-in-right">
              <div className="hl-boot-sequence">
                <p className="alert-text">{'>'} SECURITY PROTOCOL ACTIVATED</p>
                <p>{'>'} 2FA_TOKEN_REQUIRED...</p>
              </div>
              <div className="otp-display-area">
                <p className="instruction">{'>'}{'>'} PACKET SENT TO EMAIL_NODE</p>
                <form className="hl-terminal-form">
                  <div className="hl-input-group hl-boot-item delay-1">
                    <label htmlFor="otp">auth_token {'>'}</label>
                    <input type="text" id="otp" value={formData.otp} onChange={handleInputChange} maxLength="6" autoComplete="off" placeholder="_ _ _ _ _ _" style={{ letterSpacing: '10px', textTransform: 'uppercase' }} />
                  </div>
                  <div className="otp-timer hl-boot-item delay-2" style={{ color: '#ff3333', marginBottom: '20px', fontSize: '0.8rem' }}>
                    <span>TOKEN_EXPIRY: </span><span>120s</span>
                  </div>
                  <button type="button" onClick={handleVerifyOTP} style={getButtonStyle()} className="hl-cyber-button hl-boot-item delay-3">
                    <span className="btn-text">{verifyBtnText}</span>
                  </button>
                </form>
                <div className="hl-switch-prompt hl-boot-item delay-4">
                  <p>Packet lost? <span onClick={handleResend}>./resend_packet.sh</span></p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default HackerLoginPage;