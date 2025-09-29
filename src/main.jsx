import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SectionProvider } from './context/SectionContext.jsx';

// Prevent browser from restoring scroll position on page reload/navigation
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SectionProvider>
        <App />
      </SectionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// Update --vh CSS variable to handle mobile browser address-bar resizing
function setVh() {
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
}

setVh();
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', setVh);
  window.visualViewport.addEventListener('scroll', setVh);
}
window.addEventListener('resize', setVh);
