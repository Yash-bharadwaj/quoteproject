import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuotationGenerator from './pages/QuotationGenerator';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/daga" element={<QuotationGenerator />} />
      </Routes>
      <WhatsAppWidget />
    </BrowserRouter>
  );
}
