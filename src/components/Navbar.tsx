import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isPortal = location.pathname === '/daga';

  if (isPortal) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/dpeipics/DpeiLogo.png" 
            alt="DEE PIESS Logo" 
            className="w-10 h-10 object-contain invert brightness-200"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight uppercase leading-none">DEE PIESS</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/40 font-bold group-hover:text-brand-gold transition-colors">Interior Projects</span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-white transition-colors ${location.pathname === link.path ? 'text-white' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="/#contact" className="hidden sm:block bg-white text-black px-5 py-2 rounded-full text-[11px] uppercase tracking-widest font-bold hover:bg-brand-gold transition-all active:scale-95">
            Get in Touch
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black md:hidden flex flex-col p-8 pt-24"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif font-bold tracking-tight hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="/#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif italic text-brand-gold hover:text-white transition-colors"
              >
                Get in Touch
              </a>
            </div>
            
            <div className="mt-auto pt-12 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-4">Contact</p>
              <p className="text-sm text-white/60 mb-1">dpei.projects@gmail.com</p>
              <p className="text-sm text-white/60">+91 98481 32615</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
