import React from 'react';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

export default function Footer() {
  const whatsappNumber = "919848132615";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const instagramUrl = "https://www.instagram.com/";

  return (
    <footer className="bg-white border-t border-stone-100">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Brand block */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/dpeipics/DpeiLogo.png" alt="DEE PIESS" className="w-12 h-12" />
            <div>
              <p className="font-serif text-xl font-bold tracking-tight uppercase leading-none text-brand-ink">DEE PIESS</p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-stone-400 font-bold mt-0.5">Interior Projects</p>
            </div>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
            Crafting luxury interiors for hotels, residences, corporate offices and commercial spaces across India.
          </p>
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-4">Contact</h4>
          <div className="flex items-start gap-2.5 text-sm text-stone-500">
            <MapPin size={14} className="text-brand-gold mt-0.5 shrink-0" />
            <span>{COMPANY_DETAILS.address}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-stone-500">
            <Phone size={14} className="text-brand-gold shrink-0" />
            <span>{COMPANY_DETAILS.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-stone-500">
            <Mail size={14} className="text-brand-gold shrink-0" />
            <span>{COMPANY_DETAILS.email}</span>
          </div>
        </div>

        {/* Specializations */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-4">Specializations</h4>
          <ul className="space-y-2">
            {COMPANY_DETAILS.specialization.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-stone-500">
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
            <p className="text-[11px] uppercase tracking-widest font-bold text-stone-400">© 2026 DEE PIESS. All rights reserved.</p>
            <p className="text-[11px] text-stone-600 font-bold flex items-center gap-1.5">
              Designed with <Heart size={10} className="text-red-400 fill-red-400 shrink-0" /> by{' '}
              <a
                href="https://linktr.ee/yashwanthbharadwaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 font-bold hover:text-brand-gold transition-colors underline underline-offset-2"
              >
                Yashwanth Bharadwaj
              </a>
            </p>
          </div>

          {/* Floating social buttons */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white text-[11px] font-bold px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.845L.057 23.886a.5.5 0 0 0 .613.612l6.102-1.447A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.502-5.176-1.381l-.362-.214-3.754.89.926-3.668-.233-.373A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-[11px] font-bold px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
