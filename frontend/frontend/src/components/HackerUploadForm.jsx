import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, CheckCircle, Terminal, Lock, AlertTriangle } from 'lucide-react';
import './HackerUploadForm.css';

const HackerUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  
  // Random binary for visual effect
  const [binaryBg, setBinaryBg] = useState('');

  // Handle inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // The "Creativity" Logic
  const handleUpload = () => {
    if (!file || !formData.title) {
      alert("ERROR: MISSING REQUIRED DATA PACKETS.");
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setStatusLog(['> ESTABLISHING SECURE CONNECTION...']);

    // Generate random binary background
    let bin = '';
    for(let i=0; i<1000; i++) bin += Math.round(Math.random());
    setBinaryBg(bin);

    // Simulate complex upload sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsComplete(true);
            // Reset after success
            setTimeout(() => setIsComplete(false), 3000); 
            setFormData({ title: '', description: '' });
            setFile(null);
          }, 1500);
          return 100;
        }
        
        // Add random logs based on progress
        const r = Math.random();
        if (r > 0.85) {
            const logs = [
                "> ENCRYPTING DATA CHUNKS...",
                "> BYPASSING FIREWALL...",
                "> INJECTING PAYLOAD...",
                "> VERIFYING HASH...",
                "> OPTIMIZING NEURAL PATH..."
            ];
            const newLog = logs[Math.floor(Math.random() * logs.length)];
            setStatusLog(prevLogs => [...prevLogs.slice(-4), newLog]); // Keep last 5 logs
        }
        
        // Non-linear progress for realism
        return prev + Math.random() * 5; 
      });
    }, 100);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4 font-mono">
      
      {/* Main Container */}
      <div className="hacker-container relative w-full max-w-lg border border-green-500/50 p-1">
        
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500 z-10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500 z-10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500 z-10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500 z-10"></div>
        
        <div className="scan-line"></div>

        {/* Content Wrapper */}
        <div className="relative bg-black/80 backdrop-blur-sm p-8 z-10">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 glitch-text tracking-widest" data-text="SYSTEM_UPLOAD">
              SYSTEM_UPLOAD
            </h1>
            <p className="text-green-500/60 text-xs mt-2 tracking-[0.3em]">SECURE_CHANNEL_V.9.0.1</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            
            {/* Title Input */}
            <div className="group relative">
              <label className="block text-green-500 text-xs mb-1 tracking-widest group-hover:text-green-300 transition-colors">
                <span className="mr-2">{'>'}</span>TARGET_TITLE
              </label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="ENTER_DESIGNATION..."
                className="w-full bg-black/50 border-b border-green-800 text-green-400 p-2 focus:outline-none focus:border-green-400 focus:bg-green-900/10 transition-all placeholder-green-800/50"
              />
            </div>

            {/* Description Textarea */}
            <div className="group relative">
              <label className="block text-green-500 text-xs mb-1 tracking-widest group-hover:text-green-300 transition-colors">
                <span className="mr-2">{'>'}</span>DATA_DESCRIPTION
              </label>
              <textarea 
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="ENTER_PAYLOAD_DETAILS..."
                className="w-full bg-black/50 border-b border-green-800 text-green-400 p-2 focus:outline-none focus:border-green-400 focus:bg-green-900/10 transition-all placeholder-green-800/50 resize-none"
              ></textarea>
            </div>

            {/* File Upload Zone */}
            <div className="relative group cursor-pointer">
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <label 
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${file ? 'border-green-400 bg-green-900/20' : 'border-green-800 hover:border-green-500 hover:bg-green-900/10'} transition-all duration-300 cursor-pointer`}
              >
                {file ? (
                  <div className="text-center animate-pulse">
                    <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <span className="text-green-400 text-sm tracking-widest">{file.name}</span>
                    <p className="text-green-600 text-xs mt-1">{(file.size / 1024).toFixed(2)} KB DETECTED</p>
                  </div>
                ) : (
                  <div className="text-center group-hover:scale-105 transition-transform">
                    <Upload className="w-8 h-8 text-green-700 group-hover:text-green-400 mx-auto mb-2 transition-colors" />
                    <span className="text-green-700 group-hover:text-green-400 text-sm tracking-widest transition-colors">INITIATE_FILE_TRANSFER</span>
                  </div>
                )}
              </label>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleUpload}
              className="cyber-btn w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 mt-4 tracking-widest flex items-center justify-center gap-2 group"
            >
              <Terminal className="w-4 h-4" />
              EXECUTE_UPLOAD
            </button>

          </div>
        </div>

        {/* --- OVERLAY: The "Real Creativity" --- */}
        {isUploading && (
          <div className="data-stream">
            {/* Background noise */}
            <div className="binary-stream break-all text-justify p-2 opacity-10 blur-[1px]">
                {binaryBg}
            </div>

            {/* Center HUD */}
            <div className="z-30 w-full max-w-xs text-center">
                <Lock className="w-12 h-12 text-green-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-green-400 text-xl font-bold mb-1 glitch-text" data-text="SYSTEM_BREACH">SYSTEM_BREACH</h2>
                <p className="text-green-600 text-xs mb-6 tracking-[0.5em] animate-pulse">UPLOADING_PACKETS</p>
                
                {/* Progress Bar */}
                <div className="progress-bar-container mx-auto mb-2">
                    <div 
                        className="progress-bar-fill" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-green-500 text-xs font-mono px-1">
                    <span>{progress.toFixed(1)}%</span>
                    <span>/ROOT/USER/DATA</span>
                </div>

                {/* Scrolling Logs */}
                <div className="mt-6 text-left h-24 overflow-hidden border-l-2 border-green-800 pl-2">
                    {statusLog.map((log, idx) => (
                        <p key={idx} className="text-green-400/80 text-xs font-mono mb-1 leading-tight">
                            {log}<span className="cursor-blink">_</span>
                        </p>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* --- SUCCESS STATE --- */}
        {isComplete && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/95 z-40 flex flex-col items-center justify-center border border-green-500">
                <CheckCircle className="w-20 h-20 text-green-500 mb-4 drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]" />
                <h2 className="text-3xl text-white font-bold tracking-widest">UPLOAD_COMPLETE</h2>
                <p className="text-green-500 mt-2 tracking-widest">DATA_SECURED</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default HackerUploadForm;