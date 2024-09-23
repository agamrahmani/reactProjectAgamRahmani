import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';


import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/autoContext.jsx'
import { SearchProvider } from "./contexts/searchContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardsProvider } from "./contexts/cardContext.jsx";
import { DarkModeProvider } from "./contexts/darkModeContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <CardsProvider>
        <SearchProvider>
          <DarkModeProvider>
        <App /> 
        <ToastContainer/>
        </DarkModeProvider>
        </SearchProvider>
      </CardsProvider> 
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
