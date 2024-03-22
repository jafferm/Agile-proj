import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CatalogContextProvider } from './context/CatalogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CatalogContextProvider>
      <App />
    </CatalogContextProvider>
  </React.StrictMode>
)