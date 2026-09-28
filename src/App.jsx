import React from 'react';
import PostBox from './components/PostBox';
import './App.css';

/**
 * Root Application Component
 * Hosts the PostBox component centered within a clean, modern layout.
 */
function App() {
  return (
    <main className="app-container">
      <header style={{ textCenter: 'center', marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Social Post Creator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.925rem' }}>
          Demonstration of React Controlled Components & Real-time Validation
        </p>
      </header>
      <PostBox />
    </main>
  );
}

export default App;
