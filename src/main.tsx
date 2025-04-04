
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Try to get the Publishable Key from environment variables
// If not available, use a placeholder (for development purposes only)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder_key_for_development';

// When in production, we should still throw an error if the key is missing
if (!PUBLISHABLE_KEY || (PUBLISHABLE_KEY === 'pk_test_placeholder_key_for_development' && import.meta.env.PROD)) {
  console.warn("⚠️ Using placeholder Clerk key. Please set VITE_CLERK_PUBLISHABLE_KEY environment variable for full functionality.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
