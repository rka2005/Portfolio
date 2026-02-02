import React, { useState, useEffect } from 'react';
import { Shield, Wifi, Zap, Lock, Unlock, FileText, AlertTriangle, CheckCircle, X, Power } from 'lucide-react';
import './UploadForm.css';

const HackerTerminal = ({ onClose }) => { // Optional: onClose prop if you want to tell a parent component
  const [formData, setFormData] = useState({ title: '', code: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('IDLE'); 
  const [progress, setProgress] = useState(0);
  const [hexDump, setHexDump] = useState([]);
  
  // State for the Close Animation
  const [isClosing, setIsClosing] = useState(false);

  const [logs, setLogs] = useState([
    { id: 1, text: "SYSTEM_INIT...", type: "info" },
    { id: 2, text: "WAITING_FOR_INPUT...", type: "info" }
  ]);

  const addLog = (text, type = "info") => {
    setLogs(prev => [...prev.slice(-5), { id: Date.now(), text, type }]);
  };

  // Hex Effect Generator
  useEffect(() => {
    if (status === 'UPLOADING') {
      const interval = setInterval(() => {
        const line = Array(6).fill(0).map(() => 
          Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase()
        ).join(' ');
        setHexDump(prev => [line, ...prev.slice(0, 12)]);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleUpload = () => {
    if (!formData.title || !file) {
      addLog("ERROR: MISSING_FIELDS", "error");
      return;
    }
    setStatus('SCANNING');
    addLog("SCANNING_PACKETS...", "warning");

    setTimeout(() => {
      setStatus('UPLOADING');
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 3;
        if (p >= 100) {
          clearInterval(interval);
          setProgress(100);
          setStatus('SUCCESS');
          addLog("UPLOAD_COMPLETE", "success");
          
          setTimeout(() => {
            setStatus('IDLE');
            setFormData({ title: '', code: '' });
            setFile(null);
            setProgress(0);
          }, 4000);
        } else {
          setProgress(p);
        }
      }, 100);
    }, 1500);
  };

  // --- THE CREATIVE CLOSE LOGIC ---
  const handleClose = () => {
    addLog("TERMINATING_PROCESS...", "error");
    setIsClosing(true);

    setTimeout(() => {
      if (onClose) onClose();
    }, 800);
  };


  return (
    <div className={`cyber-wrapper ${isClosing ? 'power-off' : ''}`}>
      <div className="cyber-grid-bg"></div>
      
      {/* Added class 'shutting-down' when closing */}
      <div className={`cyber-panel ${isClosing ? 'shutting-down' : ''}`}>
        
        {/* --- CLOSE BUTTON --- */}
        <button className="close-btn" onClick={handleClose} title="TERMINATE_SESSION">
          <X size={20} />
        </button>

        {/* LEFT COLUMN: STATUS */}
        <div className="left-col">
          <div>
            <div className="cyber-title">
              NEXUS_UPLINK
            </div>
            
            <div className="status-box">
              <div className="status-label">CURRENT STATUS</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: status === 'ERROR' ? 'red' : status === 'SUCCESS' ? '#0aff0a' : '#00f3ff' }}>
                <strong>{status}</strong>
                {status === 'UPLOADING' ? <Zap size={16} className="blink"/> : <Wifi size={16}/>}
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="log-window">
              {logs.map(log => (
                <div key={log.id} className={`log-entry ${log.type}`}>
                  <span>{'>'}</span> {log.text}
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ fontSize: '10px', opacity: 0.5, marginTop: '20px' }}>
            SECURE_CONNECTION_V.9.0
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTION */}
        <div className="right-col">
          
          {status === 'UPLOADING' ? (
            <div style={{ textAlign: 'center', opacity: 0.8 }}>
              <Lock size={48} style={{ margin: '0 auto 20px', color: '#00f3ff' }} className="blink" />
              <div style={{ fontFamily: 'monospace', color: '#0aff0a', fontSize: '14px', lineHeight: '1.5' }}>
                {hexDump.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <p style={{ marginTop: '20px', letterSpacing: '3px' }}>ENCRYPTING_DATA...</p>
            </div>
          ) : status === 'SUCCESS' ? (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={64} style={{ color: '#0aff0a', margin: '0 auto 20px' }} />
              <h2 style={{ color: '#fff', fontSize: '24px' }}>TRANSFER COMPLETE</h2>
            </div>
          ) : (
            <>
              <div className="input-group">
                <label className="input-label">TARGET_DESIGNATION</label>
                <div style={{ position: 'relative' }}>
                  <span className="input-icon">{'>'}</span>
                  <input 
                    type="text" 
                    className="cyber-input" 
                    placeholder="ENTER TITLE..."
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">PAYLOAD_DATA</label>
                <div style={{ position: 'relative' }}>
                  <span className="input-icon">{'>'}</span>
                  <textarea 
                    rows="2"
                    className="cyber-input" 
                    placeholder="DESCRIPTION..."
                    value={formData.code}
                    onChange={e => setFormData({...formData, code: e.target.value})}
                    style={{ resize: 'none' }}
                  />
                </div>
              </div>

              <div className="input-group">
                <input 
                  type="file" 
                  id="file-upload" 
                  hidden 
                  onChange={e => setFile(e.target.files[0])}
                />
                <label htmlFor="file-upload" className={`file-drop-area ${file ? 'active' : ''}`}>
                  {file ? (
                    <div style={{ color: '#00f3ff' }}>
                      <FileText size={24} style={{ margin: '0 auto 10px' }}/>
                      {file.name}
                    </div>
                  ) : (
                    <div>
                      <AlertTriangle size={24} style={{ margin: '0 auto 10px', opacity: 0.5 }}/>
                      INITIALIZE_FILE_STREAM
                    </div>
                  )}
                </label>
              </div>

              <button className="cyber-btn" onClick={handleUpload}>
                {formData.title && file ? <Unlock size={16}/> : <Lock size={16}/>}
                EXECUTE_PROTOCOL
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default HackerTerminal;