import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// A linha 'import reportWebVitals...' DEVE TER SUMIDO DAQUI.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// A linha 'reportWebVitals();' DEVE TER SUMIDO DAQUI TAMBÉM.