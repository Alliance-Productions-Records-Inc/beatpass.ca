import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './components/landing/LandingPage';
import Changelog from './components/Changelog';
import ConsentNotice from './components/ConsentNotice';
import { initializeAnalytics } from './utils/analytics';

initializeAnalytics();

const App: React.FC = () => {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';

  if (normalizedPath === '/changelog') {
    return <Changelog />;
  }

  return <LandingPage />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <ConsentNotice />
    </ThemeProvider>
  </React.StrictMode>
);
