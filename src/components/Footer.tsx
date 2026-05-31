import React from 'react';
import { Zap, Cpu } from 'lucide-react';

interface FooterProps {
  totalFeeds: number;
}

export const Footer: React.FC<FooterProps> = ({ totalFeeds }) => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <Zap size={18} className="text-amber-400" fill="currentColor" />
        <span className="logo-text" style={{ fontSize: '1rem' }}>NEURAL INTELLIGENCE STREAM</span>
      </div>

      <p className="footer-tagline">
        An elegant, high-fidelity developer news hub compiling real-time neural updates, developer toolkits, model announcements, and scientific breakthroughs.
      </p>

      {/* Live Feed Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          gap: '12px',
        }}
      >
        <span>
          <span className="footer-pulsing-dot" />
          Status: Active
        </span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>
          Connected to {totalFeeds} API feeds
        </span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Cpu size={12} /> Serverless Client
        </span>
      </div>

      <div className="footer-links">
        <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          Superpowers Project
        </a>
        <span style={{ color: 'var(--border)' }}>•</span>
        <a href="https://rss2json.com" target="_blank" rel="noopener noreferrer">
          RSS API Engine
        </a>
        <span style={{ color: 'var(--border)' }}>•</span>
        <a href="#root">Back to Top</a>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Neural Intelligence Stream. Built with Vite, React, and TypeScript.
      </div>
    </footer>
  );
};
