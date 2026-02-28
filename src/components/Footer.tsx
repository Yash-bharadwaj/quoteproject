import React from 'react';
import { Instagram, Facebook, Linkedin, Heart } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

export default function Footer() {
  return (
    <footer className="py-4 sm:py-8 px-4 sm:px-6 border-t border-white/5 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2 sm:gap-8">
        {/* Left: Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white text-black font-serif font-bold flex items-center justify-center rounded text-[10px] sm:text-sm">DP</div>
          <span className="font-serif text-[10px] sm:text-base font-bold tracking-tight uppercase hidden xs:inline">DEE PIESS</span>
        </div>

        {/* Center: Copyright & Credit (One Line) */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold text-white/30">
          <p className="hidden md:inline">© 2026 DEE PIESS</p>
          <div className="flex items-center gap-1.5 text-white/20">
            <span className="hidden sm:inline">Designed with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span className="hidden xs:inline">by</span>
            <a 
              href="https://linktr.ee/yashwanthbharadwaj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline underline-offset-4 whitespace-nowrap"
            >
              Yashwanth Bharadwaj
            </a>
          </div>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-3 sm:gap-5 shrink-0">
          <a href="#" className="text-white/30 hover:text-white transition-colors">
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a href="#" className="text-white/30 hover:text-white transition-colors">
            <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a href="#" className="text-white/30 hover:text-white transition-colors">
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
