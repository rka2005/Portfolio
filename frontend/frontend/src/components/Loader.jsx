import React from 'react';
import Typewriter from 'typewriter-effect';
import './Loader.css';

export default function Loader() {
  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">Status</div>
        <div className="terminal-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
      </div>
      
      <div className="text">
        <Typewriter
          options={{
            strings: [
              "Welcome to Rohit's Portfolio....",
            ],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
          }}
        />
      </div>
    </div>
  );
}