import React from 'react';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-100">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Brand block */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/dpeipics/DpeiLogo.png" alt="DEE PIESS" className="w-12 h-12" />
            <div>
              <p className="font-serif text-xl font-bold tracking-tight uppercase leading-none text-black">DEE PIESS</p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-black font-bold mt-0.5">Interior Contractor</p>
            </div>
          </div>
          <p className="text-black text-sm leading-relaxed max-w-xs">
            Trusted interior contracting for hotels, homes, corporate offices, and commercial spaces across India.
          </p>
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-4">Contact</h4>
          <div className="flex items-start gap-2.5 text-sm text-black">
            <MapPin size={14} className="text-brand-gold mt-0.5 shrink-0" />
            <span>{COMPANY_DETAILS.address}</span>
          </div>
          <a
            href={`https://wa.me/${COMPANY_DETAILS.phoneWhatsappWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm text-black hover:text-brand-gold transition-colors"
          >
            <Phone size={14} className="text-brand-gold shrink-0" />
            <span>WhatsApp {COMPANY_DETAILS.phoneWhatsappDisplay}</span>
          </a>
          <a href={`tel:${COMPANY_DETAILS.phoneSecondaryTel}`} className="flex items-center gap-2.5 text-sm text-black hover:text-brand-gold transition-colors">
            <Phone size={14} className="text-brand-gold shrink-0" />
            <span>{COMPANY_DETAILS.phoneSecondaryDisplay}</span>
          </a>
          <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center gap-2.5 text-sm text-black hover:text-brand-gold transition-colors">
            <Mail size={14} className="text-brand-gold shrink-0" />
            <span>{COMPANY_DETAILS.email}</span>
          </a>
        </div>

        {/* Specializations */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-4">Specializations</h4>
          <ul className="space-y-2">
            {COMPANY_DETAILS.specialization.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-black">
                <div className="w-1 h-1 rounded-full bg-brand-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-[11px] uppercase tracking-widest font-bold text-black">© 2026 DEE PIESS. All rights reserved.</p>
            <p className="text-[11px] text-black font-bold flex items-center gap-1.5">
              Designed with <Heart size={10} className="text-red-400 fill-red-400 shrink-0" /> by{' '}
              <a
                href="https://linktr.ee/yashwanthbharadwaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-bold hover:text-brand-gold transition-colors underline underline-offset-2"
              >
                Yashwanth Bharadwaj
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
