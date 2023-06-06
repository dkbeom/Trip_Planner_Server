import React from 'react';
import ReactDOM from 'react-dom/client';
import AppStart from './AppStart';
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
    <AppStart />
    </BrowserRouter>
  </React.StrictMode>
);
